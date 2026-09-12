import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenRFP: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenRFP }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 font-vazir">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800 text-right">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex flex-col items-start space-y-2">
              <Logo variant="full" className="h-9 sm:h-10" showSubtext={true} lightBackground={false} />
            </div>

            <p className="text-slate-400 text-sm leading-relaxed pl-4">
              طراحی، توسعه و پشتیبانی زیرساخت‌های نرم‌افزاری ملی، پلتفرم‌های کلان سازمانی، راهکارهای ابری بومی و سامانه پردازش هوش مصنوعی برای وزارتخانه‌ها، نهادها و صنایع کشور.
            </p>

            <div className="pt-2 flex items-center space-x-3 space-x-reverse text-slate-400">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-sm bg-slate-800 flex items-center justify-center hover:bg-[#0062BD] hover:text-white transition-colors"
                aria-label="LinkedIn"
                id="footer-linkedin-link"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-sm bg-slate-800 flex items-center justify-center hover:bg-[#0062BD] hover:text-white transition-colors"
                aria-label="GitHub"
                id="footer-github-link"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('hero');
                }}
                className="w-9 h-9 rounded-sm bg-slate-800 flex items-center justify-center hover:bg-[#0062BD] hover:text-white transition-colors"
                aria-label="Global Home"
                id="footer-global-link"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-black text-white">دسترسی سریع</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-white transition-colors cursor-pointer">صفحه اصلی</button>
              </li>
              <li>
                <button onClick={() => onNavigate('overview')} className="hover:text-white transition-colors cursor-pointer">درباره شرکت</button>
              </li>
              <li>
                <button onClick={() => onNavigate('capabilities')} className="hover:text-white transition-colors cursor-pointer">توانمندی‌ها</button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-white transition-colors cursor-pointer">پروژه‌های شاخص</button>
              </li>
              <li>
                <button onClick={() => onNavigate('industries')} className="hover:text-white transition-colors cursor-pointer">صنایع مرتبط</button>
              </li>
              <li>
                <button onClick={() => onNavigate('tech-stack')} className="hover:text-white transition-colors cursor-pointer">پشته فناوری</button>
              </li>
            </ul>
          </div>

          {/* Solutions & Practice Areas */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-black text-white">حوزه‌های تخصصی</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>پلتفرم‌های دیجیتال کشوری</li>
              <li>مدیریت زیرساخت‌های کلان سازمانی</li>
              <li>هوش مصنوعی بومی و پردازش دادگان</li>
              <li>معماری ابری و زیرساخت Air-Gap</li>
              <li>سامانه‌های امنیت Zero-Trust</li>
              <li>گذرگاه‌های پرداخت بین‌بانکی</li>
            </ul>
          </div>

          {/* Contact Details Placeholder */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-black text-white">دفتر مرکزی و دبیرخانه</h4>

            <div className="space-y-2.5 text-sm text-slate-400">
              <div className="flex items-start space-x-2.5 space-x-reverse">
                <MapPin className="w-4 h-4 text-[#00D2FF] shrink-0 mt-1" />
                <span>تهران، مرکز فناوری و نوآوری، ساختمان برج نوآوری</span>
              </div>

              <div className="flex items-center space-x-2.5 space-x-reverse font-sans dir-ltr justify-end">
                <span>+98 (21) 8855-0000</span>
                <Phone className="w-4 h-4 text-[#00D2FF] shrink-0" />
              </div>

              <div className="flex items-center space-x-2.5 space-x-reverse font-sans dir-ltr justify-end">
                <span>contact@infra-platform.ir</span>
                <Mail className="w-4 h-4 text-[#00D2FF] shrink-0" />
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenRFP}
                id="footer-rfp-btn"
                className="inline-flex items-center space-x-2 space-x-reverse bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-sm text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
              >
                <span>ثبت درخواست پروپوزال (RFP)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Security Seals & Copyright Footer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-slate-400">استافداردها و تاییده‌ها:</span>
            <span className="px-2 py-1 bg-slate-800 rounded-xs text-slate-300 font-sans">ISO 27001 : 2022</span>
            <span className="px-2 py-1 bg-slate-800 rounded-xs text-slate-300">گواهی پدافند غیرعامل</span>
            <span className="px-2 py-1 bg-slate-800 rounded-xs text-slate-300">تاییدیه افتای کشوری</span>
            <span className="px-2 py-1 bg-slate-800 rounded-xs text-slate-300">گواهینامه رتبه‌بندی شورای عالی انفورماتیک</span>
          </div>

          <div>
            <p>© {new Date().getFullYear()} کلیه حقوق این وب‌سایت متعلق به این مجموعه مهندسی است.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
