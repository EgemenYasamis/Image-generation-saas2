export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`w-full flex gap-4 px-4 py-6 ${
        isUser ? "bg-slate-900/50" : "bg-transparent"
      }`}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white text-sm font-bold">
          AI
        </div>
      )}
      <div
        className={`flex-1 min-w-0 max-w-3xl ${
          isUser ? "ml-auto" : ""
        }`}
      >
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? "bg-violet-600 text-white ml-auto rounded-br-md"
              : "bg-slate-800/80 text-slate-100 rounded-bl-md"
          }`}
        >
          {message.content && (
            <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
              {message.content}
            </p>
          )}
          {message.image_url && (
            <div className="mt-3 rounded-xl overflow-hidden border border-slate-700/50">
              <img
                src={message.image_url}
                alt="AI Generated"
                className="max-w-full max-h-96 object-contain"
              />
            </div>
          )}
        </div>
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
          <svg className="w-4 h-4 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
      )}
    </div>
  );
}
