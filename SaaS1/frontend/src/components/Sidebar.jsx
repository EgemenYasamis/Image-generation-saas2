import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ chats, currentChatId, onNewChat, onSelectChat, isCreatingChat }) {
  const { signOut, user } = useAuth();

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col min-h-0">
      <div className="p-4 border-b border-slate-800">
        <button
          type="button"
          onClick={onNewChat}
          disabled={isCreatingChat}
          className="w-full flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium transition-colors"
        >
          {isCreatingChat ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          )}
          Yeni Sohbet
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {chats.length === 0 ? (
          <p className="text-slate-500 text-sm px-4 py-2">Henüz sohbet yok</p>
        ) : (
          <div className="space-y-1">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm truncate transition-colors ${
                  currentChatId === chat.id
                    ? "bg-violet-600/30 text-violet-300 border border-violet-500/30"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                {chat.title || "Yeni Sohbet"}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-800">
        <div className="text-xs text-slate-500 mb-2 truncate px-2" title={user?.email}>
          {user?.email}
        </div>
        <button
          onClick={signOut}
          className="w-full flex items-center gap-2 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-colors text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
}
