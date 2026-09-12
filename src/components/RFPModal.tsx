import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Send, FileText } from 'lucide-react';
import { RFPFormData } from '../types';
import { useBodyScrollLock } from '../utils/scrollLock';

interface RFPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RFPModal: React.FC<RFPModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<RFPFormData>({
    organizationName: '',
    contactName: '',
    workEmail: '',
    phone: '',
    organizationType: 'وزارتخانه / سازمان دولتی',
    projectScope: ['پلتفرم‌های دیجیتال کشوری'],
    estimatedTimeline: '۶ تا ۱۲ ماه',
    projectBudget: 'بودجه ملی / تخصیص یافته',
    projectDetails: '',
    securityRequirements: ['گواهی پدافند غیرعامل', 'استقرار Air-Gap']
  });

  // Lock body scroll while modal is open
  useBodyScrollLock(isOpen);

  // Dismiss modal on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCheckboxToggle = (field: 'projectScope' | 'securityRequirements', value: string) => {
    setFormData((prev) => {
      const current = prev[field];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [field]: updated };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="rfp-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 animate-in fade-in duration-200 font-vazir"
    >
      <div className="bg-white rounded-sm max-w-2xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto relative text-right">
        <button
          onClick={onClose}
          aria-label="بستن فرم درخواست پروپوزال"
          className="absolute top-5 left-5 p-2 text-slate-400 hover:text-slate-700 rounded-sm hover:bg-slate-100 cursor-pointer"
          id="close-rfp-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center space-x-3 space-x-reverse mb-4">
              <div className="w-10 h-10 rounded-sm bg-blue-50 text-[#0062BD] flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#0062BD]">ثبت رسمی پروپوزال و استعلام فنی</span>
                <h3 id="rfp-modal-title" className="text-2xl font-black text-slate-900">شروع پروژه سازمانی (RFP)</h3>
              </div>
            </div>

            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              جهت ارزیابی اولیه، بررسی الزامات امنیتی و دریافت شرایط همکاری، مشخصات پروژه خود را ارسال نمایید.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Org & Contact Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    نام سازمان / شرکت *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: وزارت راه و شهرسازی / بانک..."
                    value={formData.organizationName}
                    onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm border border-slate-300 text-sm focus:outline-none focus:border-[#0062BD]"
                    id="rfp-org-input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    نوع سازمان
                  </label>
                  <select
                    value={formData.organizationType}
                    onChange={(e) => setFormData({ ...formData, organizationType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm border border-slate-300 text-sm focus:outline-none focus:border-[#0062BD]"
                    id="rfp-org-type-select"
                  >
                    <option value="وزارتخانه / سازمان دولتی">وزارتخانه / نهاد دولتی</option>
                    <option value="بانک مرکزی / نهاد مالی">بانک / نهاد مالی و اعتباری</option>
                    <option value="زیرساخت حیاتی / صنعتی">اپراتور زیرساخت حیاتی / صنعتی</option>
                    <option value="هلدینگ بزرگ تجاری">هلدینگ بزرگ صنعتی و تجاری</option>
                    <option value="سایر نهادهای حاکمیتی">سایر نهادهای حاکمیتی</option>
                  </select>
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    نام و سمت نماینده *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: مهندس حسینی - مدیر فناوری"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm border border-slate-300 text-sm focus:outline-none focus:border-[#0062BD]"
                    id="rfp-contact-name-input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ایمیل رسمی سازمانی *
                  </label>
                  <input
                    type="email"
                    required
                    dir="ltr"
                    placeholder="hosseini@gov.ir"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm border border-slate-300 text-sm focus:outline-none focus:border-[#0062BD] font-sans text-left"
                    id="rfp-email-input"
                  />
                </div>
              </div>

              {/* Project Scope Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  دامنه و نیازمندی‌های پروژه (چند گزینه را می‌توانید انتخاب کنید)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'توسعه سامانه‌های کلان سازمانی',
                    'پلتفرم‌های دیجیتال کشوری',
                    'راهکارهای هوش مصنوعی و پردازش داده',
                    'مهاجرت و زیرساخت ابری بومی',
                    'امنیت Zero-Trust و پدافند غیرعامل',
                    'گذرگاه یکپارچه‌سازی (API Bus)'
                  ].map((scope) => {
                    const isChecked = formData.projectScope.includes(scope);
                    return (
                      <label
                        key={scope}
                        onClick={() => handleCheckboxToggle('projectScope', scope)}
                        className={`flex items-center space-x-2.5 space-x-reverse p-2.5 rounded-sm border text-xs cursor-pointer select-none transition-colors ${
                          isChecked ? 'bg-blue-50 border-[#0062BD] text-[#0062BD] font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded-xs flex items-center justify-center border ${isChecked ? 'bg-[#0062BD] border-[#0062BD] text-white' : 'border-slate-300'}`}>
                          {isChecked && <CheckCircle2 className="w-3 h-3" />}
                        </div>
                        <span>{scope}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Budget & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    حدود بودجه در نظر گرفته شده
                  </label>
                  <select
                    value={formData.projectBudget}
                    onChange={(e) => setFormData({ ...formData, projectBudget: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm border border-slate-300 text-sm focus:outline-none focus:border-[#0062BD]"
                    id="rfp-budget-select"
                  >
                    <option value="بودجه متوسط سازمانی">بودجه متوسط سازمانی</option>
                    <option value="بودجه کلان / هلدینگی">بودجه کلان / هلدینگی</option>
                    <option value="پروژه ملی و زیرساختی">پروژه ملی و زیرساختی</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    زمان‌بندی مد نظر برای بهره‌برداری
                  </label>
                  <select
                    value={formData.estimatedTimeline}
                    onChange={(e) => setFormData({ ...formData, estimatedTimeline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm border border-slate-300 text-sm focus:outline-none focus:border-[#0062BD]"
                    id="rfp-timeline-select"
                  >
                    <option value="فوری (۱ تا ۳ ماه)">فوری (۱ تا ۳ ماه)</option>
                    <option value="استاندارد (۶ تا ۱۲ ماه)">استاندارد (۶ تا ۱۲ ماه)</option>
                    <option value="راهبردی چندساله (۱۲ تا ۳۶ ماه)">راهبردی چندساله (۱۲ تا ۳۶ ماه)</option>
                  </select>
                </div>
              </div>

              {/* Details Textarea */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  شرح اهداف پروژه و توضیحات تکمیلی
                </label>
                <textarea
                  rows={3}
                  placeholder="اهداف اصلی، حجم کاربران، سامانه‌های مرتبط یا الزامات خاص پدافندی..."
                  value={formData.projectDetails}
                  onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm border border-slate-300 text-sm focus:outline-none focus:border-[#0062BD]"
                  id="rfp-details-textarea"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">تضمین عدم افشای اطلاعات (NDA)</span>
                <button
                  type="submit"
                  id="submit-rfp-form-btn"
                  className="inline-flex items-center space-x-2 space-x-reverse bg-[#0062BD] hover:bg-[#004e9a] text-white px-6 py-3 rounded-sm font-bold text-sm transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4 ml-1" />
                  <span>ثبت و ارسال درخواست RFP</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-2">درخواست RFP شما با موفقیت ثبت شد</h3>

            <p className="text-slate-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
              با تشکر از شما جناب/سرکار خانم <strong>{formData.contactName}</strong>. کد پیگیری درخواست شما: <strong className="text-[#0062BD] font-sans">#RFP-{Math.floor(100000 + Math.random() * 900000)}</strong>
            </p>

            <div className="bg-slate-50 p-4 rounded-sm border border-slate-200 max-w-md mx-auto text-right text-xs text-slate-700 space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="font-bold text-slate-800">سازمان:</span>
                <span>{formData.organizationName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-slate-800">حوزه‌ها:</span>
                <span>{formData.projectScope.join('، ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-slate-800">زمان بررسی:</span>
                <span className="text-emerald-700 font-bold">حداکثر ۲۴ ساعت کاری</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="bg-[#0062BD] hover:bg-[#004e9a] text-white px-8 py-2.5 rounded-sm text-sm font-bold transition-colors cursor-pointer"
            >
              بازگشت به صفحه اصلی
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
