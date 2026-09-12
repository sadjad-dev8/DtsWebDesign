import React, { useEffect, useState } from 'react';
import { X, ChevronRight, ChevronLeft, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { useBodyScrollLock } from '../utils/scrollLock';

interface ProjectLightboxProps {
  isOpen: boolean;
  images: string[];
  initialIndex: number;
  projectTitle: string;
  onClose: () => void;
}

export const ProjectLightbox: React.FC<ProjectLightboxProps> = ({
  isOpen,
  images,
  initialIndex,
  projectTitle,
  onClose
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  // Lock body scroll while lightbox is open
  useBodyScrollLock(isOpen);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setIsZoomed(false);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length]);

  if (!isOpen || images.length === 0) return null;

  const handleNext = () => {
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="گالری تصاویر پروژه"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 animate-in fade-in duration-200 font-vazir"
    >
      {/* Top Header Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between text-white z-20 bg-gradient-to-b from-slate-950/80 to-transparent">
        <div className="text-right">
          <h3 className="text-sm sm:text-base font-black text-white">{projectTitle}</h3>
          <p className="text-xs text-slate-400 font-bold">
            تصویر <span className="font-sans font-bold text-[#00D2FF]">{currentIndex + 1}</span> از <span className="font-sans font-bold">{images.length}</span>
          </p>
        </div>

        <div className="flex items-center space-x-3 space-x-reverse">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2.5 rounded-sm bg-slate-800/80 text-slate-200 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer border border-slate-700"
            title={isZoomed ? 'کوچک‌نمایی' : 'بزرگ‌نمایی'}
            aria-label={isZoomed ? 'کوچک‌نمایی تصویر' : 'بزرگ‌نمایی تصویر'}
          >
            {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>
          <button
            onClick={onClose}
            className="p-2.5 rounded-sm bg-red-600/80 text-white hover:bg-red-600 transition-colors cursor-pointer"
            id="close-lightbox-btn"
            title="بستن"
            aria-label="بستن گالری تصاویر"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Display */}
      <div className="relative max-w-5xl w-full max-h-[80vh] flex items-center justify-center overflow-hidden my-auto select-none">
        <img
          src={images[currentIndex]}
          alt={`${projectTitle} - image ${currentIndex + 1}`}
          referrerPolicy="no-referrer"
          className={`max-w-full max-h-[75vh] object-contain rounded-sm shadow-2xl transition-all duration-300 ${
            isZoomed ? 'scale-125 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={handleNext}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-800/80 text-white hover:bg-[#0062BD] transition-all cursor-pointer border border-slate-700 shadow-lg z-20 group"
            title="تصویر بعدی"
            aria-label="تصویر بعدی"
            id="lightbox-next-btn"
          >
            <ChevronLeft className="w-6 h-6 transform group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-800/80 text-white hover:bg-[#0062BD] transition-all cursor-pointer border border-slate-700 shadow-lg z-20 group"
            title="تصویر قبلی"
            aria-label="تصویر قبلی"
            id="lightbox-prev-btn"
          >
            <ChevronRight className="w-6 h-6 transform group-hover:translate-x-0.5 transition-transform" />
          </button>
        </>
      )}

      {/* Bottom Thumbnail Strip */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center space-x-2 space-x-reverse px-4 z-20">
          <div className="flex items-center space-x-2 space-x-reverse p-2 bg-slate-900/80 rounded-sm border border-slate-800 backdrop-blur-sm overflow-x-auto max-w-full">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsZoomed(false);
                  setCurrentIndex(idx);
                }}
                className={`relative w-14 h-10 rounded-xs overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                  currentIndex === idx ? 'border-[#00D2FF] scale-105 shadow-md' : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`thumb ${idx}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
