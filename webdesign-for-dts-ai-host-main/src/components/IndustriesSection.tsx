import React from 'react';
import {
  Landmark,
  Coins,
  Zap,
  Truck,
  Activity,
  Factory,
  Building,
  GraduationCap,
  Globe
} from 'lucide-react';
import { INDUSTRIES_DATA } from '../data';

export const IndustriesSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Landmark': return <Landmark className="w-6 h-6 text-[#0062BD]" />;
      case 'Coins': return <Coins className="w-6 h-6 text-[#0062BD]" />;
      case 'Zap': return <Zap className="w-6 h-6 text-[#0062BD]" />;
      case 'Truck': return <Truck className="w-6 h-6 text-[#0062BD]" />;
      case 'Activity': return <Activity className="w-6 h-6 text-[#0062BD]" />;
      case 'Factory': return <Factory className="w-6 h-6 text-[#0062BD]" />;
      case 'Building': return <Building className="w-6 h-6 text-[#0062BD]" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-[#0062BD]" />;
      default: return <Landmark className="w-6 h-6 text-[#0062BD]" />;
    }
  };

  return (
    <section id="industries" className="py-24 bg-slate-50 border-b border-slate-200/80 font-vazir">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 space-x-reverse px-3.5 py-1 bg-blue-50 border-r-3 border-[#0062BD] text-[#0062BD] mb-4">
            <Globe className="w-4 h-4 text-[#0062BD]" />
            <span className="text-xs font-bold">صنایع و حوزه‌های تخصصی</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-4 font-vazir">
            صنایع و کلان‌بخش‌های تحت پوشش
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            ما با رهبران صنایع کلیدی، نهادهای حاکمیتی و هلدینگ‌های کشوری برای مدرن‌سازی عملیات، حاکمیت داده و ایجاد زیرساخت‌های پایدار همکاری می‌کنیم.
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRIES_DATA.map((ind) => (
            <div
              key={ind.id}
              className="bg-white rounded-sm p-6 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group text-right"
            >
              <div>
                <div className="w-12 h-12 rounded-sm bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 group-hover:bg-[#0062BD] transition-colors">
                  <div className="group-hover:text-white transition-colors">
                    {getIcon(ind.iconName)}
                  </div>
                </div>

                <h3 className="font-black text-slate-900 text-lg mb-2 group-hover:text-[#0062BD] transition-colors leading-tight">
                  {ind.name}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {ind.description}
                </p>
              </div>

              {/* Key Solution Tags */}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 block mb-2">
                  راهکارهای ویژه این صنعت
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {ind.keySolutions.map((sol, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-bold px-2 py-0.5 rounded-sm bg-blue-50/80 text-[#0062BD] border border-blue-100"
                    >
                      {sol}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
