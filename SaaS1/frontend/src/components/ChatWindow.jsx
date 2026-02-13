import { useState, useRef, useEffect } from "react";
import { supabase } from "../services/supabase";
import { useAuth } from "../context/AuthContext";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ chatId, messages, onMessagesChange, onChatTitleUpdate }) {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);
  const scrollRef = useRef(null);
  const { session } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || !chatId || generating) return;

    setError("");
    setGenerating(true);

    const userMessage = {
      chat_id: chatId,
      role: "user",
      content: prompt.trim(),
      image_url: null,
    };

    try {
      const { data: userMsgData, error: userError } = await supabase
        .from("messages")
        .insert(userMessage)
        .select()
        .single();

      if (userError) throw userError;

      onMessagesChange((prev) => [...prev, userMsgData]);

      if (messages.length === 0) {
        const title = prompt.trim().slice(0, 30) + (prompt.length > 30 ? "..." : "");
        await supabase.from("chats").update({ title }).eq("id", chatId);
        onChatTitleUpdate?.(title);
      }

      setPrompt("");

      const backendUrl = import.meta.env.VITE_API_URL;
      let imageUrl = null;

      if (backendUrl) {
        try {
          const res = await fetch(`${backendUrl.replace(/\/$/, "")}/generate`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.access_token}`,
            },
            body: JSON.stringify({ prompt: prompt.trim() }),
          });
          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.error || "Görsel üretilemedi");
          }
          if (data.image_url) imageUrl = data.image_url;
        } catch (err) {
          setError(err.message);
          const aiContent = `Bir hata oluştu: ${err.message}`;
          const { data: aiMsgData, error: aiErr } = await supabase
            .from("messages")
            .insert({ chat_id: chatId, role: "ai", content: aiContent, image_url: null })
            .select()
            .single();
          if (!aiErr) onMessagesChange((prev) => [...prev, aiMsgData]);
          return;
        }
      }

      const aiContent = imageUrl
        ? "İşte oluşturduğum görsel:"
        : "Backend henüz kurulmadığı için görsel üretilemiyor. Backend çalıştığında burada oluşturulan görsel görünecek.";

      const { data: aiMsgData, error: aiError } = await supabase
        .from("messages")
        .insert({
          chat_id: chatId,
          role: "ai",
          content: aiContent,
          image_url: imageUrl,
        })
        .select()
        .single();

      if (aiError) throw aiError;

      onMessagesChange((prev) => [...prev, aiMsgData]);
    } catch (err) {
      setError(err.message || "Bir hata oluştu.");
    } finally {
      setGenerating(false);
    }
  };

  if (!chatId) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-slate-500 p-8">
        <div className="text-6xl mb-4">🎨</div>
        <p className="text-lg font-medium text-slate-400">Yeni bir sohbet başlatın</p>
        <p className="text-sm mt-1">Sol menüden &quot;Yeni Sohbet&quot;e tıklayın</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-950">
      {/* Mesaj alanı - ChatGPT gibi üstten akış */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto flex flex-col"
      >
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh] text-slate-500">
            <div className="text-6xl mb-4">✨</div>
            <p className="text-xl font-medium text-slate-400">Görsel oluşturmak için prompt girin</p>
            <p className="text-sm text-slate-500 mt-2">
              Örn: &quot;Cyberpunk şehir manzarası, neon ışıklar&quot;
            </p>
          </div>
        ) : (
          <div className="flex flex-col w-full">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
          </div>
        )}
        <div ref={messagesEndRef} className="min-h-4" />
      </div>

      {/* Input - her zaman altta sabit */}
      <div className="flex-shrink-0 border-t border-slate-800 bg-slate-950 p-4">
        {error && (
          <div className="mb-3 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleGenerate} className="max-w-3xl mx-auto flex gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Görsel açıklamasını yazın..."
            disabled={generating}
            className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!prompt.trim() || generating}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold hover:from-violet-500 hover:to-fuchsia-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generating ? "..." : "Üret"}
          </button>
        </form>
      </div>
    </div>
  );
}
