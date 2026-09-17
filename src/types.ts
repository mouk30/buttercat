export type ServiceId = 'naver-place' | 'naver-blog' | 'instagram' | 'google-youtube' | 'website';

export interface ServicePackage {
  name: string;
  badge?: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  recommendedFor: string;
  isPopular?: boolean;
}

export interface ServiceDetail {
  id: ServiceId;
  title: string;
  subtitle: string;
  shortDesc: string;
  tag: string;
  iconName: string;
  badgeColor: string;
  highlightPoints: string[];
  keyStrategies: {
    title: string;
    description: string;
    icon: string;
  }[];
  expectedEffects: {
    metric: string;
    label: string;
    sublabel: string;
  }[];
  packages: ServicePackage[];
}

export interface CaseStudy {
  id: string;
  category: string;
  clientName: string;
  serviceUsed: string[];
  thumbnailGradient: string;
  beforeMetric: string;
  afterMetric: string;
  growthRate: string;
  title: string;
  summary: string;
  keyAction: string;
  duration: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  details: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: '일반' | '네이버' | 'SNS/영상' | '홈페이지';
}

export interface ConsultationFormData {
  companyName: string;
  contactName: string;
  phone: string;
  email?: string;
  websiteUrl?: string;
  industry: string;
  selectedServices: ServiceId[];
  budgetRange: string;
  inquiryDetails: string;
  agreedToPrivacy: boolean;
}

export interface SubmittedInquiry extends ConsultationFormData {
  id: string;
  submittedAt: string;
  status: '접수완료' | '상담진행중' | '상담완료';
}
