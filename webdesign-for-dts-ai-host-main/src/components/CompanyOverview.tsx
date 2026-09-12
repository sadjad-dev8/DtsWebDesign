import React from 'react';
import { ShieldCheck, Award, Layers, Lock, Cpu, Users } from 'lucide-react';

interface CompanyOverviewProps {
  onLearnMore?: () => void;
}

export const CompanyOverview: React.FC<CompanyOverviewProps> = () => {
  return (
    <section id="overview" className="py-20 bg-slate-50 border-b border-slate-200/80 font-vazir">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Right Side in RTL: Narrative Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center px-3.5 py-1 bg-blue-50 text-[#0062BD] text-xs font-bold border-r-3 border-[#0062BD]">
              <span>درباره مجموعه ما</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight font-vazir">
              خلق راهکارهای نرم‌افزاری برای پروژه‌های ملی و سازمانی
            </h2>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-bold">
              مجموعه مهندسی نرم‌افزار ما مجری و مشاور ارشد طراحی و پیاده‌سازی زیرساخت‌های کلان نرم‌افزاری، سامانه های سازمانی و پلتفرم‌های دیجیتال ملی در کشور است.
            </p>

            <p className="text-slate-600 text-base leading-relaxed">
              تخصص ما خلق سامانه‌های نرم‌افزاری مقیاس‌پذیری است که قادرند میلیون‌ها تراکنش و کاربر همزمان را با بالاترین ضریب پایداری، امنیت بومی و معماری استاندارد TOGAF پشتیبانی نمایند. ما با بهره‌گیری از تیم‌های تخصصی مهندسی نرم‌افزار، زیرساخت ابری و هوش مصنوعی، بستر تحول دیجیتال واقعی را برای سازمان‌ها، وزارتخانه‌ها و هلدینگ‌های کشوری فراهم می‌سازیم.
            </p>

            {/* Strategic Pillars List */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-sm bg-white border border-slate-200 shadow-2xs">
                <div className="w-8 h-8 rounded-sm bg-blue-50 text-[#0062BD] flex items-center justify-center mb-2 font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">مدیریت و امنیت داده</h3>
                <p className="text-slate-500 text-xs leading-relaxed">طراحی مطابق با الزامات شرکتی، ایزوله‌سازی شبکه‌ای و پدافند غیرعامل.</p>
              </div>

              <div className="p-4 rounded-sm bg-white border border-slate-200 shadow-2xs">
                <div className="w-8 h-8 rounded-sm bg-blue-50 text-[#0062BD] flex items-center justify-center mb-2 font-bold">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">عدم وابستگی به تامین‌کننده</h3>
                <p className="text-slate-500 text-xs leading-relaxed">توسعه بومی مبتنی بر استانداردهای باز و میکروخدمات بدون وابستگی تجاری.</p>
              </div>
            </div>
          </div>

          {/* Left Side in RTL: Visual Governance Card */}
          <div className="lg:col-span-6">
            <div className="relative bg-white rounded-sm p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center space-x-3 space-x-reverse mb-6 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-sm bg-[#0062BD] text-white flex items-center justify-center font-black text-xs">
                  تیم ما
                </div>
                <div className="text-right">
                  <h3 className="font-black text-slate-900 text-lg">چارچوب و اصول مهندسی</h3>
                  <p className="text-xs font-bold text-slate-500 mt-0.5">اصول کلیدی معماری و مدیریت فنی نرم‌افزار</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-3.5 rounded-sm bg-slate-50 border border-slate-200/80 flex items-start space-x-3 space-x-reverse">
                  <Award className="w-5 h-5 text-[#0062BD] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">پایداری سازمانی</h4>
                    <p className="text-xs text-slate-500 mt-0.5">طراحی برای طول عمر چندین دهه‌ای عملیاتی همراه با بروزرسانی‌های مداوم بدون قطعی.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-sm bg-slate-50 border border-slate-200/80 flex items-start space-x-3 space-x-reverse">
                  <Lock className="w-5 h-5 text-[#0062BD] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">امنیت لایه‌ای و Air-Gap</h4>
                    <p className="text-xs text-slate-500 mt-0.5">رمزنگاری چندلایه در حالت سکون، انتقال و اجرا با پشتیبانی از ماژول‌های امنیت سخت‌افزاری.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-sm bg-slate-50 border border-slate-200/80 flex items-start space-x-3 space-x-reverse">
                  <Cpu className="w-5 h-5 text-[#0062BD] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">پردازش ابری شرکتی</h4>
                    <p className="text-xs text-slate-500 mt-0.5">استقرار در مراکز داده درونی و ابر شرکتی بدون کوچکترین نشت داده به خارج.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-sm bg-slate-50 border border-slate-200/80 flex items-start space-x-3 space-x-reverse">
                  <Users className="w-5 h-5 text-[#0062BD] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">استقرار تیم‌های مقیم</h4>
                    <p className="text-xs text-slate-500 mt-0.5">تیم‌های کارشناسی مهندسی مقیم جهت تضمین پایداری عملیاتی و انتقال دانش فنی.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>توسعه‌دهنده رسمی سیستم‌های شرکتی</span>
                <span className="font-bold text-[#0062BD]">گواهینامه ISO / IEC 27001</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
