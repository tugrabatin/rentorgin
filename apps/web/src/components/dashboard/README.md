# Dashboard Components

Professional SaaS dashboard components for BASIS - Kiralama Yöneticisi Operations Cockpit.

## Overview

The dashboard has been redesigned into 4 main blocks that provide a comprehensive operations view for leasing managers:

### 1. **Üst Özet Alanı (KPI Row)** - `DashboardKpiRow`
Enhanced KPI cards showing portfolio health metrics:
- **Toplam Mağaza** - Total stores with 30-day trend
- **Aktif Sözleşme** - Active contracts with new additions
- **Bekleyen Gider** - Pending expenses with total amount (₺)
- **AVM Sayısı** - Number of mall partnerships
- **Yaklaşan Yenileme** - Contracts expiring in next 90 days

Each card includes:
- Trend indicators (up/down arrows with values)
- Sub-metrics (contextual information)
- Click-through navigation to filtered views
- Responsive grid (5 cards on desktop, 2 on tablet, 1 on mobile)

### 2. **Operasyon & Zaman Tüneli Bloğu** - `DashboardEventsAndTasks`
Operational timeline and task management:

**Left Panel (2/3 width) - "Yaklaşan Olaylar":**
- Timeline of upcoming operational events
- Event types: Yenileme (renewal), Artış (increase), Açılış (opening), Bakım (maintenance)
- Priority badges: Önemli (high), Normal
- Date, location, and event details
- Scrollable list with max 5 items visible

**Right Panel (1/3 width) - "Bekleyen Görevler":**
- List of open tasks for leasing manager
- Task status: Açık (open), Devam Ediyor (in progress)
- Due dates and locations
- Direct links to relevant sections

### 3. **Analitik & Görselleştirme Bloğu** - `DashboardAnalyticsOverview`
Visual analytics for key performance metrics:

**Left Chart - "Kira ve Ciro – Son 12 Ay":**
- Combined trend chart showing rent (Kira) vs revenue (Ciro)
- Time period filters: 3, 6, 12 months
- Dual-line visualization with monthly data points
- AI insight panel with automated analysis

**Right Chart - "Kira / Ciro Oranı":**
- Rent-to-revenue ratio by region/mall
- Horizontal bar chart with color-coded status
- Status indicators: İyi (good), Orta (medium), Riskli (risk)
- "Dikkat Gereken Lokasyonlar" table showing problematic locations

### 4. **Hızlı Erişim & Kısa Yollar Bloğu** - `DashboardQuickActions`
Task-oriented shortcuts for common operations:
- **Yeni Mağaza / Lokasyon Değerlendirmesi** - Feasibility studies
- **Yaklaşan Yenilemeler** - Contract renewals (90-day filter)
- **Kira İndirimi / Revizyon Talepleri** - Discount negotiations
- **Franchise Projeleri** - Franchise openings and opportunities
- **AI Asistan – Müzakere Desteği** - Negotiation strategy support
- **Çeviri ve Sözleşme İnceleme** - Contract translation and analysis

## Design Principles

All components follow the existing glassmorphic design system:
- Dark theme with glass effects (`glass`, `glass-card`, `glass-light`)
- Consistent rounded corners and shadows
- Color-coded icons with gradient backgrounds
- Smooth hover transitions
- Responsive grid layouts

## Usage

```tsx
import { 
  DashboardKpiRow,
  DashboardEventsAndTasks,
  DashboardAnalyticsOverview,
  DashboardQuickActions
} from '@/components/dashboard';

function DashboardPage() {
  return (
    <div className="space-y-8">
      <DashboardKpiRow />
      <DashboardEventsAndTasks />
      <DashboardAnalyticsOverview />
      <DashboardQuickActions />
    </div>
  );
}
```

## Data Integration

Currently, all components use dummy/realistic data for demonstration. To connect to real data:

1. **KPI Row**: Connect to `/api/v1/analytics/metrics` endpoint
2. **Events & Tasks**: Connect to `/api/v1/leasing-manager/events` and `/api/v1/leasing-manager/tasks`
3. **Analytics**: Connect to `/api/v1/analytics/trends` and `/api/v1/analytics/ratios`
4. **Quick Actions**: Routes are already configured, just need backend filtering

## Responsiveness

- **Desktop (1440px+)**: Full 5-column KPI grid, side-by-side charts
- **Tablet (1024px)**: 2-column KPI grid, stacked charts
- **Mobile (< 768px)**: Single column layout, priority content first

## Future Enhancements

- [ ] Real-time data integration
- [ ] Interactive chart filtering
- [ ] Export capabilities for analytics
- [ ] Task assignment and workflow
- [ ] Customizable KPI selection
- [ ] Advanced charting library (Chart.js, Recharts)
- [ ] Notification system integration
- [ ] Calendar view for events

## Notes

- All UI text is in Turkish as required
- Components are fully typed with TypeScript
- Maintains consistency with existing navigation and layout
- No breaking changes to existing routes or functionality










