import { 
  Heart, Target, Sparkles, BookOpen, Compass, CheckCircle2 
} from 'lucide-react';
import { InstagramIcon, YoutubeIcon, GithubIcon, LinkedinIcon } from './SocialIcons';

export const AboutSection: React.FC = () => {
  return (
    <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
      <div className="max-w-3xl mx-auto space-y-4 text-center">
        <span className="text-xs font-black uppercase tracking-wider text-brand-blue bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
          About the Creator & Mission
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          AI with Jeevan
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          A structured, fluff-free curriculum designed to guide beginners from pure Python basics all the way to building autonomous AI agents and deploying real-world machine learning systems.
        </p>
      </div>

      {/* 5 Core Principles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 max-w-4xl mx-auto">
        {[
          { step: "01", title: "Learn", desc: "Understand the core mathematical and algorithmic concepts intuitively without academic overload." },
          { step: "02", title: "Practice", desc: "Write code every single day to cement understanding through focused hands-on problems." },
          { step: "03", title: "Build", desc: "Create working real-world mini-applications and capstone projects that solve authentic problems." },
          { step: "04", title: "Track", desc: "Celebrate milestones, maintain streaks, and watch your skill bars grow day by day." },
          { step: "05", title: "Portfolio", desc: "Graduate on Day 90 with 9 public GitHub repositories and a deployed capstone web application." },
        ].map((item, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-1.5">
            <span className="text-xs font-black text-brand-blue bg-blue-100/70 px-2 py-0.5 rounded-full">
              {item.step}
            </span>
            <p className="font-bold text-slate-800 text-sm">{item.title}</p>
            <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Mentor Quote */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl max-w-3xl mx-auto text-center space-y-3 shadow-lg">
        <Sparkles className="w-8 h-8 text-amber-400 mx-auto" />
        <blockquote className="text-sm sm:text-lg font-medium italic text-slate-200 leading-relaxed">
          "The greatest hurdle in learning AI/ML isn't mathematical complexity — it's tutorial paralysis. This 90-day plan gives you one clear daily answer to: What do I learn today, why do I need it, and what should I build?"
        </blockquote>
        <p className="text-xs font-bold text-sky-400 uppercase tracking-wider">
          — Jeevan • AI with Jeevan
        </p>
      </div>

      {/* Community & Social Links */}
      <div className="text-center space-y-4 pt-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Connect with Jeevan on Social Media
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm hover:opacity-95 transition-opacity"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Follow on Instagram</span>
          </a>

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm hover:bg-red-700 transition-colors"
          >
            <YoutubeIcon className="w-4 h-4" />
            <span>YouTube Channel</span>
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm hover:bg-slate-900 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub Repos</span>
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm hover:bg-blue-700 transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
        </div>

        <p className="text-[11px] text-slate-400 pt-2">
          Designed with love for aspiring AI Engineers & Students worldwide • #AIwithJeevan
        </p>
      </div>
    </section>
  );
};
