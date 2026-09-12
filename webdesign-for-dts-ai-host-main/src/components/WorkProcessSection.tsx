import React, { useState } from 'react';
import { Clock, CheckCircle2, FileText, ChevronLeft, Layers } from 'lucide-react';
import { PROCESS_STEPS } from '../data';

export const WorkProcessSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const activeStep = PROCESS_STEPS[activeStepIndex];

  return (
    <section id="process" className="py-24 bg-slate-50 border-b border-slate-200/80 font-vazir">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 space-x-reverse px-3.5 py-1 bg-blue-50 border-r-3 border-[#0062BD] text-[#0062BD] mb-4">
            <Layers className="w-4 h-4 text-[#0062BD]" />
            <span className="text-xs font-bold">متدولوژی مهندسی و اجرای پروژه</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-4 font-vazir">
            فرآیند ساختاریافته ۵ مرحله‌ای اجرا
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            فرآیند ۵ مرحله‌ای مهندسی مجموعه ما دقت معماری، شفافیت گزارش‌دهی و استقرار بی‌نقص سامانه‌های کلان را تضمین می‌نماید.
          </p>
        </div>

        {/* Horizontal Stepper Timeline Navigation */}
        <div className="mb-12 overflow-x-auto pb-4">
          <div className="flex items-center min-w-max space-x-2 space-x-reverse sm:space-x-4">
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              const isPast = idx < activeStepIndex;

              return (
                <button
                  key={step.stepNumber}
                  onClick={() => setActiveStepIndex(idx)}
                  id={`process-step-btn-${idx}`}
                  className={`group relative flex items-center space-x-3 space-x-reverse px-5 py-3.5 rounded-sm border text-right transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white border-[#0062BD] shadow-2xs'
                      : isPast
                      ? 'bg-blue-50/60 border-blue-200 text-slate-700'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-sm flex items-center justify-center font-black text-xs transition-colors font-sans ${
                      isActive
                        ? 'bg-[#0062BD] text-white'
                        : isPast
                        ? 'bg-blue-200 text-[#0062BD]'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {step.stepNumber}
                  </div>

                  <div>
                    <span className={`block text-xs font-bold ${isActive ? 'text-[#0062BD]' : 'text-slate-900'}`}>
                      {step.title}
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">{step.duration}</span>
                  </div>

                  {idx < PROCESS_STEPS.length - 1 && (
                    <ChevronLeft className="w-4 h-4 text-slate-300 mr-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Details Card */}
        <div className="bg-white rounded-sm p-8 border border-slate-200/90 shadow-2xs text-right">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Right in RTL: Step Overview */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <span className="text-xs font-bold px-3 py-1 bg-blue-50 text-[#0062BD] rounded-sm border border-blue-100">
                  فاز {activeStep.stepNumber} از ۰۵
                </span>
                <span className="inline-flex items-center space-x-1.5 space-x-reverse text-xs text-slate-500 font-bold">
                  <Clock className="w-3.5 h-3.5 text-[#0062BD]" />
                  <span>زمان‌بندی: {activeStep.duration}</span>
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900">{activeStep.title}</h3>

              <p className="text-slate-700 text-base leading-relaxed">{activeStep.description}</p>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-400 mb-2">حاکمیت فنی و تاییدیه فاز</h4>
                <div className="flex items-center space-x-2 space-x-reverse text-xs font-bold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>مستلزم صورتمجلس رسمی و تاییدیه کمیته راهبری فنی قبل از ورود به فاز بعدی.</span>
                </div>
              </div>
            </div>

            {/* Left in RTL: Key Deliverables Card */}
            <div className="lg:col-span-5 bg-slate-50 rounded-sm p-6 border border-slate-200">
              <div className="flex items-center space-x-2 space-x-reverse mb-4 pb-3 border-b border-slate-200">
                <FileText className="w-5 h-5 text-[#0062BD]" />
                <h4 className="font-bold text-slate-900 text-sm">خروجی‌ها و اسناد تحویلی این فاز</h4>
              </div>

              <div className="space-y-3">
                {activeStep.deliverables.map((deliv, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 space-x-reverse p-3 rounded-sm bg-white border border-slate-200/80 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-[#0062BD] shrink-0 mt-0.5" />
                    <span className="text-xs font-bold text-slate-800">{deliv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
