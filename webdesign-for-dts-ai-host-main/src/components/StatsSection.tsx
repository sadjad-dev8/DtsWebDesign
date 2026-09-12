import React, { useEffect, useState, useRef } from 'react';
import { ShieldCheck, CheckCircle2, Server } from 'lucide-react';
import { STATS_DATA } from '../data';

export const StatsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-[#0062BD] text-white relative overflow-hidden font-vazir">
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-10 bg-enterprise-grid pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1 bg-white/10 border-r-3 border-[#00D2FF] text-white text-xs font-bold mb-4">
            <span>شاخص‌های عملیاتی و مقیاس‌پذیری</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 font-vazir">
            مقیاس‌پذیری و پایداری اثبات‌شده
          </h2>
          <p className="text-sky-100 text-base sm:text-lg leading-relaxed">
            سابقه درخشان در طراحی و نگهداری سامانه‌های ملی، زیرساخت‌های بانکی کشور و پلتفرم‌های پرترافیک دولتی با بالاتری درصد پایداری (SLA).
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {STATS_DATA.map((stat) => (
            <div
              key={stat.id}
              className="bg-white/10 rounded-sm p-6 border border-white/20 text-center flex flex-col items-center justify-center transition-colors"
            >
              <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tighter mb-2 font-sans dir-ltr">
                {isVisible ? stat.value : 0}
                <span className="text-[#00D2FF]">{stat.suffix}</span>
              </div>
              <h3 className="text-xs sm:text-sm font-black text-white mb-1">{stat.label}</h3>
              <p className="text-xs text-sky-100/90 font-medium">{stat.sublabel}</p>
            </div>
          ))}
        </div>

        {/* Security & Compliance Badges Banner */}
        <div className="pt-8 border-t border-white/20 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center space-x-3 space-x-reverse bg-white/5 p-4 rounded-sm border border-white/10">
            <ShieldCheck className="w-6 h-6 text-[#00D2FF] shrink-0" />
            <div className="text-right">
              <h4 className="text-xs font-black text-white">گواهینامه ISO 27001</h4>
              <p className="text-xs text-sky-200">مدیریت امنیت اطلاعات و داده‌ها</p>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-3 space-x-reverse bg-white/5 p-4 rounded-sm border border-white/10">
            <Server className="w-6 h-6 text-[#00D2FF] shrink-0" />
            <div className="text-right">
              <h4 className="text-xs font-black text-white">استقرار شبکه Air-Gap</h4>
              <p className="text-xs text-sky-200">عدم نشت داده و ارتباطات خارج از شبکه</p>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-3 space-x-reverse bg-white/5 p-4 rounded-sm border border-white/10">
            <CheckCircle2 className="w-6 h-6 text-[#00D2FF] shrink-0" />
            <div className="text-right">
              <h4 className="text-xs font-black text-white">صفر رخنه امنیتی</h4>
              <p className="text-xs text-sky-200">در بیش از ۱۵ سال فعالیت متمادی</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
