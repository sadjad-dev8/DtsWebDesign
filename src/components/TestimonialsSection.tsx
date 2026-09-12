import React from 'react';
import { Quote, Landmark, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-white border-b border-slate-200/80 font-vazir">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 space-x-reverse px-3.5 py-1 bg-blue-50 border-r-3 border-[#0062BD] text-[#0062BD] mb-4">
            <Landmark className="w-4 h-4 text-[#0062BD]" />
            <span className="text-xs font-bold">دیدگاه مدیران ارشد و حاکمیتی</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-4 font-vazir">
            مورد اعتماد مدیران عالی‌رتبه کشوری و سازمانی
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            بازخورد رهبران فناوری و تصمیم‌گیرندگان کلیدی سازمان‌های دولتی، نهادهای مالی و زیرساخت‌های کشوری در همکاری با مجموعه ما.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="bg-slate-50/80 rounded-sm p-8 border border-slate-200/90 shadow-2xs flex flex-col justify-between relative hover:border-[#0062BD]/40 transition-all duration-200 text-right"
            >
              <div>
                <Quote className="w-8 h-8 text-[#0062BD]/30 mb-4 rotate-180" />

                <p className="text-slate-800 text-sm leading-relaxed mb-6 font-medium">
                  «{t.quote}»
                </p>
              </div>

              <div>
                {/* Impact Metric Badge */}
                <div className="mb-6 p-2.5 rounded-sm bg-blue-50 border border-blue-100 flex items-center space-x-2 space-x-reverse text-xs font-bold text-[#0062BD]">
                  <CheckCircle2 className="w-4 h-4 text-[#0062BD] shrink-0" />
                  <span>{t.impactMetrics}</span>
                </div>

                <div className="pt-4 border-t border-slate-200/70">
                  <h3 className="font-black text-slate-900 text-sm">{t.clientRole}</h3>
                  <p className="text-xs font-bold text-[#0062BD] mt-0.5">{t.organization}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{t.orgType}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
