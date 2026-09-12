import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon';
  showSubtext?: boolean;
  lightBackground?: boolean;
  src?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = 'h-8 sm:h-9 md:h-11 lg:h-12',
  showSubtext = false,
  lightBackground = true,
  src = '/src/assets/images/logo.png',
}) => {
  return (
    <div className="inline-flex items-center space-x-3 space-x-reverse select-none">
      <img
        src={src}
        alt="لوگوی شرکت"
        className={`${className} w-auto object-contain max-w-full`}
        onError={(e) => {
          // Fallback if image file is not found yet
          const target = e.currentTarget;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent && !parent.querySelector('.logo-placeholder-text')) {
            const fallback = document.createElement('span');
            fallback.className = 'logo-placeholder-text font-black text-xl tracking-tight text-[#0088FF] font-sans';
            fallback.innerText = 'DTSAI';
            parent.insertBefore(fallback, target);
          }
        }}
      />

      {showSubtext && (
        <div className="flex flex-col text-right pr-1">
          <span className={`text-[10px] font-bold tracking-tight ${lightBackground ? 'text-slate-500' : 'text-slate-400'}`}>
            مجموعه مهندسی زیرساخت‌های کلان و هوش مصنوعی
          </span>
        </div>
      )}
    </div>
  );
};

