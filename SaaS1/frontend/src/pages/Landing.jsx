import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import PricingCard from "../components/PricingCard";

export default function Landing() {
  const features = [
    {
      icon: "🎨",
      title: "Yapay Zeka ile Görsel Üretimi",
      description: "Metin promptlarınızla saniyeler içinde benzersiz görseller oluşturun. Hayal gücünüz sınır tanımasın.",
    },
    {
      icon: "💬",
      title: "Sohbet Tabanlı Arayüz",
      description: "ChatGPT tarzı sohbet arayüzü ile doğal bir şekilde görsel oluşturun. Geçmişinize her zaman erişin.",
    },
    {
      icon: "⚡",
      title: "Hızlı ve Güvenilir",
      description: "Gelişmiş AI altyapısı ile anında sonuç alın. Görselleriniz güvenle saklanır.",
    },
  ];

  const pricingPlans = [
    {
      title: "Starter",
      price: "9",
      period: "ay",
      features: ["50 görsel üretimi/ay", "Temel modeller", "E-posta desteği"],
      highlight: false,
    },
    {
      title: "Pro",
      price: "29",
      period: "ay",
      features: ["200 görsel üretimi/ay", "Tüm premium modeller", "Öncelikli destek", "Yüksek çözünürlük"],
      highlight: true,
    },
    {
      title: "Enterprise",
      price: "99",
      period: "ay",
      features: ["Sınırsız görsel", "API erişimi", "Özel model eğitimi", "Dedicated destek"],
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.25),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_50%,rgba(217,70,239,0.15),transparent)]" />
        <div className="max-w-4xl mx-auto text-center relative">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Hayalini{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Görsele
            </span>
            <br />
            Dönüştür
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Yapay zeka destekli görsel üretim platformu ile tek bir cümleyle benzersiz görseller oluşturun. 
            Sohbet ederek, iterasyon yaparak mükemmel sonuca ulaşın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-lg hover:from-violet-500 hover:to-fuchsia-500 transition-all shadow-xl shadow-violet-500/30 hover:shadow-violet-500/40"
            >
              Ücretsiz Başla
            </Link>
            <a
              href="#features"
              className="px-8 py-4 rounded-xl border border-slate-600 text-slate-300 font-semibold text-lg hover:bg-slate-800/50 hover:border-slate-500 transition-all"
            >
              Özellikleri Keşfet
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Neden ImagenAI?</h2>
          <p className="text-slate-400 text-center max-w-2xl mx-auto mb-16">
            En son AI teknolojisi ile tanışın. Basit, hızlı ve güçlü.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-violet-500/30 transition-all group"
              >
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Basit Fiyatlandırma</h2>
          <p className="text-slate-400 text-center max-w-2xl mx-auto mb-16">
            İhtiyacınıza uygun planı seçin. İstediğiniz zaman değiştirebilirsiniz.
          </p>
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {pricingPlans.map((plan, i) => (
              <PricingCard key={i} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative rounded-3xl bg-gradient-to-br from-violet-600/30 via-fuchsia-600/20 to-slate-900 border border-violet-500/30 p-12 md:p-16">
            <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.2),transparent_50%)]" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative">
              Hayalinizdeki görselleri oluşturmaya hazır mısınız?
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto relative">
              Hemen ücretsiz hesap oluşturun ve ilk görselinizi dakikalar içinde üretin.
            </p>
            <Link
              to="/register"
              className="inline-flex px-8 py-4 rounded-xl bg-white text-slate-900 font-semibold text-lg hover:bg-slate-100 transition-all shadow-xl relative"
            >
              Ücretsiz Başla
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            ImagenAI
          </div>
          <div className="flex gap-8 text-slate-400 text-sm">
            <a href="#features" className="hover:text-white transition-colors">Özellikler</a>
            <a href="#pricing" className="hover:text-white transition-colors">Fiyatlandırma</a>
            <Link to="/login" className="hover:text-white transition-colors">Giriş Yap</Link>
            <Link to="/register" className="hover:text-white transition-colors">Kayıt Ol</Link>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} ImagenAI. Tüm hakları saklıdır.
        </div>
      </footer>
    </div>
  );
}
