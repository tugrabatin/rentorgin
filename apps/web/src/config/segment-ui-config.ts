/**
 * Segment UI Configuration — Frontend Single Source of Truth
 * Adding a new segment? Just add an entry here — nav, dashboard, shortcuts adapt automatically.
 */

// ────────────────────────────────────────────
// Types
// ────────────────────────────────────────────

export interface SegmentModuleConfig {
  id: string;
  visible: boolean;
  priority: number;
}

export interface DashboardCard {
  id: string;
  labelTR: string;
  labelEN: string;
  priority: number;
  icon?: string;
}

export interface OnboardingStep {
  id: string;
  labelTR: string;
  labelEN: string;
  order: number;
}

export interface SegmentUIConfig {
  segment: string;
  modules: SegmentModuleConfig[];
  nav: string[];
  dashboard: DashboardCard[];
  shortcuts: string[];
  onboarding: OnboardingStep[];
  defaults: {
    landingPage: string;
    defaultFilters?: Record<string, unknown>;
  };
}

// ────────────────────────────────────────────
// Helper
// ────────────────────────────────────────────

function m(id: string, visible: boolean, priority: number): SegmentModuleConfig {
  return { id, visible, priority };
}

// ────────────────────────────────────────────
// Per-segment configurations
// ────────────────────────────────────────────

const A1_CONFIG: SegmentUIConfig = {
  segment: 'A1_SOLO_MARKA',
  modules: [
    m('dashboard', true, 1), m('documents', true, 2), m('expenses', true, 3),
    m('budget', true, 4), m('todos', true, 5), m('analytics', true, 6),
    m('stores', true, 7), m('leases', true, 8), m('ai-assistant', true, 9),
    m('malls', false, 99), m('franchise-pipeline', false, 99), m('franchise-audit', false, 99),
    m('franchise-support', false, 99), m('supply-chain', false, 99), m('opening-projects', false, 99),
    m('leasing-manager', false, 99), m('risk', true, 10), m('translation', true, 11),
  ],
  nav: ['dashboard', 'documents', 'expenses', 'budget', 'todos', 'analytics', 'stores', 'risk', 'ai-assistant'],
  dashboard: [
    { id: 'monthly-expense', labelTR: 'Bu ay toplam gider', labelEN: 'Total expenses this month', priority: 1 },
    { id: 'upcoming-payments', labelTR: 'Yaklaşan ödeme/tarih', labelEN: 'Upcoming payments', priority: 2 },
    { id: 'missing-docs', labelTR: 'Eksik evrak sayısı', labelEN: 'Missing documents', priority: 3 },
    { id: 'todos', labelTR: 'Yapılacaklar', labelEN: 'Todos', priority: 4 },
  ],
  shortcuts: ['add-expense', 'upload-document', 'create-todo'],
  onboarding: [
    { id: 'upload-docs', labelTR: 'İlk evraklarınızı yükleyin', labelEN: 'Upload your first documents', order: 1 },
    { id: 'add-expense', labelTR: 'İlk gider kaydını oluşturun', labelEN: 'Create your first expense', order: 2 },
    { id: 'setup-budget', labelTR: 'Bütçe hedefi belirleyin', labelEN: 'Set a budget target', order: 3 },
  ],
  defaults: { landingPage: '/dashboard' },
};

const A2_CONFIG: SegmentUIConfig = {
  segment: 'A2_KENDI_ZINCIRI',
  modules: [
    m('dashboard', true, 1), m('stores', true, 2), m('leases', true, 3),
    m('malls', true, 4), m('opening-projects', true, 5), m('expenses', true, 6),
    m('budget', true, 7), m('analytics', true, 8), m('risk', true, 9),
    m('leasing-manager', true, 10), m('ai-assistant', true, 11), m('translation', true, 12),
    m('documents', true, 13), m('franchise-pipeline', false, 99), m('franchise-audit', false, 99),
    m('franchise-support', false, 99), m('supply-chain', false, 99), m('todos', true, 14),
  ],
  nav: ['dashboard', 'stores', 'leases', 'malls', 'opening-projects', 'expenses', 'budget', 'analytics', 'risk', 'leasing-manager', 'ai-assistant'],
  dashboard: [
    { id: 'upcoming-renewals', labelTR: 'Yaklaşan yenilemeler', labelEN: 'Upcoming renewals', priority: 1 },
    { id: 'region-summary', labelTR: 'Bölge bazlı özet', labelEN: 'Regional summary', priority: 2 },
    { id: 'budget-deviation', labelTR: 'Bütçe sapması', labelEN: 'Budget deviation', priority: 3 },
    { id: 'opening-status', labelTR: 'Açılışlarda durum', labelEN: 'Opening status', priority: 4 },
  ],
  shortcuts: ['add-store', 'create-lease', 'view-renewals', 'create-opening-project'],
  onboarding: [
    { id: 'add-store', labelTR: 'İlk mağazanızı ekleyin', labelEN: 'Add your first store', order: 1 },
    { id: 'create-lease', labelTR: 'Sözleşme oluşturun', labelEN: 'Create a lease', order: 2 },
    { id: 'setup-budget', labelTR: 'Bütçe hedefi belirleyin', labelEN: 'Set a budget target', order: 3 },
    { id: 'opening-project', labelTR: 'Açılış projesi oluşturun', labelEN: 'Create an opening project', order: 4 },
  ],
  defaults: { landingPage: '/dashboard' },
};

const A3_CONFIG: SegmentUIConfig = {
  segment: 'A3_FRANCHISE_ALAN',
  modules: [
    m('dashboard', true, 1), m('opening-projects', true, 2), m('documents', true, 3),
    m('franchise-support', true, 4), m('analytics', true, 5), m('expenses', true, 6),
    m('stores', true, 7), m('ai-assistant', true, 8), m('leases', true, 9),
    m('malls', false, 99), m('franchise-pipeline', false, 99), m('franchise-audit', false, 99),
    m('supply-chain', false, 99), m('leasing-manager', false, 99), m('budget', true, 10),
    m('risk', false, 99), m('translation', true, 11), m('todos', true, 12),
  ],
  nav: ['dashboard', 'opening-projects', 'documents', 'franchise-support', 'analytics', 'expenses', 'stores', 'ai-assistant'],
  dashboard: [
    { id: 'opening-steps', labelTR: 'Açılış adımları', labelEN: 'Opening steps', priority: 1 },
    { id: 'pending-docs', labelTR: 'Bekleyen evrak', labelEN: 'Pending documents', priority: 2 },
    { id: 'open-support-tickets', labelTR: 'Açık destek talepleri', labelEN: 'Open support tickets', priority: 3 },
    { id: 'performance-summary', labelTR: 'Performans özeti', labelEN: 'Performance summary', priority: 4 },
  ],
  shortcuts: ['view-checklist', 'upload-document', 'create-support-ticket'],
  onboarding: [
    { id: 'review-checklist', labelTR: 'Açılış listesini inceleyin', labelEN: 'Review opening checklist', order: 1 },
    { id: 'upload-docs', labelTR: 'Evraklarınızı yükleyin', labelEN: 'Upload your documents', order: 2 },
    { id: 'create-ticket', labelTR: 'İlk destek talebinizi oluşturun', labelEN: 'Create your first support ticket', order: 3 },
  ],
  defaults: { landingPage: '/dashboard' },
};

const A4_CONFIG: SegmentUIConfig = {
  segment: 'A4_FRANCHISE_ALAN_TEDARIK_ZORUNLU',
  modules: [
    ...A3_CONFIG.modules.filter((mod) => mod.id !== 'supply-chain'),
    m('supply-chain', true, 3),
  ],
  nav: ['dashboard', 'opening-projects', 'supply-chain', 'documents', 'franchise-support', 'analytics', 'expenses', 'stores', 'ai-assistant'],
  dashboard: [
    ...A3_CONFIG.dashboard,
    { id: 'noncompliant-products', labelTR: 'Eksik/uygunsuz ürün', labelEN: 'Non-compliant products', priority: 5 },
    { id: 'pending-deliveries', labelTR: 'Bekleyen teslimatlar', labelEN: 'Pending deliveries', priority: 6 },
    { id: 'supply-cost-impact', labelTR: 'Tedarik maliyeti etkisi', labelEN: 'Supply cost impact', priority: 7 },
  ],
  shortcuts: [...A3_CONFIG.shortcuts, 'view-supply-orders', 'check-compliance'],
  onboarding: [
    ...A3_CONFIG.onboarding,
    { id: 'review-supply', labelTR: 'Zorunlu ürün listesini inceleyin', labelEN: 'Review mandatory product list', order: 4 },
  ],
  defaults: { landingPage: '/dashboard' },
};

const A5_CONFIG: SegmentUIConfig = {
  segment: 'A5_FRANCHISE_VEREN',
  modules: [
    m('dashboard', true, 1), m('franchise-pipeline', true, 2), m('leases', true, 3),
    m('opening-projects', true, 4), m('franchise-audit', true, 5), m('franchise-support', true, 6),
    m('stores', true, 7), m('analytics', true, 8), m('expenses', true, 9),
    m('budget', true, 10), m('risk', true, 11), m('ai-assistant', true, 12),
    m('leasing-manager', true, 13), m('malls', true, 14), m('documents', true, 15),
    m('translation', true, 16), m('supply-chain', false, 99), m('todos', true, 17),
  ],
  nav: ['dashboard', 'franchise-pipeline', 'leases', 'opening-projects', 'franchise-audit', 'franchise-support', 'stores', 'analytics', 'risk', 'ai-assistant'],
  dashboard: [
    { id: 'pipeline-status', labelTR: 'Pipeline durumu', labelEN: 'Pipeline status', priority: 1 },
    { id: 'pending-openings', labelTR: 'Onay bekleyen açılışlar', labelEN: 'Pending opening approvals', priority: 2 },
    { id: 'audit-findings', labelTR: 'Denetim bulguları', labelEN: 'Audit findings', priority: 3 },
    { id: 'network-performance', labelTR: 'Ağ performansı', labelEN: 'Network performance', priority: 4 },
  ],
  shortcuts: ['view-pipeline', 'approve-opening', 'create-audit', 'view-support'],
  onboarding: [
    { id: 'setup-pipeline', labelTR: 'Aday pipeline kurun', labelEN: 'Set up candidate pipeline', order: 1 },
    { id: 'create-contract-template', labelTR: 'Sözleşme şablonu oluşturun', labelEN: 'Create contract template', order: 2 },
    { id: 'setup-audit', labelTR: 'Denetim kriterlerini tanımlayın', labelEN: 'Define audit criteria', order: 3 },
  ],
  defaults: { landingPage: '/dashboard' },
};

const A6_CONFIG: SegmentUIConfig = {
  segment: 'A6_FRANCHISE_VEREN_TEDARIK_ZORUNLU',
  modules: [
    ...A5_CONFIG.modules.filter((mod) => mod.id !== 'supply-chain'),
    m('supply-chain', true, 5),
  ],
  nav: ['dashboard', 'franchise-pipeline', 'leases', 'opening-projects', 'supply-chain', 'franchise-audit', 'franchise-support', 'stores', 'analytics', 'risk', 'ai-assistant'],
  dashboard: [
    ...A5_CONFIG.dashboard,
    { id: 'supply-compliance', labelTR: 'Tedarik uyumu', labelEN: 'Supply compliance', priority: 5 },
    { id: 'supply-revenue', labelTR: 'Tedarik gelirleri', labelEN: 'Supply revenue', priority: 6 },
    { id: 'risky-franchisees', labelTR: 'Riskli franchisee\'ler', labelEN: 'Risky franchisees', priority: 7 },
  ],
  shortcuts: [...A5_CONFIG.shortcuts, 'manage-supply-rules', 'view-compliance-dashboard'],
  onboarding: [
    ...A5_CONFIG.onboarding,
    { id: 'setup-supply-rules', labelTR: 'Tedarik kurallarını tanımlayın', labelEN: 'Define supply rules', order: 4 },
  ],
  defaults: { landingPage: '/dashboard' },
};

// ────────────────────────────────────────────
// Registry & lookup
// ────────────────────────────────────────────

const SEGMENT_UI_CONFIGS: Record<string, SegmentUIConfig> = {
  A1_SOLO_MARKA: A1_CONFIG,
  A2_KENDI_ZINCIRI: A2_CONFIG,
  A3_FRANCHISE_ALAN: A3_CONFIG,
  A4_FRANCHISE_ALAN_TEDARIK_ZORUNLU: A4_CONFIG,
  A5_FRANCHISE_VEREN: A5_CONFIG,
  A6_FRANCHISE_VEREN_TEDARIK_ZORUNLU: A6_CONFIG,
};

/**
 * Build the full UI context from a segment string.
 * Falls back to A1_SOLO_MARKA if the segment is unknown.
 */
export function buildUIContext(segment: string): SegmentUIConfig {
  return SEGMENT_UI_CONFIGS[segment] ?? SEGMENT_UI_CONFIGS.A1_SOLO_MARKA;
}
