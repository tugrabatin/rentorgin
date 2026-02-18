/**
 * Domain Constants
 * Business rules and configuration constants
 * 
 * Domain Sabitleri
 * İş kuralları ve yapılandırma sabitleri
 */

// Lease Management Constants
export const LEASE_CONSTANTS = {
  DEFAULT_RENEWAL_NOTICE_MONTHS: 3,
  EXPIRING_SOON_THRESHOLD_DAYS: 90,
  MAX_LEASE_DURATION_YEARS: 15,
  MIN_LEASE_DURATION_MONTHS: 12,
} as const;

// Financial Thresholds
export const FINANCIAL_THRESHOLDS = {
  // Rent-to-revenue ratio thresholds (%)
  EXCELLENT_RATIO: 15,
  GOOD_RATIO: 20,
  ACCEPTABLE_RATIO: 25,
  WARNING_RATIO: 30,
  CRITICAL_RATIO: 35,
  
  // Revenue per sqm thresholds (TRY)
  HIGH_REVENUE_PER_SQM: 2000,
  MEDIUM_REVENUE_PER_SQM: 1000,
  LOW_REVENUE_PER_SQM: 500,
} as const;

// Performance Scoring
export const PERFORMANCE_SCORING = {
  WEIGHTS: {
    RENT_TO_REVENUE: 0.35,
    REVENUE_PER_SQM: 0.25,
    PROFIT_MARGIN: 0.20,
    FOOT_TRAFFIC_CONVERSION: 0.15,
    GROWTH_TREND: 0.05,
  },
  
  SCORE_RANGES: {
    EXCELLENT: { min: 80, max: 100 },
    GOOD: { min: 60, max: 79 },
    ACCEPTABLE: { min: 40, max: 59 },
    POOR: { min: 0, max: 39 },
  },
} as const;

// Translation Engine
export const TRANSLATION_CONSTANTS = {
  DEFAULT_SEGMENT_SIZE_WORDS: 500,
  CONTEXT_OVERLAP_WORDS: 50,
  MAX_LENGTH_DIFFERENCE_PERCENT: 10,
  MIN_QUALITY_SCORE: 70,
} as const;

// AI Assistant
export const AI_CONSTANTS = {
  DEFAULT_MODEL: 'gpt-4-turbo-preview',
  MAX_TOKENS: 4000,
  TEMPERATURE: 0.7,
  TOP_P: 0.9,
} as const;

// File Upload
export const FILE_UPLOAD_CONSTANTS = {
  MAX_FILE_SIZE_MB: 50,
  ALLOWED_CONTRACT_FORMATS: ['pdf', 'docx', 'doc'],
  ALLOWED_IMAGE_FORMATS: ['jpg', 'jpeg', 'png', 'webp'],
} as const;

// Currencies
export const SUPPORTED_CURRENCIES = ['TRY', 'USD', 'EUR', 'GBP'] as const;

// Languages
export const SUPPORTED_LANGUAGES = ['tr', 'en'] as const;

// Customer Segment Definitions
export const CUSTOMER_SEGMENT_DEFINITIONS = {
  A1_SOLO_MARKA: {
    id: 'A1_SOLO_MARKA',
    code: 'A1',
    labelTR: 'SoloMarka (Tek Şube Marka)',
    labelEN: 'SoloBrand (Single Branch Brand)',
    descriptionTR: 'Tek mağazası var, henüz şubeleşmedi. Erken düzen müşterisi.',
    descriptionEN: 'Single store, not yet branched. Early-stage organization customer.',
    focusTR: 'Evrak, gider, tedarik, yapılacaklar — erken düzen.',
    focusEN: 'Documents, expenses, supply, todos — early organization.',
  },
  A2_KENDI_ZINCIRI: {
    id: 'A2_KENDI_ZINCIRI',
    code: 'A2',
    labelTR: 'KendiZinciri (Kendi Sermayesiyle Şubeleşen)',
    labelEN: 'OwnChain (Self-funded Multi-Branch)',
    descriptionTR: 'Franchise vermeden, kendi mağazalarıyla büyüyen marka.',
    descriptionEN: 'Brand growing with its own stores without franchising.',
    focusTR: 'Kira sözleşmeleri, kritik tarihler, AVM süreçleri, açılış projeleri.',
    focusEN: 'Lease contracts, critical dates, mall processes, opening projects.',
  },
  A3_FRANCHISE_ALAN: {
    id: 'A3_FRANCHISE_ALAN',
    code: 'A3',
    labelTR: 'FranchiseAlan (Bağımsız İşletmeci)',
    labelEN: 'Franchisee (Independent Operator)',
    descriptionTR: 'Bir markanın franchise\'ını alıp mağaza işletiyor.',
    descriptionEN: 'Operates a store under a brand\'s franchise.',
    focusTR: 'Açılış süreci, evrak düzeni, destek talepleri, performans takibi.',
    focusEN: 'Opening process, document management, support requests, performance tracking.',
  },
  A4_FRANCHISE_ALAN_TEDARIK_ZORUNLU: {
    id: 'A4_FRANCHISE_ALAN_TEDARIK_ZORUNLU',
    code: 'A4',
    labelTR: 'FranchiseAlan-TedarikZorunlu (Bağlı Tedarik)',
    labelEN: 'Franchisee-MandatorySupply (Tied Supply)',
    descriptionTR: 'Franchise alan ama malzemeyi markadan almak zorunda.',
    descriptionEN: 'Franchisee required to purchase supplies from the brand.',
    focusTR: 'Zorunlu ürün listeleri, sipariş/teslimat, uygunluk, maliyet etkisi.',
    focusEN: 'Mandatory product lists, order/delivery, compliance, cost impact.',
  },
  A5_FRANCHISE_VEREN: {
    id: 'A5_FRANCHISE_VEREN',
    code: 'A5',
    labelTR: 'FranchiseVeren (Ağ Kurucu Marka)',
    labelEN: 'Franchisor (Network Builder Brand)',
    descriptionTR: 'Franchise vererek büyüyen marka.',
    descriptionEN: 'Brand growing by granting franchises.',
    focusTR: 'Aday pipeline, sözleşme süreçleri, açılış onayları, denetim, destek.',
    focusEN: 'Candidate pipeline, contract processes, opening approvals, audit, support.',
  },
  A6_FRANCHISE_VEREN_TEDARIK_ZORUNLU: {
    id: 'A6_FRANCHISE_VEREN_TEDARIK_ZORUNLU',
    code: 'A6',
    labelTR: 'FranchiseVeren-TedarikZorunlu (Kontrollü Tedarik)',
    labelEN: 'Franchisor-MandatorySupply (Controlled Supply)',
    descriptionTR: 'Franchise veriyor ve franchisee\'yi kendi tedarikine bağlıyor.',
    descriptionEN: 'Grants franchises and ties franchisees to own supply chain.',
    focusTR: 'Uyum takibi + tedarik kuralları + gelir/kârlılık optimizasyonu.',
    focusEN: 'Compliance tracking + supply rules + revenue/profitability optimization.',
  },
} as const;

export type CustomerSegmentId = keyof typeof CUSTOMER_SEGMENT_DEFINITIONS;

// Application Version
export const APP_VERSION = '0.1.0';




















