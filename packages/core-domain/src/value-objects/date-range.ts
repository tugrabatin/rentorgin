/**
 * DateRange Value Object
 * Represents a range between two dates
 * 
 * Tarih Aralığı Değer Nesnesi
 * İki tarih arasındaki aralığı temsil eder
 */

export class DateRange {
  constructor(
    public readonly startDate: Date,
    public readonly endDate: Date,
  ) {
    if (endDate < startDate) {
      throw new Error('End date cannot be before start date');
    }
  }

  /**
   * Calculates the duration in days
   * Gün cinsinden süreyi hesaplar
   */
  getDurationInDays(): number {
    const diffTime = Math.abs(this.endDate.getTime() - this.startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Calculates the duration in months (approximate)
   * Ay cinsinden süreyi hesaplar (yaklaşık)
   */
  getDurationInMonths(): number {
    const years = this.endDate.getFullYear() - this.startDate.getFullYear();
    const months = this.endDate.getMonth() - this.startDate.getMonth();
    return years * 12 + months;
  }

  /**
   * Calculates the duration in years (approximate)
   * Yıl cinsinden süreyi hesaplar (yaklaşık)
   */
  getDurationInYears(): number {
    return this.getDurationInMonths() / 12;
  }

  /**
   * Checks if a date falls within this range
   * Bir tarihin bu aralıkta olup olmadığını kontrol eder
   */
  contains(date: Date): boolean {
    return date >= this.startDate && date <= this.endDate;
  }

  /**
   * Checks if this range overlaps with another range
   * Bu aralığın başka bir aralıkla çakışıp çakışmadığını kontrol eder
   */
  overlaps(other: DateRange): boolean {
    return this.startDate <= other.endDate && this.endDate >= other.startDate;
  }

  /**
   * Checks if date is approaching end date within threshold
   * Tarihin, eşik değer içinde bitiş tarihine yaklaşıp yaklaşmadığını kontrol eder
   */
  isNearingEnd(currentDate: Date, daysThreshold: number): boolean {
    const daysRemaining = this.getDaysRemaining(currentDate);
    return daysRemaining >= 0 && daysRemaining <= daysThreshold;
  }

  /**
   * Gets days remaining from current date to end date
   * Mevcut tarihten bitiş tarihine kalan günleri alır
   */
  getDaysRemaining(currentDate: Date): number {
    const diffTime = this.endDate.getTime() - currentDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Checks if the range has expired
   * Aralığın sona erip ermediğini kontrol eder
   */
  isExpired(currentDate: Date): boolean {
    return currentDate > this.endDate;
  }

  /**
   * Checks if the range is active
   * Aralığın aktif olup olmadığını kontrol eder
   */
  isActive(currentDate: Date): boolean {
    return this.contains(currentDate);
  }

  /**
   * Formats the date range for display
   * Tarih aralığını görüntüleme için biçimlendirir
   */
  format(locale: string = 'tr-TR'): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const startStr = this.startDate.toLocaleDateString(locale, options);
    const endStr = this.endDate.toLocaleDateString(locale, options);
    return `${startStr} - ${endStr}`;
  }

  /**
   * Converts to plain object
   * Düz nesneye dönüştürür
   */
  toJSON() {
    return {
      startDate: this.startDate.toISOString(),
      endDate: this.endDate.toISOString(),
    };
  }

  /**
   * Creates DateRange from plain object
   * Düz nesneden DateRange oluşturur
   */
  static fromJSON(json: { startDate: string; endDate: string }): DateRange {
    return new DateRange(new Date(json.startDate), new Date(json.endDate));
  }
}




















