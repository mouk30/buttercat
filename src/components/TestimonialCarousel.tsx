import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  Sparkles,
  TrendingUp,
  Award,
  CheckCircle2,
  MapPin,
  Smile,
  Heart,
  MessageCircle,
  ArrowRight,
  Pause,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { copyAndOpenKakaoChat } from '../utils/kakaoFormat';

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  businessName: string;
  industry: string;
  location: string;
  avatarBg: string;
  avatarEmoji: string;
  beforeTear: string;
  afterSmile: string;
  quote: string;
  metrics: {
    revenueGrowth: string;
    keyAchievement: string;
    rating: number;
    period: string;
  };
  recommendedService: string;
  verifiedDate: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'story-1',
    name: '박진우 대표님',
    role: '오너 셰프 & 대표',
    businessName: '강남 프리미엄 숯불 화로구이',
    industry: '외식업 / 고기집',
    location: '서울 강남구 역삼동',
    avatarBg: 'from-amber-400 to-orange-500',
    avatarEmoji: '🥩',
    beforeTear:
      '매일 새벽까지 최상급 고기를 손질해도 골목 상권이라 손님이 없었습니다. 대행사 텔레마케팅에 속아 300만 원 날리고 텅 빈 매장에서 홀로 눈물짓던 시절이 있었습니다.',
    afterSmile:
      '버터캣 솔루션 3주 만에 플레이스 1위 찍고 주말 전 시간대 예약이 마감되었습니다. 지금은 웨이팅 명부 관리하느라 직원들과 행복한 비명을 지르고 있습니다!',
    quote:
      '“광고 사기만 세 번 당하고 마지막이라는 심정으로 버터캣을 찾았습니다. 3주 만에 테이블 회전율이 3배로 뛰었고, 직원 월급 밀릴 걱정 없이 장사하게 해주신 은인입니다.”',
    metrics: {
      revenueGrowth: '월 3,200만 ➔ 8,900만 원 (+178%)',
      keyAchievement: '네이버 플레이스 강남 1위 탈환',
      rating: 5.0,
      period: '집행 8주 차'
    },
    recommendedService: '네이버 플레이스 1위 노출 + 블로그 찐후기',
    verifiedDate: '2025. 01 실제 광고주 인증'
  },
  {
    id: 'story-2',
    name: '김서연 대표원장님',
    role: '피부과 전문의 원장',
    businessName: '서초 리프팅·안티에이징 피부과의원',
    industry: '병원 / 의료',
    location: '서울 서초구 서초동',
    avatarBg: 'from-blue-400 to-indigo-500',
    avatarEmoji: '🩺',
    beforeTear:
      '신규 개원 후 수많은 강남·서초 대형 피부과들 틈바구니에서 신환 유치가 막막했습니다. 무작정 쏟아부은 키워드 광고비만 매달 수백만 원씩 빠져나가 잠을 설쳤습니다.',
    afterSmile:
      '버터캣의 정밀 타겟팅과 네이버 플레이스 진료 예약 시스템 최적화 후, 신환 문의가 월 200건 육박! 이제는 비급여 리프팅 시술이 3주 동안 꽉 차 대기하고 있습니다.',
    quote:
      '“단순 노출이 아니라 실제 진료 예약으로 연결되는 환자 풀을 만들어 주셨습니다. 쓸데없는 광고비는 절반으로 줄고 병원 매출은 2배 이상 폭풍 성장했습니다.”',
    metrics: {
      revenueGrowth: '월 5,400만 ➔ 1억 4,200만 원 (+163%)',
      keyAchievement: '서초 피부과 2위 & 예약 3주 대기',
      rating: 5.0,
      period: '집행 12주 차'
    },
    recommendedService: '의료법 준수 브랜드 블로그 + 플레이스 예약 최적화',
    verifiedDate: '2025. 01 실제 광고주 인증'
  },
  {
    id: 'story-3',
    name: '이민혁 원장님',
    role: '헤어 디렉터',
    businessName: '홍대 프리미엄 맨즈/우먼 헤어살롱',
    industry: '뷰티 / 헤어살롱',
    location: '서울 마포구 서교동',
    avatarBg: 'from-purple-400 to-pink-500',
    avatarEmoji: '✂️',
    beforeTear:
      '헤어 시술 실력에는 자신 있었지만 마케팅을 몰라 혼자 인스타에 사진만 올리다 지쳤습니다. 인근 대형 프랜차이즈 미용실에 손님을 뺏겨 월세 낼 때마다 가슴이 타들어갔습니다.',
    afterSmile:
      '버터캣이 기획해 준 릴스 영상 하나가 24만 뷰를 기록하며 MZ세대 고객들이 줄을 섰습니다. 네이버 예약률 1위 배지를 획득하고 올해 2호점 확장을 확정했습니다!',
    quote:
      '“디자이너 5명 전원이 주말 풀부킹으로 쉴 틈이 없습니다. 인스타 릴스와 네이버 플레이스를 연결하는 버터캣의 기획력에 매번 감탄합니다.”',
    metrics: {
      revenueGrowth: '월 1,800만 ➔ 4,850만 원 (+169%)',
      keyAchievement: '홍대 네이버 예약률 1위 배지',
      rating: 5.0,
      period: '집행 6주 차'
    },
    recommendedService: '인스타그램 릴스 숏폼 바이럴 + 플레이스 N페이 연동',
    verifiedDate: '2025. 02 실제 광고주 인증'
  },
  {
    id: 'story-4',
    name: '최성현 대표님',
    role: '헤드 트레이너 & 대표',
    businessName: '판교 1:1 체형교정 PT·필라테스',
    industry: '피트니스 / 체육',
    location: '경기 성남시 분당구 삼평동',
    avatarBg: 'from-emerald-400 to-teal-600',
    avatarEmoji: '🏋️',
    beforeTear:
      '인테리어와 수입 기구에 1억 원 넘게 투자했는데 전단지를 돌려도 문의가 0건이었습니다. 매달 나가는 높은 판교 상가 임대료 때문에 폐업까지 진지하게 고민했습니다.',
    afterSmile:
      '판교 IT 직장인들의 고질병인 거북목·디스크 재활 니치 키워드를 공략해 체험권 등록 전환율 78%를 달성했습니다! 오픈 3개월 만에 완벽한 흑자 턴어라운드를 이뤄냈습니다.',
    quote:
      '“무조건 큰 키워드만 잡으라는 다른 대행사와 달리, 버터캣은 판교 상권 특성을 정확히 꿰뚫고 직장인 타겟을 핀셋 공략해주셨습니다. 회원 재등록률 90%입니다!”',
    metrics: {
      revenueGrowth: '월 2,100만 ➔ 6,100만 원 (+190%)',
      keyAchievement: '체험 수업 등록 전환율 78% 돌파',
      rating: 5.0,
      period: '집행 10주 차'
    },
    recommendedService: '로컬 타겟 당근/네이버 침투 + 1:1 랜딩페이지',
    verifiedDate: '2025. 02 실제 광고주 인증'
  },
  {
    id: 'story-5',
    name: '정유진 사장님',
    role: '오너 파티시에',
    businessName: '성수동 수제 디저트 베이커리',
    industry: '카페 / 디저트',
    location: '서울 성동구 성수동',
    avatarBg: 'from-amber-300 to-yellow-500',
    avatarEmoji: '🧁',
    beforeTear:
      '매일 새벽 신선한 버터로 정성껏 빵을 구웠지만 골목 안쪽에 있어 동네 주민조차 몰랐습니다. 매일 저녁 팔리지 않은 빵을 폐기할 때마다 눈물이 핑 돌았습니다.',
    afterSmile:
      '버터캣의 감성 인플루언서 패키지와 지도 검색 최적화 이후, 오후 3시면 전 메뉴 완판! 주말에는 지방에서 빵지순례 오는 핫플레이스로 거듭났습니다.',
    quote:
      '“더 이상 아까운 빵을 버리지 않습니다. 문 열자마자 달려와 주시는 손님들의 미소를 볼 때마다 버터캣을 만난 게 제 장사 인생의 가장 큰 복이라고 생각합니다.”',
    metrics: {
      revenueGrowth: '월 1,400만 ➔ 3,800만 원 (+171%)',
      keyAchievement: '디저트 조기 완판율 98% 달성',
      rating: 5.0,
      period: '집행 5주 차'
    },
    recommendedService: '인스타 감성 숏폼 + 성수 핫플 네이버 지도 최적화',
    verifiedDate: '2025. 02 실제 광고주 인증'
  }
];

interface TestimonialCarouselProps {
  onOpenConsultationModal?: (serviceId?: string, industry?: string) => void;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  onOpenConsultationModal
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = TESTIMONIALS.length;
  const current = TESTIMONIALS[currentIndex];

  // Next Slide
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  // Prev Slide
  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Auto-play control
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, 7000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIndex]);

  const handleConsultThisStory = async () => {
    await copyAndOpenKakaoChat({
      companyName: `${current.businessName} 사례 문의`,
      contactName: '성공 사례 확인 고객',
      phone: '카카오톡 상담',
      industry: current.industry,
      selectedServices: [current.recommendedService],
      inquiryDetails: `[${current.businessName} (${current.name})] 사장님 성공 스토리를 보고 문의드립니다. 저희 가게(${current.industry})도 비슷한 순위 및 매출 상승 솔루션 견적을 받아보고 싶습니다.`
    });
  };

  // Slide Variants for Motion
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-slate-50/70 via-white to-amber-50/20 border-t border-slate-200/80 relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amber-100/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-extrabold mb-4 shadow-2xs">
            <Smile className="w-3.5 h-3.5 text-amber-600" />
            <span>눈물 닦고 활짝 웃게 된 사장님들의 이야기</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            버터캣을 만나고 <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700">미소를 되찾은</span> 파트너 인터뷰
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            매출 부진과 광고 사기로 혼자 눈물짓던 대표님들이 버터캣의 진정성 있는 1:1 맞춤 솔루션을 통해 어떻게 웃게 되었는지 생생한 목소리를 들려드립니다.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Main Card with AnimatePresence */}
          <div className="relative min-h-[540px] sm:min-h-[500px] flex items-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="w-full bg-white rounded-3xl border-2 border-amber-200/90 shadow-xl shadow-amber-500/5 p-6 sm:p-10 lg:p-12 overflow-hidden relative"
              >
                {/* Decorative Top Accent & Big Watermark Quote */}
                <div className="absolute -top-6 -right-6 text-amber-100/60 pointer-events-none select-none">
                  <Quote className="w-40 h-40" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                  {/* Left Column (5 cols): Profile & Emotional Transformation */}
                  <div className="lg:col-span-5 space-y-5">
                    {/* Owner Badge & Business Header */}
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${current.avatarBg} flex items-center justify-center text-3xl shadow-md shadow-amber-500/15 shrink-0`}
                      >
                        {current.avatarEmoji}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-base sm:text-lg font-black text-slate-900">
                            {current.name}
                          </span>
                          <span className="text-xs text-slate-500 font-bold">
                            {current.role}
                          </span>
                        </div>
                        <div className="text-xs font-black text-blue-600 flex items-center gap-1">
                          <span>{current.businessName}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 font-medium">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{current.location}</span>
                          <span>•</span>
                          <span className="text-slate-600 font-bold">{current.industry}</span>
                        </div>
                      </div>
                    </div>

                    {/* Star Rating & Verified Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                        <span className="text-xs font-black text-slate-900 ml-1.5">5.0 / 5.0</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{current.verifiedDate}</span>
                      </div>
                    </div>

                    {/* Before ➔ After Contrast Story Box */}
                    <div className="space-y-3 pt-1">
                      {/* Before Box (Tears) */}
                      <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/90 text-xs">
                        <div className="flex items-center gap-1.5 font-black text-rose-800 mb-1">
                          <span className="text-sm">💧</span>
                          <span>버터캣을 만나기 전 (사장님의 눈물)</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed font-medium">
                          {current.beforeTear}
                        </p>
                      </div>

                      {/* After Box (Smile) */}
                      <div className="p-4 rounded-2xl bg-amber-50/80 border-2 border-amber-300 text-xs">
                        <div className="flex items-center gap-1.5 font-black text-amber-900 mb-1">
                          <span className="text-sm">✨</span>
                          <span>버터캣 처방 후 (활짝 웃게 된 지금)</span>
                        </div>
                        <p className="text-slate-800 leading-relaxed font-semibold">
                          {current.afterSmile}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (7 cols): Direct Quote & Key Achievements */}
                  <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6 lg:pl-4">
                    {/* Big Quote Block */}
                    <div className="relative">
                      <p className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 leading-relaxed italic bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text">
                        {current.quote}
                      </p>
                    </div>

                    {/* Numeric Metric Badges Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 mb-1">
                          <TrendingUp className="w-4 h-4 text-blue-600" />
                          <span>실제 매출 성장</span>
                        </div>
                        <div className="text-sm sm:text-base font-black text-slate-900">
                          {current.metrics.revenueGrowth}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {current.metrics.period} 기준 누적 결과
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 mb-1">
                          <Award className="w-4 h-4 text-emerald-600" />
                          <span>핵심 달성 지표</span>
                        </div>
                        <div className="text-sm sm:text-base font-black text-emerald-800">
                          {current.metrics.keyAchievement}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          상권 내 검색 1페이지 선점
                        </div>
                      </div>
                    </div>

                    {/* Applied Solution Note */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-500">집행 솔루션:</span>
                        <span className="font-bold text-slate-800">{current.recommendedService}</span>
                      </div>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 shrink-0">
                        맞춤 처방 완료
                      </span>
                    </div>

                    {/* Action Buttons for this case */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        onClick={handleConsultThisStory}
                        className="w-full sm:w-auto flex-1 py-3.5 px-4 rounded-xl bg-[#FEE500] hover:bg-[#edd400] text-[#3C1E1E] text-xs font-black transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 text-[#3C1E1E]" />
                        <span>카톡으로 이 사장님과 같은 플랜 문의하기</span>
                      </button>

                      <button
                        onClick={() => {
                          if (onOpenConsultationModal) {
                            onOpenConsultationModal(undefined, current.industry);
                          }
                        }}
                        className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                      >
                        <span>우리 매장 무료 진단</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls: Prev, Next, Play/Pause, Indicators */}
          <div className="flex items-center justify-between mt-8 px-2">
            {/* Slide Index & Auto-play status */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-black text-slate-800">
                0{currentIndex + 1} <span className="text-slate-400 font-normal">/ 0{total}</span>
              </span>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors text-xs flex items-center gap-1 cursor-pointer"
                title={isPlaying ? '자동 넘김 일시정지' : '자동 넘김 시작'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span className="text-[11px] font-medium hidden sm:inline">
                  {isPlaying ? '자동재생 중' : '일시정지됨'}
                </span>
              </button>
            </div>

            {/* Dot Indicators */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx
                      ? 'w-8 bg-amber-500 shadow-xs'
                      : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={`성공 사례 ${idx + 1}번 보기`}
                />
              ))}
            </div>

            {/* Prev / Next Arrow Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-xl bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-slate-700 hover:text-amber-800 flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
                aria-label="이전 후기"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-xl bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-slate-700 hover:text-amber-800 flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
                aria-label="다음 후기"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Mascot Encouragement Strip */}
        <div className="mt-14 max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-amber-100 border border-amber-300 shrink-0">
              <img
                src="/images/buttercat_logo.jpg"
                alt="버터캣"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
              "다음 성공 스토리의 주인공은 바로 대표님입니다. 눈물 닦고 함께 웃을 수 있도록 버터캣이 전담 지원하겠습니다."
            </p>
          </div>
          <div className="shrink-0 hidden sm:block">
            <span className="text-[11px] font-extrabold text-amber-800 bg-amber-200/70 px-3 py-1 rounded-full">
              파트너 만족도 98.4%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
