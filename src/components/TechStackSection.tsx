import React, { useState } from 'react';
import { Cpu, Check } from 'lucide-react';
import { TECH_STACK_DATA } from '../data';

export const TechStackSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', ...TECH_STACK_DATA.map((c) => c.id)];

  const displayedTechs = activeCategory === 'all'
    ? TECH_STACK_DATA
    : TECH_STACK_DATA.filter((c) => c.id === activeCategory);

  return (
    <section id="tech-stack" className="py-24 bg-white border-b border-slate-200/80 font-vazir">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-2 space-x-reverse px-3.5 py-1 bg-blue-50 border-r-3 border-[#0062BD] text-[#0062BD] mb-4">
            <Cpu className="w-4 h-4 text-[#0062BD]" />
            <span className="text-xs font-bold">پشته فناوری‌های بومی و استاندارد</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-4 font-vazir">
            پشته تکنولوژی و استانداردهای مهندسی
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            توسعه تمامی سامانه‌ها صرفاً بر پایه استانداردهای باز، زبان‌های با کارایی بالا و زیرساخت‌های ابری بومی انجام می‌پذیرد تا استقلال کامل تکنولوژیک تضمین گردد.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10 pb-2 border-b border-slate-100">
          {categories.map((catId) => {
            const isAll = catId === 'all';
            const catObj = TECH_STACK_DATA.find((c) => c.id === catId);
            const label = isAll ? 'تمامی لایه‌ها' : catObj?.category || catId;
            const isActive = activeCategory === catId;

            return (
              <button
                key={catId}
                onClick={() => setActiveCategory(catId)}
                className={`px-4 py-2 rounded-sm text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#0062BD] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Tech Stack Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedTechs.map((cat) => (
            <div
              key={cat.id}
              className="bg-slate-50/70 rounded-sm p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between text-right"
            >
              <div>
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-200/60">
                  <h3 className="text-lg font-black text-slate-900">
                    {cat.category}
                  </h3>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-sm bg-blue-50 text-[#0062BD] border border-blue-100">
                    استاندارد تایید شده
                  </span>
                </div>

                <div className="space-y-4">
                  {cat.items.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-sm bg-white border border-slate-200/70 shadow-2xs">
                      <div className="flex items-center justify-between mb-1">
                        <span dir="ltr" className="font-bold text-slate-900 text-sm font-sans">{item.name}</span>
                        <span dir="ltr" className="text-xs font-medium px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 font-sans">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-vazir">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-200/60 flex items-center space-x-2 space-x-reverse text-xs text-slate-600 font-bold">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>تست شده در تست ممیزی امنیتی و زیرساخت Air-Gap</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
