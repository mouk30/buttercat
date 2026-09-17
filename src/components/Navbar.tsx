import React, { useState, useEffect } from 'react';
import { Phone, ArrowRight, Menu, X, Sparkles, Send, ChevronDown, Check } from 'lucide-react';
import { AGENCY_INFO } from '../data/marketingData';
import { ButterCatSoundEffect } from '../utils/catSound';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  onOpenConsultationModal: (defaultService?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultationModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
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
      {/* Top micro-announcement banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4 font-medium text-center flex items-center justify-center gap-2 shadow-sm">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] sm:text-[11px] font-bold tracking-wide shrink-0">
          2026 프로모션
        </span>
        <span className="truncate text-xs sm:text-sm">
          <span className="hidden sm:inline">신규 광고주 대상 </span>
          <strong className="font-extrabold underline decoration-white/60 underline-offset-2">1:1 맞춤 상권 분석 리포트</strong> 무료 제공!
        </span>
        <button
          onClick={() => onOpenConsultationModal('naver-place')}
          className="hidden md:inline-flex items-center gap-1 text-xs bg-white text-blue-700 font-bold px-2.5 py-0.5 rounded-full hover:bg-blue-50 transition-all ml-2 shadow-sm shrink-0 cursor-pointer"
        >
          진단받기 <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Main navigation bar */}
      <nav
        className={`px-3 sm:px-6 lg:px-8 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 shadow-sm py-2.5 sm:py-3'
            : 'bg-white/85 dark:bg-slate-900/85 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800/80 py-2.5 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo with Interactive Meow & Tap Animation */}
          <a
            href="#"
            className="flex items-center gap-2 sm:gap-3 group py-0.5 shrink-0"
            onClick={(e) => {
              e.preventDefault();
              ButterCatSoundEffect.playMeow(1.1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            title="버터캣 클릭 시 귀여운 야옹 소리가 납니다!"
          >
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-b from-amber-50 to-amber-100 dark:from-slate-800 dark:to-slate-750 border-2 border-amber-400 dark:border-amber-500 shadow-md shadow-amber-500/20 group-hover:scale-105 group-hover:rotate-3 active:scale-95 transition-all duration-300 shrink-0 cursor-pointer">
              <img
                src="/images/buttercat_logo.jpg"
                alt="버터캣 로고"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-0.5 -right-0.5 text-[11px] sm:text-xs select-none drop-shadow-sm group-hover:animate-bounce">💧</span>
            </div>
            <div className="flex flex-col text-left shrink-0">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="font-black text-lg sm:text-xl xl:text-2xl tracking-tight text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors whitespace-nowrap">
                  버터캣
                </span>
                <span className="text-amber-500 font-extrabold text-xs sm:text-sm tracking-wider whitespace-nowrap">
                  BUTTERCAT
                </span>
                <span className="hidden md:inline-block px-1.5 py-0.2 rounded text-[10px] font-black bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 uppercase whitespace-nowrap">
                  Solution
                </span>
              </div>
              <span className="hidden sm:block text-[11px] text-slate-500 dark:text-slate-400 font-bold tracking-tight whitespace-nowrap">
                버터캣 마케팅 솔루션
              </span>
            </div>
          </a>

          {/* Desktop Nav Items - Clean, Well-spaced, Never wrapping */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 shrink-0">
            {/* Services Dropdown Menu */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => scrollToSection('services-overview')}
                className="px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/70 dark:hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>광고 상품</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
              </button>

              {/* Services Dropdown Popover */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 pt-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="w-64 bg-white dark:bg-slate-850 rounded-2xl p-2 shadow-2xl border border-slate-200/90 dark:border-slate-700 flex flex-col gap-1">
                    <button
                      onClick={() => { scrollToSection('naver-place'); setServicesDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-750 hover:text-emerald-700 dark:hover:text-emerald-400 flex items-center justify-between transition-colors group cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                        <span className="whitespace-nowrap">네이버 플레이스</span>
                      </span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-100/70 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded whitespace-nowrap">지도 1위</span>
                    </button>

                    <button
                      onClick={() => { scrollToSection('naver-blog'); setServicesDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-green-50 dark:hover:bg-slate-750 hover:text-green-700 dark:hover:text-green-400 flex items-center justify-between transition-colors group cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 shrink-0"></span>
                        <span className="whitespace-nowrap">네이버 블로그광고</span>
                      </span>
                      <span className="text-[10px] text-green-600 dark:text-green-400 font-semibold bg-green-100/70 dark:bg-green-950/60 px-1.5 py-0.5 rounded whitespace-nowrap">체험단</span>
                    </button>

                    <button
                      onClick={() => { scrollToSection('instagram'); setServicesDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-slate-750 hover:text-rose-700 dark:hover:text-rose-400 flex items-center justify-between transition-colors group cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                        <span className="whitespace-nowrap">인스타그램 광고</span>
                      </span>
                      <span className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold bg-rose-100/70 dark:bg-rose-950/60 px-1.5 py-0.5 rounded whitespace-nowrap">릴스·타겟</span>
                    </button>

                    <button
                      onClick={() => { scrollToSection('google-youtube'); setServicesDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-slate-750 hover:text-red-700 dark:hover:text-red-400 flex items-center justify-between transition-colors group cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
                        <span className="whitespace-nowrap">구글·유튜브 광고</span>
                      </span>
                      <span className="text-[10px] text-red-600 dark:text-red-400 font-semibold bg-red-100/70 dark:bg-red-950/60 px-1.5 py-0.5 rounded whitespace-nowrap">영상검색</span>
                    </button>

                    <button
                      onClick={() => { scrollToSection('website'); setServicesDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-750 hover:text-indigo-700 dark:hover:text-indigo-400 flex items-center justify-between transition-colors group cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0"></span>
                        <span className="whitespace-nowrap">가성비 홈페이지</span>
                      </span>
                      <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-100/70 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded whitespace-nowrap">반응형</span>
                    </button>

                    <div className="pt-1.5 mt-1 border-t border-slate-100 dark:border-slate-750">
                      <button
                        onClick={() => { scrollToSection('services-overview'); setServicesDropdownOpen(false); }}
                        className="w-full text-center py-1.5 text-[11px] font-extrabold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50/70 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      >
                        전체 상품 비교 한눈에 보기 →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection('calculator')}
              className="px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-bold text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 bg-blue-50/90 dark:bg-blue-950/40 hover:bg-blue-100/80 dark:hover:bg-blue-900/60 border border-blue-200/80 dark:border-blue-800/80 rounded-xl transition-colors flex items-center gap-1 shadow-2xs whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>맞춤 진단</span>
            </button>

            <button
              onClick={() => scrollToSection('case-studies')}
              className="px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/70 dark:hover:bg-slate-800 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              성공사례
            </button>

            <button
              onClick={() => scrollToSection('testimonials')}
              className="px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-bold text-amber-800 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-200 hover:bg-amber-50 dark:hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>✨</span>
              <span>고객 후기</span>
            </button>

            <button
              onClick={() => scrollToSection('metrics-dashboard')}
              className="px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50/70 dark:hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>📊</span>
              <span>성과 지표</span>
            </button>

            <button
              onClick={() => scrollToSection('brand-story')}
              className="px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-bold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>💧</span>
              <span>스토리</span>
            </button>
          </div>

          {/* Right Action buttons - Desktop */}
          <div className="hidden sm:flex items-center gap-2 xl:gap-2.5 shrink-0">
            {/* Bright / Soft Dark Theme Switcher */}
            <ThemeToggle variant="button" />

            <a
              href={AGENCY_INFO.kakaoOpenChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs xl:text-sm font-black text-[#3C1E1E] bg-[#FEE500] hover:bg-[#edd400] transition-all px-2.5 xl:px-3.5 py-2 rounded-xl shadow-xs hover:shadow-md hover:scale-105 active:scale-95 whitespace-nowrap shrink-0"
              title="카카오톡 오픈채팅 실시간 1:1 상담"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0"></span>
              <span className="whitespace-nowrap">카톡 오픈채팅</span>
            </a>

            {/* Direct hotline telephone (available on wide screens) */}
            <a
              href={`tel:${AGENCY_INFO.hotline}`}
              className="hidden 2xl:flex items-center gap-1.5 text-xs xl:text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-3 py-2 rounded-xl bg-slate-100/90 dark:bg-slate-800 hover:bg-slate-200/70 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span className="whitespace-nowrap">{AGENCY_INFO.hotline}</span>
            </a>

            <button
              onClick={() => onOpenConsultationModal()}
              className="relative inline-flex items-center justify-center text-xs xl:text-sm font-bold text-white rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 transition-all duration-300 px-3.5 xl:px-4 py-2 active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <Send className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">무료 진단</span>
              </span>
            </button>
          </div>

          {/* Mobile Actions: Clean, compact, never overflows */}
          <div className="flex sm:hidden items-center gap-1.5 shrink-0">
            {/* Compact theme toggle */}
            <ThemeToggle variant="compact" />

            {/* Quick consultation CTA */}
            <button
              onClick={() => onOpenConsultationModal()}
              className="px-2.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
            >
              상담신청
            </button>

            {/* Mobile hamburger menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-700 dark:text-slate-200 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg shrink-0 cursor-pointer"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-xl space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
            {/* Theme switcher row inside mobile menu */}
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between mb-2">
              <div className="flex flex-col text-left">
                <span className="text-xs font-extrabold text-slate-900 dark:text-white">화면 테마 설정</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">심야 열람 시 눈부심 방지</span>
              </div>
              <ThemeToggle variant="segmented" />
            </div>

            {/* Quick action buttons row in mobile menu */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <a
                href={AGENCY_INFO.kakaoOpenChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-[#FEE500] hover:bg-[#edd400] text-[#3C1E1E] font-black text-xs flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>카톡 1:1 상담</span>
              </a>
              <a
                href={`tel:${AGENCY_INFO.hotline}`}
                className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>전화 상담</span>
              </a>
            </div>

            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 px-2 uppercase tracking-wider">
              운영 광고 취급 상품
            </p>
            <button
              onClick={() => scrollToSection('naver-place')}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-emerald-400 flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                <span>네이버 플레이스</span>
              </span>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                지도 상위노출
              </span>
            </button>
            <button
              onClick={() => scrollToSection('naver-blog')}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-green-50 dark:hover:bg-slate-800 hover:text-green-700 dark:hover:text-green-400 flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0"></span>
                <span>네이버 블로그광고</span>
              </span>
              <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100/70 dark:bg-green-950/60 px-2 py-0.5 rounded-full">
                체험단 & 바이럴
              </span>
            </button>
            <button
              onClick={() => scrollToSection('instagram')}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-slate-800 hover:text-rose-700 dark:hover:text-rose-400 flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0"></span>
                <span>인스타그램 광고</span>
              </span>
              <span className="text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-100/70 dark:bg-rose-950/60 px-2 py-0.5 rounded-full">
                릴스 숏폼 & 타겟
              </span>
            </button>
            <button
              onClick={() => scrollToSection('google-youtube')}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-slate-800 hover:text-red-700 dark:hover:text-red-400 flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0"></span>
                <span>구글·유튜브 광고</span>
              </span>
              <span className="text-xs font-medium text-red-600 dark:text-red-400 bg-red-100/70 dark:bg-red-950/60 px-2 py-0.5 rounded-full">
                검색 & 영상 광고
              </span>
            </button>
            <button
              onClick={() => scrollToSection('website')}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-800 hover:text-indigo-700 dark:hover:text-indigo-400 flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0"></span>
                <span>가성비 홈페이지제작</span>
              </span>
              <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-100/70 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full">
                모바일 반응형
              </span>
            </button>

            <div className="pt-3 mt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2">
              <button
                onClick={() => scrollToSection('calculator')}
                className="py-2.5 px-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 font-bold text-xs flex items-center justify-center gap-1 border border-blue-200 dark:border-blue-800 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>맞춤 진단</span>
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="py-2.5 px-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-extrabold text-xs flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>✨ 고객 후기</span>
              </button>
              <button
                onClick={() => scrollToSection('metrics-dashboard')}
                className="py-2.5 px-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-extrabold text-xs flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>📊 성과 지표</span>
              </button>
              <button
                onClick={() => scrollToSection('brand-story')}
                className="py-2.5 px-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold text-xs flex items-center justify-center gap-1 cursor-pointer"
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
