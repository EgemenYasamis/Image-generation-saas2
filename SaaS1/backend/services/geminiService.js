import { GoogleGenAI } from "@google/genai";

// Nano Banana: Gemini'nin yerel görsel üretim modeli (generateContent ile; Imagen predict API değil)
const IMAGE_MODEL = "gemini-2.5-flash-image";

/**
 * Gemini (Nano Banana) ile metinden görsel üretir.
 * generateContent kullanır; Imagen (predict) yerine bu model AI Studio API anahtarıyla çalışır.
 * @param {string} prompt - Görsel açıklaması
 * @param {object} options - (opsiyonel) aspectRatio, imageSize vb.
 * @returns {Promise<string>} data URL (data:image/png;base64,...)
 */
export async function generateImage(prompt, options = {}) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || !apiKey.trim()) {
    throw new Error("GEMINI_API_KEY ortam değişkeni tanımlı değil");
  }

  const ai = new GoogleGenAI({ apiKey });

  const config = {
    responseModalities: ["TEXT", "IMAGE"],
  };
  if (options.aspectRatio) config.aspectRatio = options.aspectRatio;
  if (options.imageSize) config.imageSize = options.imageSize;

  const response = await ai.models.generateContent({
    model: IMAGE_MODEL,
    contents: prompt.trim(),
    config,
  });

  const candidate = response?.candidates?.[0];
  if (!candidate?.content?.parts?.length) {
    throw new Error("Gemini yanıt döndürmedi");
  }

  for (const part of candidate.content.parts) {
    if (part.inlineData?.data) {
      const mimeType = part.inlineData.mimeType || "image/png";
      const base64 = part.inlineData.data;
      return `data:${mimeType};base64,${base64}`;
    }
  }

  throw new Error("Gemini görsel üretemedi (yanıtta resim yok)");
}
