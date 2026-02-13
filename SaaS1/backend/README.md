# ImagenAI Backend

Google Gemini (Imagen) API ile görsel üretimi yapan Node.js + Express backend.

## Kurulum

```bash
npm install
```

## Ortam Değişkenleri

`.env` dosyası:

```
PORT=3001
GEMINI_API_KEY=        # Google AI Studio'dan alın: https://aistudio.google.com/apikey
SUPABASE_URL=
SUPABASE_ANON_KEY=     # JWT doğrulama için
```

## Görsel modeli

- **Gemini 2.5 Flash Image** (`gemini-2.5-flash-image`) – Nano Banana; metinden görsel üretimi (`generateContent` ile, AI Studio API anahtarıyla uyumlu)

## Çalıştırma

```bash
npm run dev
```

Backend `http://localhost:3001` adresinde çalışır.

## Endpoint

### POST /generate

**Auth:** Bearer token (Supabase JWT) gerekli

**Body:**
```json
{ "prompt": "A futuristic cyberpunk city" }
```

**Response:**
```json
{ "image_url": "data:image/png;base64,..." }
```
(Görsel base64 data URL olarak döner; frontend doğrudan `<img src>` ile kullanır.)
