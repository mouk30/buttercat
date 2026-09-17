import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, ArrowUp } from 'lucide-react';
import { AGENCY_INFO } from '../data/marketingData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100 text-slate-600 text-xs border-t border-slate-200/90 pt-16 pb-24 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-200">
          {/* Col 1: Brand & Slogan */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-amber-50 border border-amber-300 shadow-sm shrink-0">
                <img
                  src="/images/buttercat_logo.jpg"
                  alt="버터캣 로고"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-slate-900 text-lg tracking-tight leading-tight">
                  버터캣<span className="text-amber-500 font-bold text-sm ml-1">BUTTERCAT</span>
                </span>
                <span className="text-[10px] text-slate-500 font-semibold">버터캣 마케팅 솔루션</span>
              </div>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm max-w-md leading-relaxed font-medium">
              {AGENCY_INFO.slogan}<br />
              {AGENCY_INFO.subSlogan}
            </p>
            <div className="pt-2 flex items-center gap-2 text-slate-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>공정거래위원회 가이드라인 100% 준수 클린 마케팅 대행사</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-slate-900 font-extrabold uppercase tracking-wider mb-3">
              운영 광고 취급 상품
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <a href="#naver-place" className="hover:text-blue-600 transition-colors">
                  네이버 플레이스 지도 상위노출
                </a>
              </li>
              <li>
                <a href="#naver-blog" className="hover:text-blue-600 transition-colors">
                  네이버 블로그광고 & 체험단
                </a>
              </li>
              <li>
                <a href="#instagram" className="hover:text-blue-600 transition-colors">
                  인스타그램 광고 & 릴스 숏폼
                </a>
              </li>
              <li>
                <a href="#google-youtube" className="hover:text-blue-600 transition-colors">
                  구글·유튜브 검색 & 영상 광고
                </a>
              </li>
              <li>
                <a href="#website" className="hover:text-blue-600 transition-colors">
                  가성비 모바일 반응형 홈페이지제작
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: CS Hotline */}
          <div>
            <h4 className="text-slate-900 font-extrabold uppercase tracking-wider mb-3">
              고객센터 & 상담문의
            </h4>
            <div className="space-y-2">
              <div className="text-2xl font-black text-slate-900">{AGENCY_INFO.hotline}</div>
              <div className="text-slate-600 font-medium">{AGENCY_INFO.consultationHours}</div>
              <div className="text-slate-600 font-medium">긴급상담: {AGENCY_INFO.directPhone}</div>
              <div className="pt-2">
                <a
                  href="#consultation"
                  className="inline-block px-4 py-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-600 hover:text-white font-bold transition-all text-xs shadow-2xs"
                >
                  온라인 무료 진단 신청 &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Business Info */}
        <div className="pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[11px] text-slate-500 font-medium">
          <div>
            <p>
              (주)버터캣 마케팅 솔루션 | 대표자: 홍길동 | 사업자등록번호: {AGENCY_INFO.businessNumber}
            </p>
            <p className="mt-1">
              주소: {AGENCY_INFO.address} | 통신판매업신고: 제2025-서울강남-04821호
            </p>
            <p className="mt-1 text-slate-400">
              Copyright © 2026 BUTTERCAT MARKETING Inc. All rights reserved.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="self-end md:self-auto p-2.5 px-4 rounded-xl bg-white hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer font-bold"
            title="맨 위로"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
