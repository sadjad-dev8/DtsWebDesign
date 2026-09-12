import React from 'react';
import { ArrowLeft, ShieldCheck, Mail, FileText } from 'lucide-react';

interface FinalCTASectionProps {
  onContactUs: () => void;
  onStartProject: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({
  onContactUs,
  onStartProject
}) => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden font-vazir">
      {/* Background Enterprise Grid */}
      <div className="absolute inset-0 opacity-10 bg-enterprise-grid pointer-events-none" />

      {/* Radial Glow */}
      <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#0062BD]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 space-x-reverse px-3.5 py-1.5 rounded-sm bg-white/10 border border-white/20 text-sky-200 mb-6 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-[#00D2FF]" />
            <span className="text-xs font-bold">همکاری‌های ملی و درخواست جلسه فنی</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 leading-tight font-vazir">
            با هم زیرساخت دیجیتال فردا را می‌سازیم
          </h2>

          <p className="text-slate-300 text-base sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
            خواه در حال برنامه‌ریزی یک سامانه ملی، پلتفرم سازمانی، سیستم هوش مصنوعی یا پروژه تحول دیجیتال باشید، تیم مهندسی ما برای تحقق آن آماده است.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={onStartProject}
              id="final-cta-start-project-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 space-x-reverse bg-[#0062BD] hover:bg-[#004e9a] text-white px-8 py-4 rounded-sm font-bold text-base transition-all duration-200 shadow-md cursor-pointer"
            >
              <FileText className="w-5 h-5" />
              <span>ثبت درخواست جلسه و پروپوزال (RFP)</span>
              <ArrowLeft className="w-5 h-5 mr-1" />
            </button>

            <button
              onClick={onContactUs}
              id="final-cta-contact-us-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 space-x-reverse bg-white/10 hover:bg-white/15 text-white border border-white/20 px-8 py-4 rounded-sm font-bold text-base transition-all duration-200 backdrop-blur-md cursor-pointer"
            >
              <Mail className="w-5 h-5" />
              <span>ارتباط با تیم مشاوره ارشد</span>
            </button>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-300 font-bold">
            <span>دبیرخانه پروپوزال و استعلام‌ها: <strong className="text-white font-sans">rfp@aegis-infra.com</strong></span>
            <span className="hidden sm:inline">•</span>
            <span>خط ویژه پشتیبانی ۲۴/۷ عملیاتی برای سازمان‌های طرف قرارداد</span>
          </div>
        </div>
      </div>
    </section>
  );
};
