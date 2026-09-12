import React, { useState } from 'react';
import { X, Mail, CheckCircle2, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('جلسه مشاوره معماری نرم‌افزار');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 animate-in fade-in duration-200 font-vazir">
      <div className="bg-white rounded-sm max-w-xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto text-right">
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 text-slate-400 hover:text-slate-700 rounded-sm hover:bg-slate-100 cursor-pointer"
          id="close-contact-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center space-x-3 space-x-reverse mb-4">
              <div className="w-10 h-10 rounded-sm bg-blue-50 text-[#0062BD] flex items-center justify-center font-bold">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#0062BD]">ارتباط با دپارتمان مشاوره</span>
                <h3 className="text-2xl font-black text-slate-900">درخواست مشاوره و تماس</h3>
              </div>
            </div>

            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              جهت هماهنگی جلسه معارفه تخصصی یا مشاوره معماری سامانه‌ها، اطلاعات فرم زیر را تکمیل نمایید.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  نام و نام خانوادگی *
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: دکتر علی رضایی"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-sm border border-slate-300 text-sm focus:outline-none focus:border-[#0062BD]"
                  id="contact-name-input"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ایمیل سازمانی *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@organization.ir"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-sm border border-slate-300 text-sm focus:outline-none focus:border-[#0062BD] font-sans"
                  id="contact-email-input"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  موضوع درخواست
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-sm border border-slate-300 text-sm focus:outline-none focus:border-[#0062BD]"
                  id="contact-subject-select"
                >
                  <option value="جلسه مشاوره معماری نرم‌افزار">جلسه مشاوره معماری نرم‌افزار</option>
                  <option value="استعلام مشارکت در پروژه ملی">استعلام مشارکت در پروژه ملی</option>
                  <option value="بررسی راهکارهای ابر حاکمیتی و هوش مصنوعی">بررسی راهکارهای ابر حاکمیتی و هوش مصنوعی</option>
                  <option value="ممیزی امنیت و استانداردهای پدافند">ممیزی امنیت و استانداردهای پدافند</option>
                  <option value="سایر درخواست‌های فنی">سایر درخواست‌های فنی</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  شرح درخواست / توضیحات اولیه
                </label>
                <textarea
                  rows={3}
                  placeholder="توضیحات مختصر در خصوص نیازمندی‌های پروژه یا سازمان..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-sm border border-slate-300 text-sm focus:outline-none focus:border-[#0062BD]"
                  id="contact-message-textarea"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-400">پاسخگویی دبیرخانه: کمتر از ۲۴ ساعت</span>
                <button
                  type="submit"
                  id="submit-contact-form-btn"
                  className="inline-flex items-center space-x-2 space-x-reverse bg-[#0062BD] hover:bg-[#004e9a] text-white px-6 py-2.5 rounded-sm font-bold text-sm transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4 ml-1" />
                  <span>ارسال پیام</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-2">پیام شما ثبت شد</h3>

            <p className="text-slate-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
              با تشکر از شما جناب/سرکار خانم <strong>{name}</strong>. مدیران ارشد راهکارهای مجموعه ما به زودی از طریق ایمیل <strong>{email}</strong> با شما تماس خواهند گرفت.
            </p>

            <button
              onClick={handleReset}
              className="bg-[#0062BD] hover:bg-[#004e9a] text-white px-8 py-2.5 rounded-sm text-sm font-bold transition-colors cursor-pointer"
            >
              بستن پنجره
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
