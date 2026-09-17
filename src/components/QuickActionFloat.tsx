import React, { useState, useEffect } from 'react';
import { Phone, ArrowUp, Sparkles, Volume2 } from 'lucide-react';
import { AGENCY_INFO } from '../data/marketingData';
import { ButterCatSoundEffect } from '../utils/catSound';
import { ThemeToggle } from './ThemeToggle';

interface QuickActionFloatProps {
  onOpenModal: () => void;
}

export const QuickActionFloat: React.FC<QuickActionFloatProps> = ({ onOpenModal }) => {
  const [showTop, setShowTop] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCatIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    ButterCatSoundEffect.playMeow(1.15);
    setHasInteracted(true);
  };

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5">
      {/* Floating Controls: Theme Switcher & Scroll to Top */}
      <div className="flex items-center gap-2">
        <ThemeToggle variant="compact" className="w-10 h-10 rounded-full shadow-lg" />
        {showTop && (
          <button
            onClick={scrollToTop}
            aria-label="페이지 맨 위로"
            className="w-10 h-10 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Floating Free Diagnosis & Estimate CTA Button with interactive Buttercat mascot */}
      <button
        onClick={onOpenModal}
        className="group relative flex items-center gap-2.5 pl-2 pr-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        <div
          onClick={handleCatIconClick}
          title="클릭 시 야옹!"
          className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-amber-50 border-2 border-amber-300 shadow-sm shrink-0 hover:rotate-6 transition-transform"
        >
          <img
            src="/images/buttercat_logo.jpg"
            alt="버터캣"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <span className="absolute -bottom-0.5 -right-0.5 text-[10px]">💧</span>
        </div>
        <div className="flex flex-col text-left">
          <span className="tracking-tight">버터캣 1:1 무료 진단</span>
          <span className="text-[10px] text-amber-200 font-semibold flex items-center gap-1">
            <span>🐾 눈물 뚝 솔루션</span>
          </span>
        </div>
      </button>

      {/* Direct Phone / Kakao Quick Bar on Mobile & Desktop */}
      <div className="flex items-center gap-2">
        <a
          href={`tel:${AGENCY_INFO.hotline}`}
          className="w-11 h-11 rounded-full bg-white hover:bg-blue-50 text-blue-600 border border-slate-200 shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer"
          title={`전화 상담: ${AGENCY_INFO.hotline}`}
        >
          <Phone className="w-5 h-5" />
        </a>

        <a
          href={AGENCY_INFO.kakaoOpenChatUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full bg-[#FEE500] hover:bg-[#edd400] text-[#3C1E1E] shadow-md flex items-center justify-center transition-all duration-200 font-black text-xs cursor-pointer hover:scale-105 active:scale-95"
          title="카카오톡 오픈채팅 실시간 1:1 상담 바로가기"
        >
          <span className="font-black text-[13px]">TALK</span>
        </a>
      </div>
    </div>
  );
};
