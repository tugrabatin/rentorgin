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

// Application Version
export const APP_VERSION = '0.1.0';


















