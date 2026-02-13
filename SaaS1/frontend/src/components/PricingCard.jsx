import { Link } from "react-router-dom";

export default function PricingCard({ title, price, period, features, highlight = false }) {
  return (
    <div
      className={`relative rounded-2xl p-8 ${
        highlight
          ? "bg-gradient-to-b from-violet-600/20 to-fuchsia-600/10 border-2 border-violet-500/50 shadow-xl shadow-violet-500/10 scale-105"
          : "bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-colors"
      }`}
    >
      {highlight && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-violet-500 text-white text-xs font-semibold">
          En Popüler
        </span>
      )}
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <div className="mb-6">
        <span className="text-4xl font-extrabold text-white">${price}</span>
        <span className="text-slate-400 ml-1">/{period}</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
            <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <Link
        to="/register"
        className={`block w-full py-3 px-4 rounded-lg text-center font-semibold transition-all ${
          highlight
            ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-500 hover:to-fuchsia-500 shadow-lg shadow-violet-500/25"
            : "bg-slate-700 text-white hover:bg-slate-600"
        }`}
      >
        Başla
      </Link>
    </div>
  );
}
