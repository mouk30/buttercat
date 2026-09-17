import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, TrendingUp, ShieldCheck, Sparkles, MapPin, BookOpen, Instagram, Youtube, Globe, PhoneCall, Star, Award, ChevronRight, Volume2, VolumeX, Smile, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AGENCY_INFO } from '../data/marketingData';
import { ButterCatSoundEffect } from '../utils/catSound';

interface HeroProps {
  onOpenConsultationModal: () => void;
  onScrollToService: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultationModal, onScrollToService }) => {
  const [isComforted, setIsComforted] = useState(false);
  const [meowCount, setMeowCount] = useState(0);

  const handleCatClick = () => {
    setMeowCount((prev) => prev + 1);
    if (!isComforted) {
      setIsComforted(true);
      ButterCatSoundEffect.playCheer();
    } else {
      ButterCatSoundEffect.playMeow(1.0 + (meowCount % 3) * 0.15);
    }
  };

  const handleResetComfort = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsComforted(false);
    ButterCatSoundEffect.playMeow(0.9);
  };
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/70 via-sky-50/30 to-white">
      {/* Radiant ambient glow & clean background texture */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-tr from-blue-200/40 via-cyan-100/50 to-indigo-100/30 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute -top-24 right-10 w-96 h-96 bg-amber-100/40 blur-[90px] rounded-full pointer-events-none -z-10" />
      
      {/* Subtle crisp geometric dot matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10">
          
          {/* Left Column: Headlines, CTA, and Guarantees */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Eyebrow badge with funny buttercat avatar */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-amber-300 text-slate-700 text-xs sm:text-sm font-semibold mb-6 shadow-sm shadow-amber-500/10">
              <div className="w-7 h-7 rounded-full overflow-hidden border border-amber-400 bg-amber-50 shrink-0">
                <img
                  src="/images/buttercat_logo.jpg"
                  alt="버터캣"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-amber-700 font-extrabold">손님 없어서 울던 날은 이제 끝!</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-800 font-black">버터캣 마케팅 솔루션</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.22] mb-6">
              검색 유입을 폭발시키고 <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600">
                확실한 매출로 보답하는
              </span>{' '}
              온라인 마케팅
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8">
              소상공인 골목 매장부터 전국 프랜차이즈, 전문직 병의원까지.<br className="hidden sm:block" />
              <strong className="text-slate-900 font-semibold">네이버 플레이스 · 블로그 · 인스타그램 · 유튜브 · 가성비 홈페이지</strong>까지
              광고비 낭비 없는 데이터 기반 1:1 맞춤 전략으로 대표님의 고민을 끝내드립니다.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 mb-8">
              <button
                onClick={onOpenConsultationModal}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-base shadow-xl shadow-blue-600/25 hover:shadow-2xl hover:shadow-blue-600/35 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>1:1 무료 마케팅 상권 진단 신청</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>
              <a
                href={AGENCY_INFO.kakaoOpenChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-[#FEE500] hover:bg-[#edd400] text-[#3C1E1E] font-black text-base shadow-lg shadow-amber-500/15 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>카톡 오픈채팅 빠른상담</span>
              </a>
            </div>

            {/* 4 guarantees in bright white pill cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-bold text-slate-700">
              <div className="flex items-center justify-center lg:justify-start gap-2 p-2.5 rounded-xl bg-white/95 border border-slate-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>1:1 전담 디렉터</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 p-2.5 rounded-xl bg-white/95 border border-slate-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>투명 데이터 보고</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 p-2.5 rounded-xl bg-white/95 border border-slate-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>위약금 없는 자유계약</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 p-2.5 rounded-xl bg-white/95 border border-slate-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>착한 실비 정산제</span>
              </div>
            </div>
          </div>

          {/* Right Column: Giant Crying Buttercat Character Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative w-full max-w-sm sm:max-w-md bg-gradient-to-b from-amber-50/90 via-white to-amber-100/60 p-6 sm:p-7 rounded-3xl border-2 border-amber-300/90 shadow-2xl shadow-amber-500/20 text-center select-none"
            >
              
              {/* Humorous Comic Speech Bubble with Dynamic Emotion */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={isComforted ? 'comforted' : 'crying'}
                  initial={{ opacity: 0, y: -6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="inline-block relative bg-white text-slate-900 px-4 py-2.5 rounded-2xl rounded-bl-xs border border-amber-300 shadow-md text-xs sm:text-sm font-black mb-4 cursor-pointer hover:border-amber-400"
                  onClick={handleCatClick}
                  title="고양이를 클릭해보세요!"
                >
                  {isComforted ? (
                    <span className="flex items-center gap-1 text-emerald-700">
                      <span>✨</span>
                      <span>"야옹~! 버터캣 덕분에 예약 폭주해서 웃음 만개!"</span>
                      <span>😸</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-slate-900">
                      <span className="text-amber-500 animate-bounce">💧</span>
                      <span>"대표님... 오늘도 손님이 없어서 혼자 울고 계셨나요?"</span>
                    </span>
                  )}
                  <div className="absolute -bottom-2 left-6 w-3 h-3 bg-white border-b border-r border-amber-300 rotate-45"></div>
                </motion.div>
              </AnimatePresence>

              {/* Massive Buttercat Crying Mascot Image with interactive touch & sound */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleCatClick}
                className="relative mx-auto w-60 sm:w-72 md:w-80 aspect-square rounded-3xl overflow-hidden bg-gradient-to-b from-amber-100 via-amber-50 to-amber-200/70 border-4 border-amber-300 shadow-xl group cursor-pointer"
              >
                <img
                  src="/images/buttercat_logo.jpg"
                  alt="눈물 글썽이는 버터캣 공식 캐릭터"
                  className={`w-full h-full object-contain p-2 drop-shadow-md transition-all duration-300 ${
                    isComforted ? 'rotate-1 brightness-105' : 'group-hover:scale-105'
                  }`}
                  referrerPolicy="no-referrer"
                />

                {/* Floating interactive hint badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs border border-amber-300 px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                  <span className="text-[11px] font-black text-amber-900">
                    {isComforted ? '행복한 버터캣 💛' : '클릭해서 눈물 닦아주기 🐾'}
                  </span>
                </div>

                {/* Sound effect indicator pill */}
                <div className="absolute top-3 right-3 bg-amber-500/90 hover:bg-amber-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 transition-all pointer-events-none">
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                  <span>소리ON</span>
                </div>

                <div className="absolute bottom-3 right-3 bg-slate-900/85 backdrop-blur-xs text-amber-300 text-[11px] font-extrabold px-3 py-1 rounded-full shadow-sm">
                  {isComforted ? '매출 폭발 성공! 🎉' : '눈물 닦고 매출 떡상! 🚀'}
                </div>

                {/* Ripple tear or sparkle effect on comforted */}
                {isComforted && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0.9 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-radial from-amber-300/40 to-transparent pointer-events-none"
                  />
                )}
              </motion.div>

              {/* Reset or interactive toggle prompt */}
              <div className="mt-3 flex items-center justify-between px-2 text-[11px] font-bold text-slate-500">
                <span className="flex items-center gap-1 text-amber-700">
                  <Volume2 className="w-3.5 h-3.5" />
                  터치하면 고양이 소리가 나요!
                </span>
                {isComforted && (
                  <button
                    onClick={handleResetComfort}
                    className="flex items-center gap-1 text-slate-400 hover:text-slate-600 underline text-[10px] cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    다시 울기
                  </button>
                )}
              </div>

              {/* Result transformation banner */}
              <div className="mt-2 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-white shadow-md border border-amber-400/80">
                <p className="text-[11px] font-bold text-amber-100">
                  매출 정체 · 무의미한 광고비 지출 끝!
                </p>
                <p className="text-sm sm:text-base font-black tracking-tight mt-0.5">
                  버터캣 솔루션으로 <span className="text-amber-200 underline underline-offset-2">플레이스 1위 & 만석 예약</span>
                </p>
              </div>

              <div className="mt-3 flex items-center justify-center gap-2 text-xs font-extrabold text-slate-600">
                <span className="text-emerald-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  누적 1,850+ 소상공인
                </span>
                <span>매장 상위노출 & 매출 반등 성공</span>
              </div>

            </motion.div>
          </div>

        </div>

        {/* 5 Core Product Direct Shortcut Cards (운영사이트 광고취급상품) */}
        <div className="mt-4 pt-8 border-t border-slate-200/80">
          <div className="flex items-center justify-between max-w-5xl mx-auto mb-4 px-1">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              버터캣 핵심 광고 취급 상품 바로가기
            </p>
            <span className="text-xs text-blue-600 font-semibold hidden sm:inline">
              클릭 시 세부 플랜 확인 &rarr;
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {/* 1. Naver Place */}
            <button
              onClick={() => onScrollToService('naver-place')}
              className="group p-4 rounded-2xl bg-white hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-300 text-left transition-all duration-200 hover:-translate-y-1 shadow-sm hover:shadow-md cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800">
                  지도상위
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                네이버 플레이스
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                지역 키워드 1~3위 목표
              </p>
            </button>

            {/* 2. Naver Blog */}
            <button
              onClick={() => onScrollToService('naver-blog')}
              className="group p-4 rounded-2xl bg-white hover:bg-green-50/50 border border-slate-200 hover:border-green-300 text-left transition-all duration-200 hover:-translate-y-1 shadow-sm hover:shadow-md cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="w-9 h-9 rounded-xl bg-green-100 text-green-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-green-100/80 text-green-800">
                  체험단
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-green-700 transition-colors">
                네이버 블로그광고
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                리뷰 체험단 & 브랜드블로그
              </p>
            </button>

            {/* 3. Instagram Ads */}
            <button
              onClick={() => onScrollToService('instagram')}
              className="group p-4 rounded-2xl bg-white hover:bg-rose-50/50 border border-slate-200 hover:border-rose-300 text-left transition-all duration-200 hover:-translate-y-1 shadow-sm hover:shadow-md cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Instagram className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100/80 text-rose-800">
                  릴스숏폼
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-rose-700 transition-colors">
                인스타그램 광고
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                메타 정밀타겟 & 릴스 제작
              </p>
            </button>

            {/* 4. Google & YouTube */}
            <button
              onClick={() => onScrollToService('google-youtube')}
              className="group p-4 rounded-2xl bg-white hover:bg-red-50/50 border border-slate-200 hover:border-red-300 text-left transition-all duration-200 hover:-translate-y-1 shadow-sm hover:shadow-md cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="w-9 h-9 rounded-xl bg-red-100 text-red-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Youtube className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-100/80 text-red-800">
                  고효율
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-red-700 transition-colors">
                구글·유튜브 광고
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                검색광고 & 유튜브 영상광고
              </p>
            </button>

            {/* 5. Website */}
            <button
              onClick={() => onScrollToService('website')}
              className="group p-4 rounded-2xl bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 text-left transition-all duration-200 hover:-translate-y-1 shadow-sm hover:shadow-md cursor-pointer col-span-2 sm:col-span-1"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Globe className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-100/80 text-indigo-800">
                  가성비
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-indigo-700 transition-colors">
                가성비 홈페이지제작
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                모바일 반응형 & SEO 최적화
              </p>
            </button>
          </div>
        </div>

        {/* Live Social Proof Counter Bar */}
        <div className="mt-12 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-200/40 grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="text-center sm:text-left sm:border-r border-slate-100 sm:pr-4">
            <div className="text-2xl sm:text-3xl font-black text-blue-600 tracking-tight">
              1,280<span className="text-lg font-bold text-slate-800">+</span>
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-1">누적 성공 마케팅 프로젝트</div>
          </div>
          <div className="text-center sm:text-left sm:border-r border-slate-100 sm:pr-4">
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">
              94.8<span className="text-lg font-bold text-slate-800">%</span>
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-1">광고주 월간 재연장률</div>
          </div>
          <div className="text-center sm:text-left sm:border-r border-slate-100 sm:pr-4">
            <div className="text-2xl sm:text-3xl font-black text-rose-600 tracking-tight">
              3.8<span className="text-lg font-bold text-slate-800">배</span>
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-1">평균 문의 및 예약 증가</div>
          </div>
          <div className="text-center sm:text-left">
            <div className="text-2xl sm:text-3xl font-black text-indigo-600 tracking-tight">
              100<span className="text-lg font-bold text-slate-800">%</span>
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-1">공정거래 클린 가이드 준수</div>
          </div>
        </div>
      </div>
    </section>
  );
};
