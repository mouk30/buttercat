import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQ_LIST } from '../data/marketingData';

interface FaqSectionProps {
  onOpenConsultationModal: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenConsultationModal }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const categories = ['전체', '네이버', 'SNS/영상', '홈페이지', '일반'];

  const filteredFaqs =
    selectedCategory === '전체'
      ? FAQ_LIST
      : FAQ_LIST.filter((f) => f.category === selectedCategory);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-3 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>자주 묻는 질문</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            궁금하신 점을 빠르게 해결해 드립니다
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            광고 집행 전 가장 많이 문의주시는 질문들을 모았습니다.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setOpenIndex(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
                      {faq.category}
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-slate-900">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/50">
                    <p className="whitespace-pre-line">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional support trigger in soft blue accent card */}
        <div className="mt-12 text-center bg-blue-50/70 rounded-3xl border border-blue-200 p-8 shadow-sm">
          <p className="text-sm sm:text-base font-bold text-slate-800 mb-3">
            더 궁금한 점이 있으시거나 맞춤 견적이 필요하신가요?
          </p>
          <button
            onClick={onOpenConsultationModal}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>1:1 실시간 맞춤 상담 문의하기</span>
          </button>
        </div>
      </div>
    </section>
  );
};
