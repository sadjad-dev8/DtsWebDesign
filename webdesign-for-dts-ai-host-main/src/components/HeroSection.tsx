import React, { useEffect, useRef } from 'react';
import { ArrowLeft, Server, Cpu, Globe, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onContactTeam: () => void;
  onStartProject: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProjects,
  onContactTeam,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Canvas animation for abstract enterprise network topology
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create interconnected network nodes
    const nodeCount = Math.min(Math.floor(width / 32), 40);
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      pulse: number;
      pulseSpeed: number;
      isHub?: boolean;
    }> = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: i % 7 === 0 ? 4 : 2,
        pulse: Math.random() * Math.PI,
        pulseSpeed: 0.02 + Math.random() * 0.02,
        isHub: i % 7 === 0
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle grid lines in background
      ctx.strokeStyle = 'rgba(0, 98, 189, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update and draw nodes & connection lines
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += node.pulseSpeed;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = node.x - nodeB.x;
          const dy = node.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.25;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nodeB.x, nodeB.y);

            if (node.isHub || nodeB.isHub) {
              ctx.strokeStyle = `rgba(0, 210, 255, ${alpha * 1.5})`;
              ctx.lineWidth = 1.2;
            } else {
              ctx.strokeStyle = `rgba(0, 98, 189, ${alpha})`;
              ctx.lineWidth = 0.8;
            }
            ctx.stroke();
          }
        }

        // Draw node points
        ctx.beginPath();
        const currentRadius = node.radius + Math.sin(node.pulse) * 0.8;
        ctx.arc(node.x, node.y, Math.max(1, currentRadius), 0, Math.PI * 2);

        if (node.isHub) {
          ctx.fillStyle = '#00D2FF';
          ctx.shadowColor = 'rgba(0, 210, 255, 0.6)';
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = '#0062BD';
          ctx.shadowColor = 'rgba(0, 98, 189, 0.3)';
          ctx.shadowBlur = 4;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white border-b border-slate-100 font-vazir">
      {/* Background Abstract Topology Canvas */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Decorative gradient blur highlights */}
      <div className="absolute top-1/4 right-1/2 translate-x-1/2 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center px-3.5 py-1.5 bg-blue-50 text-[#0062BD] text-xs font-bold border-r-3 border-[#0062BD] mb-6 shadow-2xs">
            <span>توسعه نرم‌افزارها و زیرساخت‌های کلان کشور</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.2] mb-6 font-vazir">
            توسعه زیرساخت‌های نرم‌افزاری مطمئن <br className="hidden sm:inline" />
            برای <span className="text-[#0062BD]">آینده دیجیتال</span> کشور
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-10 font-normal">
            ما معماری، پیاده‌سازی و پشتیبانی سامانه‌های کلیدی سازمانی، پلتفرم‌های هوش مصنوعی و زیرساخت‌های ابری شرکتی را برای سازمان‌ها و نهادهای ملی با پایداری بی‌وقفه عهده‌دار هستیم.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={onExploreProjects}
              id="hero-explore-projects-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 space-x-reverse bg-[#0062BD] hover:bg-[#004e9a] text-white px-8 py-4 rounded-sm font-bold text-base transition-colors shadow-sm cursor-pointer"
            >
              <span>مشاهده پروژه‌های ملی</span>
              <ArrowLeft className="w-5 h-5 mr-1" />
            </button>

            <button
              onClick={onContactTeam}
              id="hero-contact-team-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 px-8 py-4 rounded-sm font-bold text-base transition-colors cursor-pointer"
            >
              <span>درخواست مشاوره و تماس</span>
            </button>
          </div>

          {/* Trust Highlights Bar */}
          <div className="pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-right max-w-4xl mx-auto">
            <div className="flex items-start space-x-3 space-x-reverse p-3.5 rounded-sm bg-slate-50 border border-slate-200/80">
              <CheckCircle2 className="w-5 h-5 text-[#0062BD] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">ISO 27001 & پدافند</h4>
                <p className="text-xs text-slate-500 mt-0.5">امنیت سازمانی و شرکتی</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 space-x-reverse p-3.5 rounded-sm bg-slate-50 border border-slate-200/80">
              <Server className="w-5 h-5 text-[#0062BD] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">ابر اختصاصی Zero-Trust</h4>
                <p className="text-xs text-slate-500 mt-0.5">شبکه‌های ایزوله (Air-Gap)</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 space-x-reverse p-3.5 rounded-sm bg-slate-50 border border-slate-200/80">
              <Cpu className="w-5 h-5 text-[#0062BD] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">پایداری ۹۹٫۹۹۹٪</h4>
                <p className="text-xs text-slate-500 mt-0.5">سطح سرویس حیاتی SLA</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 space-x-reverse p-3.5 rounded-sm bg-slate-50 border border-slate-200/80">
              <Globe className="w-5 h-5 text-[#0062BD] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">۱۰۰+ سامانه ملی</h4>
                <p className="text-xs text-slate-500 mt-0.5">استقرار در سطح کشوری</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
