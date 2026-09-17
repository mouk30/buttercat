import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServiceOverview } from './components/ServiceOverview';
import { ServiceDetailSection } from './components/ServiceDetailSection';
import { EstimateCalculator } from './components/EstimateCalculator';
import { CaseStudies } from './components/CaseStudies';
import { PerformanceMetricsDashboard } from './components/PerformanceMetricsDashboard';
import { TestimonialCarousel } from './components/TestimonialCarousel';
import { BrandStory } from './components/BrandStory';
import { ProcessSection } from './components/ProcessSection';
import { FaqSection } from './components/FaqSection';
import { ConsultationSection } from './components/ConsultationSection';
import { Footer } from './components/Footer';
import { QuickActionFloat } from './components/QuickActionFloat';
import { QuickInquiryModal } from './components/QuickInquiryModal';
import { ServiceId } from './types';

export default function App() {
  const [activeServiceTab, setActiveServiceTab] = useState<ServiceId>('naver-place');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDefaultService, setModalDefaultService] = useState<string | undefined>(undefined);
  const [modalDefaultIndustry, setModalDefaultIndustry] = useState<string | undefined>(undefined);

  // Form pre-fill states for the main consultation section
  const [formInitialService, setFormInitialService] = useState<ServiceId | undefined>(undefined);
  const [formInitialIndustry, setFormInitialIndustry] = useState<string | undefined>(undefined);
  const [formInitialSummary, setFormInitialSummary] = useState<string | undefined>(undefined);

  const handleOpenModal = (serviceId?: string, industry?: string) => {
    setModalDefaultService(serviceId);
    setModalDefaultIndustry(industry);
    setModalOpen(true);
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleSelectServiceFromOverview = (serviceId: ServiceId) => {
    setActiveServiceTab(serviceId);
    handleScrollToSection('services-detail');
  };

  const handleSelectPackage = (serviceTitle: string, packageName: string) => {
    setFormInitialSummary(`[패키지 상담 신청] ${serviceTitle} - ${packageName}`);
    handleOpenModal(serviceTitle);
  };

  const handleApplyEstimate = (data: {
    industry: string;
    services: ServiceId[];
    estimatedMonthly: number;
    estimatedOnetime: number;
    summary: string;
  }) => {
    setFormInitialIndustry(data.industry);
    if (data.services.length > 0) {
      setFormInitialService(data.services[0]);
    }
    const estimateNote = `[1:1 맞춤 전략 진단 신청]\n- 업종: ${data.industry}\n- 진단 내용: ${data.summary}`;
    setFormInitialSummary(estimateNote);

    handleScrollToSection('consultation');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top sticky Navigation Header */}
      <Navbar onOpenConsultationModal={handleOpenModal} />

      {/* Main Container */}
      <main className="flex-1">
        {/* Hero Section with key metrics & fast product jump */}
        <Hero
          onOpenConsultationModal={() => handleOpenModal()}
          onScrollToService={(id) => {
            if (['naver-place', 'naver-blog', 'instagram', 'google-youtube', 'website'].includes(id)) {
              setActiveServiceTab(id as ServiceId);
              handleScrollToSection('services-detail');
            } else {
              handleScrollToSection(id);
            }
          }}
        />

        {/* 5 Core Services Overview Grid */}
        <ServiceOverview
          onSelectServiceTab={handleSelectServiceFromOverview}
          onOpenConsultationModal={(serviceId) => handleOpenModal(serviceId)}
        />

        {/* Interactive Detailed Showcase for all 5 handled products */}
        <ServiceDetailSection
          activeTab={activeServiceTab}
          onTabChange={(id) => setActiveServiceTab(id)}
          onSelectPackage={handleSelectPackage}
        />

        {/* Real-time Estimate & Package Calculator */}
        <EstimateCalculator onApplyEstimate={handleApplyEstimate} />

        {/* Real Case Studies & Before/After Proof */}
        <CaseStudies onOpenConsultationModal={(cat) => handleOpenModal(undefined, cat)} />

        {/* Data-Driven Performance Metrics Dashboard (Recharts) */}
        <PerformanceMetricsDashboard onOpenConsultationModal={handleOpenModal} />

        {/* Real Customer Success Stories (Testimonials Carousel) */}
        <TestimonialCarousel onOpenConsultationModal={handleOpenModal} />

        {/* Brand Story & Emotional Value Section */}
        <BrandStory onOpenConsultationModal={() => handleOpenModal()} />

        {/* 5-Step Proven Workflow */}
        <ProcessSection />

        {/* FAQ Section */}
        <FaqSection onOpenConsultationModal={() => handleOpenModal()} />

        {/* Full Consultation Form & Recent Saved Inquiries */}
        <ConsultationSection
          initialService={formInitialService}
          initialIndustry={formInitialIndustry}
          initialSummary={formInitialSummary}
        />
      </main>

      {/* Agency Corporate Footer */}
      <Footer />

      {/* Persistent Floating Quick Bar */}
      <QuickActionFloat onOpenModal={() => handleOpenModal()} />

      {/* Quick Consultation Inquiry Modal */}
      <QuickInquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={modalDefaultService}
        defaultIndustry={modalDefaultIndustry}
      />
    </div>
  );
}
