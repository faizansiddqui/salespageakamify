'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MessageCircle,
  User,
  Sparkles,
  Star,
  ArrowUpRight,
  Globe,
  CreditCard,
  Truck,
  ShieldCheck,
  Zap,
  Sun,
  Moon
} from 'lucide-react';

const teamMembers = [
  { id: 1, name: "Akram Khan", role: "Content Writer", url: "/akamifyTeam/10.png" },
  { id: 4, name: "Azhar Akhtar", role: "Backend Developer", url: "/akamifyTeam/7.png" },
  { id: 3, name: "Yasir Arafat", role: "Frontend Developer", url: "/akamifyTeam/4.png" },
  { id: 9, name: "Faizan Siddiqui", role: "Software Engineer", url: "/akamifyTeam/11.png" },
  { id: 5, name: "Sameer Ansari", role: "Android Developer", url: "/akamifyTeam/6.png" },
  { id: 6, name: "Prashant Kumar", role: "WP Developer & Sales", url: "/akamifyTeam/13.png" },
  { id: 7, name: "Kartik Rajpoot", role: "Meta Ads Expert", url: "/akamifyTeam/8.png" },
  { id: 8, name: "Anushka Jakhad", role: "Graphic Designer", url: "/akamifyTeam/12.png" },
  { id: 10, name: "Rani Rai", role: "Video Editor & PS", url: "/akamifyTeam/3.png" },
  { id: 11, name: "Tasharika Rajpal", role: "Finance & Ops", url: "/akamifyTeam/2.png" },
  { id: 12, name: "Prince Vineet", role: "Counselor Head", url: "/akamifyTeam/14.png" },
  { id: 13, name: "Rahul Raj", role: "Script & Meta Ads", url: "/akamifyTeam/15.png" },
  { id: 14, name: "Kapil Rajpoot", role: "Shopify Developer", url: "/akamifyTeam/1.png" },
  { id: 15, name: "Suraj Singh", role: "Video & SM Manager", url: "/akamifyTeam/16.png" },
  { id: 16, name: "Annan Hussain", role: "Video Shooter", url: "/akamifyTeam/17.png" },
  { id: 17, name: "Riza Naaz", role: "Content creater & Sales", url: "/akamifyTeam/5.png" },
];

const services = ["Strategy", "UI/UX Design", "Meta Ads", "Shopify", "Development", "UGC Content", "Branding"];

const ourDigitalPartner = [
  { name: "Meta", icon: <Zap size={18} /> },
  { name: "Razorpay", icon: <CreditCard size={18} /> },
  { name: "Google Merchant", icon: <Globe size={18} /> },
  { name: "E-KART", icon: <Truck size={18} /> },
  { name: "BlueDart", icon: <ShieldCheck size={18} /> },
  { name: "DTDC", icon: <Truck size={18} /> },
  { name: "Delhivery", icon: <Truck size={18} /> },
  { name: "Ecom Express", icon: <Zap size={18} /> },
  { name: "Xpressbees", icon: <Truck size={18} /> },
  { name: "Shadowfax", icon: <Zap size={18} /> }
];

const OurTeam = () => {
  const containerRef = useRef(null);

  // Avoid hydration mismatch by rendering theme-only UI after mount
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setMounted(true);

    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') {
      setTheme(saved);
      if (saved === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
      return;
    }

    // No saved preference — respect OS preference
    const prefersDark =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = prefersDark ? 'dark' : 'light';
    setTheme(initial);
    if (initial === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      localStorage.setItem('theme', newTheme);
    } catch (e) {
      // ignore if storage is disabled
    }
    if (newTheme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-white dark:bg-[#020202] text-black dark:text-white selection:bg-purple-500/30 overflow-x-hidden font-sans transition-colors duration-300 ease-in-out"
    >
      {/* Toggle Button */}
      <header className="fixed top-0 right-0 z-50 p-4">
        {mounted && (
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            aria-pressed={theme === 'dark'}
            title="Toggle theme"
            className="p-2 bg-purple-100 dark:bg-purple-900/20 border border-purple-300 dark:border-purple-500/30 rounded-full text-purple-600 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        )}
      </header>

      {/* 1. ATMOSPHERIC BACKGROUND - Smooth & Deep */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(88,28,135,0.05)_0%,_transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_0%,_rgba(88,28,135,0.15)_0%,_transparent_60%)]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-300/10 dark:bg-purple-900/10 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 dark:opacity-20 brightness-100 contrast-150"></div>
      </div>

      {/* 3. HERO SECTION - Clean & Impactful */}
      <section className="relative min-h-[70vh] flex flex-col justify-center items-center px-4 text-center z-10 pt-20 transition-colors duration-300 ease-in-out">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-purple-100/20 dark:bg-purple-900/20 border border-purple-300/30 dark:border-purple-500/30 text-purple-600 dark:text-purple-300 text-[10px] md:text-xs font-bold tracking-[0.3em] mb-8 uppercase backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.15)]"
        >
          <Sparkles size={14} className="animate-pulse" /> The Architects of Growth
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter leading-[0.9] mb-8 bg-gradient-to-b from-black to-black/60 dark:from-white dark:to-white/60 bg-clip-text text-transparent"
        >
          WE ARE <br className="md:hidden" />
          <span className="text-purple-600 italic">AKAMIFY.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-xl mx-auto text-zinc-600 dark:text-zinc-400 text-sm md:text-lg font-normal leading-relaxed tracking-wide"
        >
          A collective of 17 digital specialists dedicated to scaling brands through precise engineering and creative dominance.
        </motion.p>
      </section>

      {/* 4. SERVICES MARQUEE - Slick & Infinite */}
      <div className="relative w-full bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 dark:from-purple-700 dark:via-purple-600 dark:to-purple-700 py-4 sm:py-6 overflow-hidden border-y border-black/10 dark:border-white/10 shadow-[0_0_50px_rgba(147,51,234,0.3)] z-20 transform -rotate-1 md:-rotate-1 scale-105 origin-left transition-colors duration-300 ease-in-out">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-30"></div>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap min-w-full"
        >
          {[...services, ...services, ...services, ...services].map((service, i) => (
            <div key={i} className="flex items-center px-6 md:px-12 gap-3 text-black dark:text-white font-black uppercase tracking-tighter text-xl md:text-4xl italic">
              <Star size={18} fill="black" className="md:w-6 md:h-6 dark:fill-white" stroke="none" /> {service}
            </div>
          ))}
        </motion.div>
      </div>

      {/* 5. PARTNERS - Dark Glassmorphism (Better Contrast) */}
      <div className="relative py-16 z-10 transition-colors duration-300 ease-in-out">
        <div className="px-6 text-center mb-8">
          <h2 className="text-zinc-400 dark:text-zinc-500 text-[10px] font-bold tracking-[0.4em] uppercase">Trusted Ecosystem</h2>
        </div>

        <div className="relative w-full overflow-hidden mask-gradient-sides">
          {/* Mask Gradient for smooth fade on sides */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent dark:from-[#020202] dark:to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent dark:from-[#020202] dark:to-transparent z-20 pointer-events-none" />

          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap gap-8"
          >
            {[...ourDigitalPartner, ...ourDigitalPartner, ...ourDigitalPartner].map((partner, i) => (
              <div key={i} className="flex items-center px-6 py-4 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl backdrop-blur-sm gap-4 group hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 cursor-default">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                  {partner.icon}
                </div>
                <span className="text-zinc-700 dark:text-zinc-300 font-bold uppercase tracking-tight text-sm md:text-base group-hover:text-black dark:group-hover:text-white transition-colors">{partner.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 6. FEATURED TEAM (Responsive Arc/Slider) */}
      <section className="relative pb-10 md:pb-20 mt-10 transition-colors duration-300 ease-in-out">
        <div className="px-6 text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white">CORE TEAM</h2>
        </div>

        {/* Mobile: Horizontal Scroll Snap | Desktop: Arc Animation */}
        <div className="md:hidden flex overflow-x-auto gap-4 px-6 snap-x snap-mandatory scrollbar-hide pb-8">
          {teamMembers.slice(0, 5).map((member) => (
            <div key={member.id} className="snap-center shrink-0 w-[240px] relative rounded-2xl overflow-hidden aspect-[3/4] border border-black/10 dark:border-white/10 shadow-2xl">
              <img src={member.url} className="w-full h-full object-cover" loading="lazy" alt={member.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-[10px] font-bold text-purple-400 uppercase">{member.role}</p>
                <p className="text-lg font-bold text-white">{member.name}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:flex justify-center items-end gap-2 lg:gap-4 h-[450px] px-4">
          {teamMembers.slice(0, 7).map((member, index) => {
            const isCenter = index === 3;
            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: Math.pow(index - 3, 2) * 15 }} // The parabolic arc
                viewport={{ once: true }}
                whileHover={{ y: -30, scale: 1.1, zIndex: 50 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative shrink-0 w-[140px] lg:w-[180px] aspect-[2/3] rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 group cursor-pointer transition-all duration-300 ${isCenter ? 'z-20 shadow-[0_0_50px_rgba(147,51,234,0.3)] border-purple-500/50' : 'z-10 grayscale hover:grayscale-0'}`}
              >
                <img src={member.url} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                <motion.div
                  initial={{ opacity: isCenter ? 0 : 1 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute bottom-4 left-0 right-0 text-center"
                >
                  <p className="text-[8px] font-bold text-purple-400 uppercase tracking-widest mb-1">{member.role}</p>
                  <p className="text-sm font-bold text-white leading-tight">{member.name}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 7. FULL ROSTER GRID */}
      <section className="relative py-20 mt-10 px-4 md:px-8 max-w-8xl mx-auto z-10 transition-colors duration-300 ease-in-out">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 border-b border-black/10 dark:border-white/10 pb-8 gap-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-black to-zinc-400 dark:from-white dark:to-zinc-600">
            THE SQUAD
          </h2>
          <div className="flex items-center gap-2 text-zinc-500 text-sm font-mono uppercase tracking-widest">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {teamMembers.length} Experts Online
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.05 }}
              className="group relative"
            >
              <div className="relative aspect-[3/4] bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden border border-black/5 dark:border-white/5 shadow-2xl transition-colors duration-300">
                <img
                  src={member.url}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-in-out"
                  alt={member.name}
                />

                {/* Desktop Overlay - Only shows on Hover */}
                <div className="hidden md:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300 items-center justify-center gap-4">
                  <button className="p-3 bg-white text-black rounded-full hover:bg-purple-500 hover:text-white transition-colors translate-y-4 group-hover:translate-y-0 duration-300 shadow-xl">
                    <MessageCircle size={18} />
                  </button>
                  <button className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors translate-y-4 group-hover:translate-y-0 duration-300 delay-75 shadow-xl shadow-purple-500/20">
                    <User size={18} />
                  </button>
                </div>

                {/* Info Card - Always visible on Mobile, nicely gradiented on Desktop */}
                <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black via-black/90 to-transparent">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[9px] text-purple-400 font-black tracking-[0.2em] uppercase mb-1">{member.role}</p>
                      <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-purple-100 transition-colors">
                        {member.name}
                      </h3>
                    </div>
                    <ArrowUpRight size={18} className="text-zinc-500 group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. FOOTER - Modern & Clean */}
      <footer className="relative py-20 md:py-32 px-6 border-t border-black/5 dark:border-white/5 bg-white dark:bg-[#020202] transition-colors duration-300 ease-in-out">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="w-px h-16 md:h-24 bg-gradient-to-b from-transparent via-purple-500 to-transparent mb-8" />

          <h2 className="text-5xl md:text-[8vw] font-black tracking-tighter leading-none mb-10 text-zinc-200 dark:text-zinc-800 select-none">
            AKAMIFY
          </h2>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 md:px-12 md:py-5 bg-black dark:bg-white text-white dark:text-black rounded-full overflow-hidden"
          >
            <div className="absolute inset-0 bg-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            <span className="relative z-10 font-black text-xs md:text-sm tracking-[0.2em] uppercase group-hover:text-white transition-colors">
              Start a Project
            </span>
          </motion.button>

          <div className="flex flex-col md:flex-row gap-6 md:gap-12 mt-20 text-[10px] text-zinc-400 dark:text-zinc-500 tracking-[0.2em] font-bold uppercase">
            <a href="#" className="hover:text-purple-400 transition-colors">Instagram</a>
            <a href="#" className="hover:text-purple-400 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Twitter</a>
          </div>

          <p className="mt-8 text-zinc-300 dark:text-zinc-700 text-[10px]">© 2026 Akamify Digital Inc.</p>
        </div>
      </footer>
    </div>
  );
};

export default OurTeam;