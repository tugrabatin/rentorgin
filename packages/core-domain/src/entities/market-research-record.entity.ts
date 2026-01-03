/**
 * Market Research Record Entity
 * Represents a market research data point for competitive analysis
 * 
 * Pazar Araştırması Kaydı Varlığı
 * Rekabet analizi için bir pazar araştırması veri noktasını temsil eder
 */

export interface IMarketResearchRecord {
  id: string;
  tenantId: string;
  
  // Location
  region?: string;
  city?: string;
  district?: string;
  mallId?: string;
  
  // Competitor Data
  competitorName?: string;
  competitorType?: string;
  
  // Rent & Market Data
  rentLevel?: number;
  marketShare?: number;
  footTraffic?: number;
  
  // Analysis
  notes?: string;
  dataSource?: string;
  
  // Date
  recordDate: Date;
  
  // Audit
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
}

export class MarketResearchRecordEntity implements IMarketResearchRecord {
  constructor(
    public id: string,
    public tenantId: string,
    public recordDate: Date,
    public createdById: string,
    public createdAt: Date,
    public updatedAt: Date,
    public region?: string,
    public city?: string,
    public district?: string,
    public mallId?: string,
    public competitorName?: string,
    public competitorType?: string,
    public rentLevel?: number,
    public marketShare?: number,
    public footTraffic?: number,
    public notes?: string,
    public dataSource?: string,
  ) {}

  /**
   * Checks if record has location data
   * Kaydın konum verisi olup olmadığını kontrol eder
   */
  hasLocationData(): boolean {
    return !!(this.region || this.city || this.district || this.mallId);
  }

  /**
   * Checks if record has competitor data
   * Kaydın rakip verisi olup olmadığını kontrol eder
   */
  hasCompetitorData(): boolean {
    return !!this.competitorName;
  }

  /**
   * Checks if record has financial data
   * Kaydın finansal veri olup olmadığını kontrol eder
   */
  hasFinancialData(): boolean {
    return this.rentLevel !== undefined && this.rentLevel !== null;
  }

  /**
   * Gets age of record in days
   * Kaydın yaşını gün olarak alır
   */
  getAgeInDays(currentDate: Date = new Date()): number {
    const diffTime = Math.abs(currentDate.getTime() - this.recordDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Checks if record is recent (less than 30 days old)
   * Kaydın güncel olup olmadığını kontrol eder (30 günden yeni)
   */
  isRecent(currentDate: Date = new Date(), daysThreshold: number = 30): boolean {
    return this.getAgeInDays(currentDate) <= daysThreshold;
  }

  /**
   * Gets full location string
   * Tam konum dizesini alır
   */
  getFullLocation(): string {
    const parts: string[] = [];
    if (this.district) parts.push(this.district);
    if (this.city) parts.push(this.city);
    if (this.region) parts.push(this.region);
    return parts.join(', ') || 'Unknown Location';
  }

  /**
   * Converts to plain object
   * Düz nesneye dönüştürür
   */
  toJSON() {
    return {
      id: this.id,
      tenantId: this.tenantId,
      region: this.region,
      city: this.city,
      district: this.district,
      mallId: this.mallId,
      competitorName: this.competitorName,
      competitorType: this.competitorType,
      rentLevel: this.rentLevel,
      marketShare: this.marketShare,
      footTraffic: this.footTraffic,
      notes: this.notes,
      dataSource: this.dataSource,
      recordDate: this.recordDate.toISOString(),
      createdById: this.createdById,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}
