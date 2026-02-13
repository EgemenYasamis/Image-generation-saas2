import { useState, useEffect, useCallback } from "react";
import { supabase } from "../services/supabase";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

export default function Dashboard() {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creatingChat, setCreatingChat] = useState(false);

  const createNewChat = useCallback(async () => {
    if (!user?.id) return null;
    const { data, error } = await supabase
      .from("chats")
      .insert({ user_id: user.id, title: "Yeni Sohbet" })
      .select()
      .single();
    if (error) {
      console.error("Chat create error:", error);
      return null;
    }
    return data;
  }, [user?.id]);

  const fetchChats = useCallback(async () => {
    if (!user?.id) return;

    const { data, error } = await supabase
      .from("chats")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Chats fetch error:", error);
      return;
    }

    let chatList = data || [];

    // Chat yoksa otomatik yeni sohbet oluştur (ChatGPT gibi - giriş sonrası hazır)
    if (chatList.length === 0) {
      const newChat = await createNewChat();
      if (newChat) chatList = [newChat];
    }

    setChats(chatList);
    if (chatList.length > 0) {
      setCurrentChatId((prev) => prev || chatList[0].id);
    }
  }, [user?.id, createNewChat]);

  const fetchMessages = useCallback(async (chatId) => {
    if (!chatId) {
      setMessages([]);
      return;
    }

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Messages fetch error:", error);
      return;
    }

    setMessages(data || []);
  }, []);

  useEffect(() => {
    fetchChats().finally(() => setLoading(false));
  }, [fetchChats]);

  useEffect(() => {
    fetchMessages(currentChatId);
  }, [currentChatId, fetchMessages]);

  const handleNewChat = async () => {
    if (creatingChat) return;
    setCreatingChat(true);
    try {
      const data = await createNewChat();
      if (data) {
        setChats((prev) => [data, ...prev]);
        setCurrentChatId(data.id);
        setMessages([]);
      } else if (user?.id) {
        alert("Yeni sohbet oluşturulamadı. Lütfen tekrar deneyin.");
      }
    } catch (err) {
      console.error("New chat error:", err);
      alert("Yeni sohbet oluşturulurken bir hata oluştu.");
    } finally {
      setCreatingChat(false);
    }
  };

  const handleSelectChat = (chatId) => {
    setCurrentChatId(chatId);
  };

  const handleChatTitleUpdate = (title) => {
    setChats((prev) =>
      prev.map((c) => (c.id === currentChatId ? { ...c, title } : c))
    );
  };

  if (loading) {
    return (
      <div className="h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500" />
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-950 flex overflow-hidden">
      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        isCreatingChat={creatingChat}
      />
      <main className="flex-1 flex flex-col min-w-0">
        <ChatWindow
          chatId={currentChatId}
          messages={messages}
          onMessagesChange={setMessages}
          onChatTitleUpdate={handleChatTitleUpdate}
        />
      </main>
    </div>
  );
}
