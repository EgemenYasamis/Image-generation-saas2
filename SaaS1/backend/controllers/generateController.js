import { generateImage } from "../services/geminiService.js";

export async function generate(req, res) {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({ error: "Prompt gerekli" });
    }

    const trimmedPrompt = prompt.trim();

    if (trimmedPrompt.length > 2000) {
      return res.status(400).json({ error: "Prompt çok uzun" });
    }

    const imageUrl = await generateImage(trimmedPrompt, {
      numberOfImages: 1,
      aspectRatio: "1:1",
    });

    res.json({ image_url: imageUrl });
  } catch (err) {
    const msg = err.message || "Görsel üretilemedi";
    console.error("Generate error:", msg);
    console.error("Stack:", err.stack);
    res.status(500).json({ error: msg });
  }
}
