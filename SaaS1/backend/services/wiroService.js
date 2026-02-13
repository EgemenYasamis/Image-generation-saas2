import crypto from "crypto";

const WIRO_API_BASE = "https://api.wiro.ai/v1";

/**
 * Wiro AI HMAC-SHA256 imza
 * Signature = hmac-sha256(API_SECRET + Nonce, API_KEY)
 */
function createSignature(apiSecret, nonce, apiKey) {
  const message = apiSecret + nonce;
  return crypto.createHmac("sha256", apiKey).update(message).digest("hex");
}

/** Wiro API errors array'dan okunabilir mesaj üretir (string veya object olabilir) */
function formatErrors(errors) {
  if (!Array.isArray(errors) || errors.length === 0) return "Wiro API hatası";
  const first = errors[0];
  const code = first?.code;
  const message = typeof first === "string" ? first : first?.message || first?.msg;
  // Kod 97: Yetersiz bakiye – kullanıcıya net Türkçe mesaj
  if (code === 97 || (message && String(message).toLowerCase().includes("insufficient balance"))) {
    return "Wiro hesabında yeterli bakiye yok. Görsel üretmek için wiro.ai panelinden bakiye yüklemeniz gerekiyor.";
  }
  return errors
    .map((e) => (typeof e === "string" ? e : e?.message || e?.msg || JSON.stringify(e)))
    .filter(Boolean)
    .join(", ") || "Wiro API hatası";
}

/**
 * Run - Görsel üretim görevi başlatır
 * tencent/hunyuan-flux-srpo: inputImage opsiyonel (text-to-image için atlanabilir)
 */
export async function runImageGeneration(prompt, options = {}) {
  const apiKey = process.env.WIRO_API_KEY;
  const apiSecret = process.env.WIRO_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error("WIRO_API_KEY ve WIRO_API_SECRET tanımlanmalı");
  }

  const nonce = String(Math.floor(Date.now() / 1000));
  const signature = createSignature(apiSecret, nonce, apiKey);

  // WIRO_MODEL: tencent/hunyuan-flux-srpo (inputImage opsiyonel), wiro/text-to-image-flux vb.
  const modelPath = options.model || process.env.WIRO_MODEL || "tencent/hunyuan-flux-srpo";
  const [owner, model] = modelPath.split("/");
  const runUrl = `${WIRO_API_BASE}/Run/${owner}/${model}`;

  const formData = new FormData();
  formData.append("prompt", prompt);
  formData.append("steps", String(options.steps || 20));
  formData.append("scale", String(options.scale || 3.5));
  formData.append("samples", String(options.samples || 1));
  formData.append("seed", String(options.seed || Math.floor(Math.random() * 10000000000)));
  formData.append("width", String(options.width || 1024));
  formData.append("height", String(options.height || 1024));

  if (options.strength !== undefined) {
    formData.append("strength", String(options.strength));
  }
  if (options.inputImage) {
    formData.append("inputImage", options.inputImage);
  }

  const response = await fetch(runUrl, {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "x-nonce": nonce,
      "x-signature": signature,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    const msg = formatErrors(data.errors) || data.message || `HTTP ${response.status}`;
    console.error("Wiro Run API yanıtı:", response.status, JSON.stringify(data));
    throw new Error(msg);
  }

  if (!data.result && data.errors?.length) {
    const msg = formatErrors(data.errors);
    console.error("Wiro Run API hatası:", JSON.stringify(data));
    throw new Error(msg);
  }

  return {
    taskId: data.taskid,
    socketAccessToken: data.socketaccesstoken,
  };
}

/**
 * Task/Detail - Görev sonucunu alır
 */
export async function getTaskDetail(taskToken) {
  const apiKey = process.env.WIRO_API_KEY;
  const apiSecret = process.env.WIRO_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error("WIRO_API_KEY ve WIRO_API_SECRET tanımlanmalı");
  }

  const nonce = String(Math.floor(Date.now() / 1000));
  const signature = createSignature(apiSecret, nonce, apiKey);

  const response = await fetch(`${WIRO_API_BASE}/Task/Detail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "x-nonce": nonce,
      "x-signature": signature,
    },
    body: JSON.stringify({ tasktoken: taskToken }),
  });

  const data = await response.json();

  if (!response.ok) {
    const msg = formatErrors(data.errors) || data.message || `HTTP ${response.status}`;
    throw new Error(msg);
  }

  if (!data.result && data.errors?.length) {
    throw new Error(formatErrors(data.errors));
  }

  return data;
}

/**
 * Görsel üretir ve URL döner (polling)
 */
export async function generateImage(prompt, options = {}) {
  const { socketAccessToken } = await runImageGeneration(prompt, options);

  const maxAttempts = 90;
  const pollInterval = 1500;

  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((r) => setTimeout(r, pollInterval));

    const detail = await getTaskDetail(socketAccessToken);
    const task = detail.tasklist?.[0];

    if (!task) {
      throw new Error("Görev bulunamadı");
    }

    const status = task.status;

    if (status === "task_postprocess_end") {
      const output = task.outputs?.[0];
      if (output?.url) {
        return output.url;
      }
      throw new Error("Görsel URL'si alınamadı");
    }

    if (status === "task_error" || status === "task_cancel") {
      throw new Error(task.debugerror || "Görsel üretimi başarısız");
    }
  }

  throw new Error("Görsel üretimi zaman aşımına uğradı");
}
