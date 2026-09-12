import React, { useState } from 'react';
import {
  Code2,
  Building2,
  Cpu,
  Cloud,
  TrendingUp,
  Network,
  ShieldCheck,
  Layers,
  ArrowLeft,
  X,
  CheckCircle2
} from 'lucide-react';
import { CAPABILITIES_DATA } from '../data';
import { Capability } from '../types';

export const CapabilitiesSection: React.FC = () => {
  const [selectedCapability, setSelectedCapability] = useState<Capability | null>(null);

  // Helper to resolve icon components dynamically
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-6 h-6 text-[#0062BD]" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-[#0062BD]" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-[#0062BD]" />;
      case 'Cloud': return <Cloud className="w-6 h-6 text-[#0062BD]" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-[#0062BD]" />;
      case 'Network': return <Network className="w-6 h-6 text-[#0062BD]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#0062BD]" />;
      case 'Layers': return <Layers className="w-6 h-6 text-[#0062BD]" />;
      default: return <Building2 className="w-6 h-6 text-[#0062BD]" />;
    }
  };

  return (
    <section id="capabilities" className="py-24 bg-white border-b border-slate-200/80 font-vazir">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center px-3.5 py-1 bg-blue-50 text-[#0062BD] text-xs font-bold border-r-3 border-[#0062BD] mb-4">
            <span>توانمندی‌ها و حوزه خدمات تخصصی</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4 font-vazir">
            خدمات مهندسی نرم‌افزار و زیرساخت
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            گروه‌های تخصصی مهندسی مجموعه ما طراحی، توسعه و پشتیبانی سامانه‌های نرم‌افزاری حیاتی، ابری و هوش مصنوعی را در بالاترین سطح استاندارد ارائه می‌کنند.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAPABILITIES_DATA.map((cap) => (
            <div
              key={cap.id}
              onClick={() => setSelectedCapability(cap)}
              id={`capability-card-${cap.id}`}
              className="group relative bg-white rounded-sm p-6 border border-slate-200/80 hover:border-[#0062BD] shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Icon Badge */}
                <div className="w-10 h-10 rounded-sm bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 group-hover:bg-[#0062BD] transition-colors duration-200">
                  <div className="group-hover:text-white transition-colors">
                    {renderIcon(cap.iconName)}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-base font-black text-slate-900 mb-2 group-hover:text-[#0062BD] transition-colors leading-snug">
                  {cap.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {cap.shortDescription}
                </p>
              </div>

              {/* Card Footer Link */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0062BD] group-hover:text-[#004e9a]">
                <span>مشاهده جزییات تخصصی</span>
                <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Capability Detail Modal */}
      {selectedCapability && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200 font-vazir">
          <div className="bg-white rounded-sm max-w-2xl w-full p-6 sm:p-8 border border-slate-200 shadow-xl max-h-[90vh] overflow-y-auto relative text-right">
            <button
              onClick={() => setSelectedCapability(null)}
              className="absolute top-5 left-5 p-2 text-slate-400 hover:text-slate-700 rounded-sm hover:bg-slate-100 cursor-pointer"
              id="close-capability-modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 space-x-reverse mb-4">
              <div className="w-12 h-12 rounded-sm bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                {renderIcon(selectedCapability.iconName)}
              </div>
              <div>
                <span className="text-xs font-bold text-[#0062BD]">شناسنامه خدمات تخصصی</span>
                <h3 className="text-2xl font-black text-slate-900">{selectedCapability.title}</h3>
              </div>
            </div>

            <p className="text-slate-700 text-base mb-6 leading-relaxed">
              {selectedCapability.shortDescription}
            </p>

            {/* Detailed Features */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-slate-900 mb-3 border-r-2 border-[#0062BD] pr-2">ویژگی‌های معماری و فنی</h4>
              <div className="space-y-2.5">
                {selectedCapability.detailedFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 space-x-reverse p-3 rounded-sm bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-[#0062BD] shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-800 font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Institutional Use Cases */}
            <div className="mb-8">
              <h4 className="text-sm font-bold text-slate-900 mb-3 border-r-2 border-[#0062BD] pr-2">کاربردهای سازمانی و حاکمیتی</h4>
              <div className="flex flex-wrap gap-2">
                {selectedCapability.useCases.map((uc, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-50 text-[#0062BD] text-xs font-bold rounded-sm border border-blue-100">
                    {uc}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-start">
              <button
                onClick={() => setSelectedCapability(null)}
                className="bg-[#0062BD] hover:bg-[#004e9a] text-white px-6 py-2.5 rounded-sm text-sm font-bold transition-colors cursor-pointer"
              >
                بستن راهنما
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
