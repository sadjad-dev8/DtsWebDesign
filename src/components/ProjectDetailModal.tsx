import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  ZoomIn,
  ArrowLeft,
  ExternalLink,
  Shield,
  Server,
  Layers,
  AlertCircle,
  FileText,
  Lock,
  Building,
  Activity,
  Cpu,
  Eye
} from 'lucide-react';
import { Project } from '../types';
import { ProjectLightbox } from './ProjectLightbox';
import { useBodyScrollLock } from '../utils/scrollLock';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenRFP?: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onOpenRFP
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  // Lock body scroll while modal is active
  useBodyScrollLock(Boolean(project));

  // Dismiss modal on Escape key press when nested lightbox is not open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLightboxOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, onClose]);

  if (!project) return null;

  // Combine hero image and gallery images into a complete viewable set
  const allImages = [
    ...(project.imagePath ? [project.imagePath] : []),
    ...(project.galleryImages || [])
  ];

  const handleOpenImage = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const caseStudy = project.caseStudy;

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 sm:p-6 animate-in fade-in duration-200 font-vazir"
      >
        <div className="bg-white rounded-sm max-w-4xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl max-h-[92vh] overflow-y-auto relative text-right">
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="بستن پنجره گزارش تفصیلی پروژه"
            className="absolute top-5 left-5 p-2 text-slate-400 hover:text-slate-700 rounded-sm hover:bg-slate-100 z-10 cursor-pointer transition-colors"
            id="close-project-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>

          {/* 1. Project Hero Banner */}
          <div className="relative h-64 sm:h-80 rounded-sm overflow-hidden mb-8 bg-slate-900 shadow-sm border border-slate-200">
            <img
              src={project.imagePath}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover cursor-pointer hover:scale-102 transition-transform duration-500"
              onClick={() => handleOpenImage(0)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent pointer-events-none" />
            
            <div className="absolute bottom-5 right-6 left-6 pointer-events-none">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-0.5 rounded-sm bg-[#0062BD] text-white text-xs font-bold shadow-xs">
                  {project.category}
                </span>
                {caseStudy?.accessModel && (
                  <span className="px-3 py-0.5 rounded-sm bg-slate-800/90 text-slate-200 border border-slate-700 text-xs font-bold backdrop-blur-xs">
                    {caseStudy.accessModel.label}
                  </span>
                )}
                <span className="px-3 py-0.5 rounded-sm bg-emerald-700 text-white text-xs font-bold">
                  {project.status}
                </span>
              </div>
              <h3 id="project-modal-title" className="text-2xl sm:text-3xl font-black text-white mb-1.5">
                مطالعه موردی: {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-bold flex items-center space-x-1.5 space-x-reverse">
                <Building className="w-3.5 h-3.5 inline-block text-blue-400 ml-1" />
                <span>حوزه کاربری و کارفرما: {project.clientType}</span>
              </p>
            </div>

            <button
              onClick={() => handleOpenImage(0)}
              className="absolute top-4 left-4 bg-slate-900/80 hover:bg-slate-900 text-white px-3 py-1.5 rounded-sm text-xs font-bold flex items-center space-x-1.5 space-x-reverse backdrop-blur-xs border border-slate-700 cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5 ml-1" />
              <span>بزرگ‌نمایی تصویر</span>
            </button>
          </div>

          <div className="space-y-8">
            {/* 2. EXECUTIVE SUMMARY (خلاصه اجرایی و ضرورت پروژه) */}
            {caseStudy?.executiveSummary ? (
              <div className="p-5 sm:p-6 bg-slate-50 rounded-sm border border-slate-200">
                <div className="flex items-center space-x-2 space-x-reverse mb-4 pb-2 border-b border-slate-200">
                  <FileText className="w-5 h-5 text-[#0062BD]" />
                  <h4 className="text-base font-black text-slate-900">خلاصه اجرایی پروژه (Executive Summary)</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3.5 bg-white rounded-sm border border-slate-200/80">
                    <span className="text-xs font-bold text-[#0062BD] block mb-1">مسئله و ضرورت راهبردی</span>
                    <p className="text-slate-700 leading-relaxed font-normal">{caseStudy.executiveSummary.problemStatement}</p>
                  </div>
                  <div className="p-3.5 bg-white rounded-sm border border-slate-200/80">
                    <span className="text-xs font-bold text-[#0062BD] block mb-1">هدف و راه‌حل ارائه‌شده</span>
                    <p className="text-slate-700 leading-relaxed font-normal">{caseStudy.executiveSummary.systemObjective}</p>
                  </div>
                  <div className="p-3.5 bg-white rounded-sm border border-slate-200/80">
                    <span className="text-xs font-bold text-[#0062BD] block mb-1">سازمان‌ها و بهره‌برداران هدف</span>
                    <p className="text-slate-700 leading-relaxed font-normal">{caseStudy.executiveSummary.targetInstitutions}</p>
                  </div>
                  <div className="p-3.5 bg-white rounded-sm border border-slate-200/80">
                    <span className="text-xs font-bold text-[#0062BD] block mb-1">مقیاس و معماری استقرار</span>
                    <p className="text-slate-700 leading-relaxed font-normal">{caseStudy.executiveSummary.deploymentScale}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2.5 border-r-3 border-[#0062BD] pr-3">
                  شرح کامل پروژه
                </h4>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                  {project.fullDescription}
                </p>
              </div>
            )}

            {/* 3. CHALLENGES & STRATEGIC NEEDS */}
            {caseStudy?.challengeAndNeed && caseStudy.challengeAndNeed.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3 border-r-3 border-amber-500 pr-3 flex items-center space-x-1.5 space-x-reverse">
                  <AlertCircle className="w-4 h-4 text-amber-600 ml-1" />
                  <span>چالش‌ها و الزامات عملیاتی پیش از استقرار</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {caseStudy.challengeAndNeed.map((challenge, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-sm bg-amber-50/50 border border-amber-200/60 text-xs sm:text-sm text-slate-800 leading-relaxed flex items-start space-x-2 space-x-reverse"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2 ml-1" />
                      <span>{challenge}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. ENGINEERING SOLUTION */}
            {caseStudy?.engineeringSolution && caseStudy.engineeringSolution.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3 border-r-3 border-[#0062BD] pr-3 flex items-center space-x-1.5 space-x-reverse">
                  <Cpu className="w-4 h-4 text-[#0062BD] ml-1" />
                  <span>راهکار مهندسی و مشخصات پیاده‌سازی</span>
                </h4>
                <div className="space-y-2.5">
                  {caseStudy.engineeringSolution.map((sol, idx) => (
                    <div
                      key={idx}
                      className="flex items-start space-x-3 space-x-reverse p-3.5 rounded-sm bg-blue-50/50 border border-blue-100"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0062BD] shrink-0 mt-0.5 ml-1" />
                      <span className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">{sol}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. SYSTEM ARCHITECTURE, INFRASTRUCTURE & SECURITY */}
            {caseStudy?.systemArchitecture ? (
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3 border-r-3 border-[#0062BD] pr-3 flex items-center space-x-1.5 space-x-reverse">
                  <Layers className="w-4 h-4 text-[#0062BD] ml-1" />
                  <span>معماری سامانه، زیرساخت و امنیت</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Layers */}
                  <div className="p-4 rounded-sm bg-slate-50 border border-slate-200">
                    <span className="text-xs font-black text-slate-900 block mb-2 pb-1 border-b border-slate-200">
                      لایه‌ها و ماژول‌ها
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {caseStudy.systemArchitecture.layers.map((l, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0062BD] shrink-0 mt-1.5 ml-1.5" />
                          <span>{l}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Infrastructure */}
                  <div className="p-4 rounded-sm bg-slate-50 border border-slate-200">
                    <span className="text-xs font-black text-slate-900 block mb-2 pb-1 border-b border-slate-200">
                      زیرساخت و پایگاه داده
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {caseStudy.systemArchitecture.infrastructure.map((inf, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0 mt-1.5 ml-1.5" />
                          <span>{inf}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Security Highlights */}
                  <div className="p-4 rounded-sm bg-slate-50 border border-slate-200">
                    <span className="text-xs font-black text-slate-900 block mb-2 pb-1 border-b border-slate-200">
                      امنیت و قابلیت اطمینان
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {caseStudy.systemArchitecture.securityHighlights.map((sec, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5 ml-1.5" />
                          <span>{sec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3 border-r-3 border-[#0062BD] pr-3">
                  شناسنامه و ویژگی‌های معماری
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.architectureHighlights.map((arch, idx) => (
                    <div key={idx} className="p-3.5 rounded-sm bg-slate-50 border border-slate-200/80">
                      <p className="text-xs font-bold text-slate-800 leading-relaxed">{arch}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. VERIFIED OUTCOMES & ACHIEVEMENTS */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-3 border-r-3 border-emerald-600 pr-3 flex items-center space-x-1.5 space-x-reverse">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-1" />
                <span>دستاوردها و شاخص‌های عملیاتی مستند</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(caseStudy?.verifiedOutcomes || project.keyImpact).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-3 space-x-reverse p-3.5 rounded-sm bg-emerald-50/50 border border-emerald-100"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 ml-1" />
                    <span className="text-xs sm:text-sm text-slate-900 font-bold leading-normal">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. AUTHENTIC SCREENSHOTS & GALLERY */}
            {project.galleryImages && project.galleryImages.length > 0 && (
              <div className="p-5 bg-slate-50/80 rounded-sm border border-slate-200/80">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-2.5 h-2.5 bg-[#0062BD] rounded-full" />
                    <h4 className="text-base font-black text-slate-900">اسکرین‌شات‌های واقعی سامانه</h4>
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    {project.galleryImages.length} تصویر مستند از محیط کاربری
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {project.galleryImages.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleOpenImage(idx + 1)}
                      className="group relative h-36 rounded-sm border border-slate-200 bg-white overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer"
                    >
                      <img
                        src={imgUrl}
                        alt={`${project.title} screenshot ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors duration-300 flex items-center justify-center">
                        <div className="p-2 rounded-full bg-white/90 text-slate-900 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                          <ZoomIn className="w-4 h-4 text-[#0062BD]" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. TECHNOLOGIES */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-3 border-r-3 border-[#0062BD] pr-3">
                پشته فناوری و ابزارهای توسعه (Tech Stack)
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techTags.map((tag, idx) => (
                  <span
                    key={idx}
                    dir="ltr"
                    className="px-3.5 py-1 bg-slate-100 text-slate-800 text-xs font-bold rounded-sm border border-slate-200 font-sans"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 9. ACCESS MODEL & ENTERPRISE NOTICE */}
            {caseStudy?.accessModel && (
              <div className="p-4 rounded-sm bg-blue-50/70 border border-blue-100 flex items-start space-x-3 space-x-reverse">
                <Shield className="w-5 h-5 text-[#0062BD] shrink-0 mt-0.5 ml-2" />
                <div className="text-xs leading-relaxed text-slate-800">
                  <strong className="block text-slate-900 mb-1 font-bold">
                    مدل دسترسی و استقرار: {caseStudy.accessModel.label}
                  </strong>
                  <p className="mb-1">{caseStudy.accessModel.description}</p>
                  <p className="text-slate-600 font-medium">{caseStudy.accessModel.consultationNote}</p>
                </div>
              </div>
            )}
          </div>

          {/* Modal Bottom Actions */}
          <div className="mt-8 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-600 font-bold">
              وضعیت توسعه و استقرار: <strong className="text-slate-900 font-sans">{project.status}</strong>
            </span>
            <div className="flex items-center space-x-3 space-x-reverse">
              {caseStudy?.accessModel?.type === 'public_web' && project.projectUrl && project.projectUrl !== '#' ? (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0062BD] hover:bg-[#004e9a] text-white px-5 py-2.5 rounded-sm text-xs font-bold transition-colors cursor-pointer flex items-center space-x-1.5 space-x-reverse"
                >
                  <span>مشاهده نسخه آنلاین</span>
                  <ExternalLink className="w-3.5 h-3.5 mr-1" />
                </a>
              ) : null}

              {onOpenRFP && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenRFP();
                  }}
                  className="bg-[#0062BD] hover:bg-[#004e9a] text-white px-5 py-2.5 rounded-sm text-xs font-bold transition-colors cursor-pointer flex items-center space-x-1.5 space-x-reverse"
                >
                  <span>درخواست جلسه دمو و ارزیابی فنی</span>
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                </button>
              )}

              <button
                onClick={onClose}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-2.5 rounded-sm text-xs font-bold transition-colors cursor-pointer"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Component */}
      <ProjectLightbox
        isOpen={isLightboxOpen}
        images={allImages}
        initialIndex={lightboxIndex}
        projectTitle={project.title}
        onClose={() => setIsLightboxOpen(false)}
      />
    </>
  );
};
