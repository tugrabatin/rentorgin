/**
 * Domain Enums
 * Centralized enumerations used across the application
 * 
 * Domain Enumları
 * Uygulama genelinde kullanılan merkezi enum'lar
 */

// Store Status
export enum StoreStatus {
  PLANNING = 'PLANNING',
  ACTIVE = 'ACTIVE',
  RENOVATION = 'RENOVATION',
  CLOSING = 'CLOSING',
  CLOSED = 'CLOSED',
}

// Lease Status
export enum LeaseStatus {
  DRAFT = 'DRAFT',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  ACTIVE = 'ACTIVE',
  EXPIRING_SOON = 'EXPIRING_SOON',
  EXPIRED = 'EXPIRED',
  RENEWED = 'RENEWED',
  TERMINATED = 'TERMINATED',
  CANCELLED = 'CANCELLED',
}

// Escalation Type
export enum EscalationType {
  NONE = 'NONE',
  FIXED_PERCENTAGE = 'FIXED_PERCENTAGE',
  INDEX_BASED = 'INDEX_BASED',
  REVENUE_BASED = 'REVENUE_BASED',
  CUSTOM = 'CUSTOM',
}

// Mall Type
export enum MallType {
  SHOPPING_MALL = 'SHOPPING_MALL',
  OUTLET = 'OUTLET',
  STREET_RETAIL = 'STREET_RETAIL',
  AIRPORT = 'AIRPORT',
  STATION = 'STATION',
  MIXED_USE = 'MIXED_USE',
}

// Performance Recommendation
export enum PerformanceRecommendation {
  CONTINUE = 'CONTINUE',
  MONITOR = 'MONITOR',
  RENEGOTIATE = 'RENEGOTIATE',
  DOWNSIZE = 'DOWNSIZE',
  RELOCATE = 'RELOCATE',
  CLOSE = 'CLOSE',
}

// Expense Type
export enum ExpenseType {
  RENT = 'RENT',
  COMMON_AREA_CHARGE = 'COMMON_AREA_CHARGE',
  UTILITY = 'UTILITY',
  MAINTENANCE = 'MAINTENANCE',
  INSURANCE = 'INSURANCE',
  TAX = 'TAX',
  MARKETING_FEE = 'MARKETING_FEE',
  OTHER = 'OTHER',
}

// Expense Status
export enum ExpenseStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  DISPUTED = 'DISPUTED',
  CANCELLED = 'CANCELLED',
}

// Risk Level
export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

// User Role
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER',
  VIEWER = 'VIEWER',
}

// ============================================================
// LEASING MANAGER MODULE ENUMS
// Kiralama Yöneticisi Modülü Enumları
// ============================================================

// Seniority Level
export enum SeniorityLevel {
  ENTRY = 'ENTRY',
  MID = 'MID',
  SENIOR = 'SENIOR',
  LEAD = 'LEAD',
  DIRECTOR = 'DIRECTOR',
}

// Leasing Task Category
export enum LeasingTaskCategory {
  CONTRACT_NEGOTIATION = 'CONTRACT_NEGOTIATION',
  CONTRACT_RENEWAL = 'CONTRACT_RENEWAL',
  MAINTENANCE = 'MAINTENANCE',
  BUDGET_TRACKING = 'BUDGET_TRACKING',
  FRANCHISE_DEVELOPMENT = 'FRANCHISE_DEVELOPMENT',
  MARKET_RESEARCH = 'MARKET_RESEARCH',
  COMPLIANCE = 'COMPLIANCE',
  TENANT_RELATIONS = 'TENANT_RELATIONS',
  SPACE_MANAGEMENT = 'SPACE_MANAGEMENT',
  REPORTING = 'REPORTING',
  OTHER = 'OTHER',
}

// Task Priority
export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

// Task Status
export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  ON_HOLD = 'ON_HOLD',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

// Franchise Project Status
export enum FranchiseProjectStatus {
  PIPELINE = 'PIPELINE',
  EVALUATION = 'EVALUATION',
  FEASIBILITY_STUDY = 'FEASIBILITY_STUDY',
  APPROVED = 'APPROVED',
  IN_CONSTRUCTION = 'IN_CONSTRUCTION',
  OPENED = 'OPENED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

// Leasing Request Type
export enum LeasingRequestType {
  RENT_REDUCTION = 'RENT_REDUCTION',
  LEASE_EXTENSION = 'LEASE_EXTENSION',
  CONTRACT_REVISION = 'CONTRACT_REVISION',
  ADDITIONAL_SPACE = 'ADDITIONAL_SPACE',
  SPACE_REDUCTION = 'SPACE_REDUCTION',
  COMPLAINT = 'COMPLAINT',
  FRANCHISE_INQUIRY = 'FRANCHISE_INQUIRY',
  RENEWAL_REQUEST = 'RENEWAL_REQUEST',
  EARLY_TERMINATION = 'EARLY_TERMINATION',
  MAINTENANCE_REQUEST = 'MAINTENANCE_REQUEST',
  DOCUMENT_REQUEST = 'DOCUMENT_REQUEST',
  OTHER = 'OTHER',
}

// Request Source
export enum RequestSource {
  TENANT = 'TENANT',
  LANDLORD = 'LANDLORD',
  INTERNAL = 'INTERNAL',
  FRANCHISE_CANDIDATE = 'FRANCHISE_CANDIDATE',
  LEGAL_DEPT = 'LEGAL_DEPT',
  FINANCE_DEPT = 'FINANCE_DEPT',
}

// Request Status
export enum RequestStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  PENDING_INFO = 'PENDING_INFO',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}










