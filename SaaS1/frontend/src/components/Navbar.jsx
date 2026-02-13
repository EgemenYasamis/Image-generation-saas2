import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
          ImagenAI
        </Link>
        <div className="flex items-center gap-6">
          <a href="#features" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
            Özellikler
          </a>
          <a href="#pricing" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
            Fiyatlandırma
          </a>
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
              >
                Dashboard
              </Link>
              <button
                onClick={signOut}
                className="px-4 py-2 rounded-lg border border-slate-600 text-slate-300 text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                Çıkış
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
              >
                Giriş Yap
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-semibold hover:from-violet-500 hover:to-fuchsia-500 transition-all shadow-lg shadow-violet-500/25"
              >
                Kayıt Ol
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
