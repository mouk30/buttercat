import React, { useState } from 'react';
import { Sparkles, Heart, ShieldCheck, TrendingUp, Users, ArrowRight, CheckCircle2, Volume2, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ButterCatSoundEffect } from '../utils/catSound';

interface BrandStoryProps {
  onOpenConsultationModal: () => void;
}

export function BrandStory({ onOpenConsultationModal }: BrandStoryProps) {
  const [cheered, setCheered] = useState(false);

  const handleSound = () => {
    if (!cheered) {
      setCheered(true);
      ButterCatSoundEffect.playCheer();
    } else {
      ButterCatSoundEffect.playMeow(1.2);
    }
  };
  return (
    <section id="brand-story" className="py-20 lg:py-28 bg-gradient-to-b from-white via-amber-50/40 to-white relative overflow-hidden border-t border-amber-200/50">
      {/* Subtle background decorative pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-15 pointer-events-none" />
      
      {/* Decorative ambient color spots */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-80 h-80 bg-blue-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs sm:text-sm font-extrabold mb-4 shadow-2xs">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>버터캣 비하인드 스토리</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-5">
            왜 우리는 <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700">‘울고 있는 고양이’</span>를<br className="hidden sm:inline" />
            마스코트로 삼았을까요?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
            "맛있게 준비했는데 왜 손님이 안 올까?", "광고비는 나갔는데 왜 전화 한 통 없을까?"<br className="hidden md:inline" />
            누구에게도 털어놓지 못하고 홀로 눈물짓던 대한민국 사장님들의 진심에 공감하며 버터캣이 탄생했습니다.
          </p>
        </div>

        {/* Narrative Feature Layout: Story & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          
          {/* Left Column: Visual Story Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-xl shadow-amber-500/10 select-none"
            >
              
              {/* Character showcase with tap reaction */}
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleSound}
                className="relative mx-auto w-56 sm:w-64 aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-amber-100 via-amber-50 to-amber-200/80 border-2 border-amber-300 shadow-md mb-6 flex items-center justify-center cursor-pointer group"
              >
                <img
                  src="/images/buttercat_logo.jpg"
                  alt="눈물 글썽이는 버터캣"
                  className={`w-full h-full object-contain p-2 transition-all duration-300 ${
                    cheered ? 'rotate-2 brightness-105' : 'group-hover:scale-105'
                  }`}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2.5 right-2.5 bg-amber-500 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-2xs flex items-center gap-1">
                  <Volume2 className="w-3 h-3" />
                  <span>터치해보세요!</span>
                </div>

                <div className="absolute bottom-2 left-2.5 bg-white/90 backdrop-blur-xs text-amber-900 border border-amber-200 text-[10px] font-black px-2 py-0.5 rounded-full">
                  {cheered ? '💛 야옹! 힘이 나요!' : '💧 눈물 뚝 솔루션'}
                </div>
              </motion.div>

              {/* Story Quote Bubble */}
              <div className="bg-amber-50/90 rounded-2xl p-4 border border-amber-200 text-slate-800 text-center">
                <p className="text-xs font-bold text-amber-800 mb-1">
                  “대표님의 눈물은 이제 기쁨의 환호로 바뀝니다”
                </p>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
                  버터캣의 눈물은 <strong className="text-slate-900">슬픔의 끝</strong>이자,<br />
                  매출 반등과 만석 행진으로 향하는 <strong className="text-amber-700">새로운 시작</strong>을 의미합니다.
                </p>
              </div>

              {/* Mini Stats Tag */}
              <div className="mt-5 grid grid-cols-2 gap-2 text-center">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="block text-[11px] text-slate-500 font-bold">누적 눈물 뚝 솔루션</span>
                  <span className="text-lg font-black text-slate-900">1,850+ 매장</span>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="block text-[11px] text-amber-800 font-bold">광고주 만족도</span>
                  <span className="text-lg font-black text-amber-900">98.4%</span>
                </div>
              </div>

            </motion.div>
          </div>

          {/* Right Column: 3 Core Pillars of Buttercat */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Story Card 1 */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 hover:border-amber-400 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 border border-amber-300 flex items-center justify-center shrink-0 shadow-2xs">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-black text-amber-700 uppercase tracking-wide">Pillar 01</span>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5 mb-2">
                    자영업자의 아픔을 온전히 이해하는 '진정성'
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                    많은 마케팅 대행사가 기계적으로 광고비를 소진하고 침묵할 때, 버터캣은 광고주 한 분 한 분의 주방과 매장 뒷편의 땀방울을 먼저 바라봅니다. 
                    단순한 대행이 아니라 사장님의 든든한 사업 파트너로서 함께 고민하고 밤을 지새웁니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Story Card 2 */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 border border-blue-300 flex items-center justify-center shrink-0 shadow-2xs">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-black text-blue-700 uppercase tracking-wide">Pillar 02</span>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5 mb-2">
                    거품 없는 실비 정산 & 위약금 제로의 '신뢰'
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                    과도한 약정이나 불투명한 견적은 광고주를 더 울게 만듭니다. 
                    버터캣은 집행 내역을 투명하게 공개하고, 위약금 없는 자유 계약과 착한 정찰제 요금으로 사장님의 소중한 마케팅 예산을 단 1원도 헛되이 쓰지 않습니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Story Card 3 */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 hover:border-emerald-400 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center shrink-0 shadow-2xs">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-black text-emerald-700 uppercase tracking-wide">Pillar 03</span>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5 mb-2">
                    숫자로 증명하는 확실한 '실제 매출 성장'
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                    조회수만 높은 공허한 홍보는 지양합니다. 네이버 플레이스 1위 상위노출, 진성 타겟 블로그 리뷰, 인스타그램 릴스 바이럴, 
                    그리고 전환율 높은 맞춤 홈페이지까지 실제 손님의 발걸음과 예약 전화로 이어지는 확실한 성과를 창출합니다.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Brand Promise Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 p-8 sm:p-10 text-white shadow-xl shadow-amber-500/20 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black">
                <span>💧 약속합니다</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight">
                "버터캣과 함께라면, 이제 손님 걱정으로 울지 않으셔도 됩니다."
              </h3>
              <p className="text-amber-100 text-xs sm:text-sm font-medium max-w-2xl">
                사장님의 업종, 상권 위치, 경쟁 매장 분석부터 실시간 맞춤 솔루션까지 1:1 전담 디렉터가 처음부터 끝까지 책임집니다.
              </p>
            </div>

            <button
              onClick={onOpenConsultationModal}
              className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl bg-white text-slate-900 hover:bg-amber-50 font-black text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <span>버터캣 1:1 무료 진단 시작하기</span>
              <ArrowRight className="w-4 h-4 text-amber-600" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
