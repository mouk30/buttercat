import React, { useState, useEffect } from 'react';
import { Phone, ArrowRight, Menu, X, Sparkles, Send, Volume2 } from 'lucide-react';
import { AGENCY_INFO } from '../data/marketingData';
import { ButterCatSoundEffect } from '../utils/catSound';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  onOpenConsultationModal: (defaultService?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultationModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top micro-announcement banner - Vibrant & Fresh */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white text-xs sm:text-sm py-2 px-4 font-medium text-center flex items-center justify-center gap-2 shadow-sm">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold tracking-wide">
          2026 프로모션
        </span>
        <span className="truncate">
          신규 광고주 대상 <strong className="font-extrabold underline decoration-white/60 underline-offset-2">1:1 맞춤 상권 분석 리포트</strong> 무료 제공 이벤트 진행 중!
        </span>
        <button
          onClick={() => onOpenConsultationModal('naver-place')}
          className="hidden md:inline-flex items-center gap-1 text-xs bg-white text-blue-700 font-bold px-2.5 py-0.5 rounded-full hover:bg-blue-50 transition-all ml-2 shadow-sm"
        >
          진단받기 <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Main navigation bar - Bright white glassmorphism */}
      <nav
        className={`px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm py-3'
            : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo with Interactive Meow & Tap Animation */}
          <a
            href="#"
            className="flex items-center gap-3 group py-0.5"
            onClick={(e) => {
              e.preventDefault();
              ButterCatSoundEffect.playMeow(1.1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            title="버터캣 클릭 시 귀여운 야옹 소리가 납니다!"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden bg-gradient-to-b from-amber-50 to-amber-100 border-2 border-amber-400 shadow-md shadow-amber-500/25 group-hover:scale-105 group-hover:rotate-3 active:scale-95 transition-all duration-300 shrink-0 cursor-pointer">
              <img
                src="/images/buttercat_logo.jpg"
                alt="버터캣 로고"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-0.5 -right-0.5 text-xs sm:text-sm select-none drop-shadow-sm group-hover:animate-bounce">💧</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl sm:text-2xl tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
                  버터캣<span className="text-amber-500 font-extrabold text-sm sm:text-base ml-1 tracking-wider">BUTTERCAT</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-300 uppercase">
                  Solution
                </span>
              </div>
              <span className="text-xs text-slate-500 font-bold tracking-tight">
                버터캣 마케팅 솔루션
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => scrollToSection('services-overview')}
              className="px-3 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50/70 rounded-lg transition-colors"
            >
              전체 상품
            </button>
            <button
              onClick={() => scrollToSection('naver-place')}
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              네이버 플레이스
            </button>
            <button
              onClick={() => scrollToSection('naver-blog')}
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              블로그광고
            </button>
            <button
              onClick={() => scrollToSection('instagram')}
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              인스타그램 광고
            </button>
            <button
              onClick={() => scrollToSection('google-youtube')}
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              구글·유튜브
            </button>
            <button
              onClick={() => scrollToSection('website')}
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              가성비 홈페이지
            </button>
            <button
              onClick={() => scrollToSection('calculator')}
              className="px-3 py-2 text-sm font-bold text-blue-700 hover:text-blue-800 bg-blue-50/90 hover:bg-blue-100/80 border border-blue-200/80 rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              맞춤 전략 진단
            </button>
            <button
              onClick={() => scrollToSection('case-studies')}
              className="px-3 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50/70 rounded-lg transition-colors"
            >
              성공사례
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="px-3 py-2 text-sm font-bold text-amber-800 hover:text-amber-900 hover:bg-amber-50 rounded-lg transition-colors flex items-center gap-1"
            >
              <span>✨</span>
              고객 후기
            </button>
            <button
              onClick={() => scrollToSection('metrics-dashboard')}
              className="px-3 py-2 text-sm font-bold text-slate-700 hover:text-blue-700 hover:bg-blue-50/70 rounded-lg transition-colors flex items-center gap-1"
            >
              <span>📊</span>
              성과 지표
            </button>
            <button
              onClick={() => scrollToSection('brand-story')}
              className="px-3 py-2 text-sm font-bold text-amber-700 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition-colors flex items-center gap-1"
            >
              <span>💧</span>
              브랜드 스토리
            </button>
          </div>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Bright / Soft Dark Theme Switcher */}
            <ThemeToggle variant="button" />

            <a
              href={AGENCY_INFO.kakaoOpenChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs lg:text-sm font-black text-[#3C1E1E] bg-[#FEE500] hover:bg-[#edd400] transition-all px-3 py-2 rounded-xl shadow-xs hover:shadow-md hover:scale-105 active:scale-95"
              title="카카오톡 오픈채팅 실시간 1:1 상담"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>카톡 오픈채팅</span>
            </a>
            <a
              href={`tel:${AGENCY_INFO.hotline}`}
              className="flex items-center gap-1.5 text-xs lg:text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-xl bg-slate-100/90 hover:bg-slate-200/70 border border-slate-200/80"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>{AGENCY_INFO.hotline}</span>
            </a>
            <button
              onClick={() => onOpenConsultationModal()}
              className="relative inline-flex items-center justify-center text-xs lg:text-sm font-bold text-white rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 transition-all duration-300 px-4 py-2.5 active:scale-95 cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" />
                <span>무료 진단</span>
              </span>
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex sm:hidden items-center gap-1.5">
            {/* Mobile compact theme switcher */}
            <ThemeToggle variant="compact" />

            <a
              href={AGENCY_INFO.kakaoOpenChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 text-xs font-black text-[#3C1E1E] bg-[#FEE500] hover:bg-[#edd400] rounded-lg shadow-2xs flex items-center gap-1"
            >
              <span>카톡</span>
            </a>
            <button
              onClick={() => onOpenConsultationModal()}
              className="px-2.5 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-lg shadow-2xs"
            >
              상담신청
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-lg"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 bg-white rounded-2xl p-4 shadow-xl space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
            {/* Theme switcher row inside mobile menu */}
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between mb-2">
              <div className="flex flex-col text-left">
                <span className="text-xs font-extrabold text-slate-900">화면 테마 설정</span>
                <span className="text-[10px] text-slate-500 font-medium">심야 열람 시 눈부심 방지</span>
              </div>
              <ThemeToggle variant="segmented" />
            </div>

            <p className="text-xs font-bold text-slate-500 px-3 uppercase tracking-wider">
              운영 광고 취급 상품
            </p>
            <button
              onClick={() => scrollToSection('naver-place')}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                네이버 플레이스
              </span>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                지도 상위노출
              </span>
            </button>
            <button
              onClick={() => scrollToSection('naver-blog')}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-green-50 hover:text-green-700 flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                네이버 블로그광고
              </span>
              <span className="text-xs font-medium text-green-600 bg-green-100/70 px-2 py-0.5 rounded-full">
                체험단 & 바이럴
              </span>
            </button>
            <button
              onClick={() => scrollToSection('instagram')}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-rose-50 hover:text-rose-700 flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                인스타그램 광고
              </span>
              <span className="text-xs font-medium text-rose-600 bg-rose-100/70 px-2 py-0.5 rounded-full">
                릴스 숏폼 & 타겟
              </span>
            </button>
            <button
              onClick={() => scrollToSection('google-youtube')}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-red-50 hover:text-red-700 flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                구글·유튜브 광고
              </span>
              <span className="text-xs font-medium text-red-600 bg-red-100/70 px-2 py-0.5 rounded-full">
                검색 & 영상 광고
              </span>
            </button>
            <button
              onClick={() => scrollToSection('website')}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                가성비 홈페이지제작
              </span>
              <span className="text-xs font-medium text-indigo-600 bg-indigo-100/70 px-2 py-0.5 rounded-full">
                모바일 반응형
              </span>
            </button>

            <div className="pt-3 mt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
              <button
                onClick={() => scrollToSection('calculator')}
                className="py-2.5 px-2 rounded-xl bg-blue-50 text-blue-800 font-bold text-xs flex items-center justify-center gap-1 border border-blue-200"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>맞춤 진단</span>
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="py-2.5 px-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 font-extrabold text-xs flex items-center justify-center gap-1"
              >
                <span>✨ 고객 후기</span>
              </button>
              <button
                onClick={() => scrollToSection('metrics-dashboard')}
                className="py-2.5 px-2 rounded-xl bg-indigo-50 text-indigo-900 border border-indigo-200 font-extrabold text-xs flex items-center justify-center gap-1"
              >
                <span>📊 성과 지표</span>
              </button>
              <button
                onClick={() => scrollToSection('brand-story')}
                className="py-2.5 px-2 rounded-xl bg-slate-100 text-slate-800 font-extrabold text-xs flex items-center justify-center gap-1"
              >
                <span>💧 스토리</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
