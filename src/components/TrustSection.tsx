import React from 'react';
import {
  Shield,
  CheckCircle2,
  Clock,
  Lock,
  Maximize2,
  Cpu,
  Activity,
  Briefcase
} from 'lucide-react';
import { TRUST_FEATURES } from '../data';

export const TrustSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield className="w-5 h-5 text-[#0062BD]" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-[#0062BD]" />;
      case 'Clock': return <Clock className="w-5 h-5 text-[#0062BD]" />;
      case 'Lock': return <Lock className="w-5 h-5 text-[#0062BD]" />;
      case 'Maximize2': return <Maximize2 className="w-5 h-5 text-[#0062BD]" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-[#0062BD]" />;
      case 'Activity': return <Activity className="w-5 h-5 text-[#0062BD]" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-[#0062BD]" />;
      default: return <Shield className="w-5 h-5 text-[#0062BD]" />;
    }
  };

  return (
    <section className="py-24 bg-slate-50 border-b border-slate-200/80 font-vazir">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="max-w-3xl mb-16 text-right">
          <div className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#0062BD] text-xs font-bold border-r-3 border-[#0062BD] mb-4">
            <span>انضباط و اصول سازمانی</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 font-vazir">
            چرا سازمان‌ها و وزارتخانه‌ها به مجموعه ما اعتماد می‌کنند؟
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            متدولوژی مهندسی ما، چارچوب‌های سخت‌گیرانه معماری، حاکمیت شفاف و پشتیبانی بی‌وقفه عملیاتی را برای ثبات بلندمدت زیرساخت‌ها تلفیق می‌نماید.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-sm p-6 border border-slate-200 shadow-2xs flex flex-col justify-between text-right"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-sm bg-blue-50 border border-blue-100 flex items-center justify-center">
                    {getIcon(feature.iconName)}
                  </div>
                  {feature.metric && (
                    <span dir="ltr" className="text-xs font-medium px-2.5 py-0.5 rounded-sm bg-slate-100 text-slate-700 border border-slate-200 font-sans">
                      {feature.metric}
                    </span>
                  )}
                </div>

                <h3 className="font-black text-slate-900 text-base mb-2 leading-tight">
                  {feature.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center space-x-2 space-x-reverse text-xs font-bold text-[#0062BD]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0062BD] shrink-0" />
                <span>استاندارد تایید شده</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
