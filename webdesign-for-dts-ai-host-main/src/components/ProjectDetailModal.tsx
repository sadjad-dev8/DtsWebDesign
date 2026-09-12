import React, { useState } from 'react';
import { X, CheckCircle2, ZoomIn, ArrowLeft } from 'lucide-react';
import { Project } from '../types';
import { ProjectLightbox } from './ProjectLightbox';

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

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 animate-in fade-in duration-200 font-vazir">
        <div className="bg-white rounded-sm max-w-4xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl max-h-[92vh] overflow-y-auto relative text-right">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 left-5 p-2 text-slate-400 hover:text-slate-700 rounded-sm hover:bg-slate-100 z-10 cursor-pointer transition-colors"
            id="close-project-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>

          {/* 1. Project Hero Image */}
          <div className="relative h-64 sm:h-72 rounded-sm overflow-hidden mb-8 bg-slate-900 shadow-sm border border-slate-200">
            <img
              src={project.imagePath}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover cursor-pointer hover:scale-102 transition-transform duration-500"
              onClick={() => handleOpenImage(0)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
            <div className="absolute bottom-5 right-6 left-6 pointer-events-none">
              <span className="px-3.5 py-1 rounded-sm bg-[#0062BD] text-white text-xs font-bold mb-2 inline-block shadow-xs">
                {project.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-1.5">{project.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 font-bold">{project.clientType}</p>
            </div>
            <button
              onClick={() => handleOpenImage(0)}
              className="absolute top-4 left-4 bg-slate-900/80 hover:bg-slate-900 text-white px-3 py-1.5 rounded-sm text-xs font-bold flex items-center space-x-1.5 space-x-reverse backdrop-blur-xs border border-slate-700 cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>مشاهده تصویر اصلی</span>
            </button>
          </div>

          {/* 2. PROJECT GALLERY SECTION */}
          {project.galleryImages && project.galleryImages.length > 0 && (
            <div className="mb-8 p-5 bg-slate-50/80 rounded-sm border border-slate-200/80">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-2.5 h-2.5 bg-[#0062BD] rounded-full" />
                  <h4 className="text-base font-black text-slate-900">گالری تصاویر پروژه</h4>
                </div>
                <span className="text-xs font-bold text-slate-500">
                  {project.galleryImages.length} تصویر نمونه از محیط سامانه
                </span>
              </div>

              {/* Responsive Image Grid: Desktop 4, Tablet 2, Mobile 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {project.galleryImages.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleOpenImage(idx + 1)} // idx + 1 because hero is index 0
                    className="group relative h-36 rounded-sm border border-slate-200 bg-white overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <img
                      src={imgUrl}
                      alt={`${project.title} gallery image ${idx + 1}`}
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

          {/* 3. FULL DESCRIPTION SECTION */}
          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-2.5 border-r-3 border-[#0062BD] pr-3">
                شرح کامل پروژه
              </h4>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                {project.fullDescription}
              </p>
            </div>

            {/* 4. KEY IMPACT & ACHIEVEMENTS */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-3 border-r-3 border-[#0062BD] pr-3">
                دستاوردها و شاخص‌های کلیدی
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.keyImpact.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-3 space-x-reverse p-3.5 rounded-sm bg-blue-50/70 border border-blue-100"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0062BD] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-900 font-bold leading-normal">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. TECHNOLOGIES */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-3 border-r-3 border-[#0062BD] pr-3">
                پشته فناوری‌های اصلی (Technologies)
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1 bg-slate-100 text-slate-800 text-xs font-bold rounded-sm border border-slate-200 font-sans"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 6. PROJECT INFORMATION & ARCHITECTURE HIGHLIGHTS */}
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
          </div>

          {/* Modal Bottom Actions */}
          <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500 font-bold">
              وضعیت بهره‌برداری: <strong className="text-slate-800 font-sans">{project.status}</strong>
            </span>
            <div className="flex items-center space-x-3 space-x-reverse">
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0062BD] hover:bg-[#004e9a] text-white px-5 py-2.5 rounded-sm text-xs font-bold transition-colors cursor-pointer flex items-center space-x-1.5 space-x-reverse"
              >
                <span>مشاهده پروژه</span>
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              </a>
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
