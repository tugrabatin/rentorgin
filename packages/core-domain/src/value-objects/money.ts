/**
 * Money Value Object
 * Represents a monetary value with currency
 * 
 * Para Değer Nesnesi
 * Para birimi ile birlikte parasal değeri temsil eder
 */

export class Money {
  constructor(
    public readonly amount: number,
    public readonly currency: string = 'TRY',
  ) {
    if (amount < 0) {
      throw new Error('Amount cannot be negative');
    }
    if (!currency || currency.length !== 3) {
      throw new Error('Currency must be a 3-letter code');
    }
  }

  /**
   * Adds two Money values (must be same currency)
   * İki Money değerini toplar (aynı para birimi olmalı)
   */
  add(other: Money): Money {
    this.ensureSameCurrency(other);
    return new Money(this.amount + other.amount, this.currency);
  }

  /**
   * Subtracts two Money values (must be same currency)
   * İki Money değerini çıkarır (aynı para birimi olmalı)
   */
  subtract(other: Money): Money {
    this.ensureSameCurrency(other);
    return new Money(this.amount - other.amount, this.currency);
  }

  /**
   * Multiplies by a scalar value
   * Skaler değer ile çarpar
   */
  multiply(multiplier: number): Money {
    return new Money(this.amount * multiplier, this.currency);
  }

  /**
   * Divides by a scalar value
   * Skaler değere böler
   */
  divide(divisor: number): Money {
    if (divisor === 0) {
      throw new Error('Cannot divide by zero');
    }
    return new Money(this.amount / divisor, this.currency);
  }

  /**
   * Checks if two Money values are equal
   * İki Money değerinin eşit olup olmadığını kontrol eder
   */
  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }

  /**
   * Compares two Money values (must be same currency)
   * İki Money değerini karşılaştırır (aynı para birimi olmalı)
   */
  isGreaterThan(other: Money): boolean {
    this.ensureSameCurrency(other);
    return this.amount > other.amount;
  }

  isLessThan(other: Money): boolean {
    this.ensureSameCurrency(other);
    return this.amount < other.amount;
  }

  /**
   * Formats the money value for display
   * Para değerini görüntüleme için biçimlendirir
   */
  format(locale: string = 'tr-TR'): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: this.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(this.amount);
  }

  /**
   * Converts to plain object
   * Düz nesneye dönüştürür
   */
  toJSON() {
    return {
      amount: this.amount,
      currency: this.currency,
    };
  }

  /**
   * Creates Money from plain object
   * Düz nesneden Money oluşturur
   */
  static fromJSON(json: { amount: number; currency: string }): Money {
    return new Money(json.amount, json.currency);
  }

  private ensureSameCurrency(other: Money): void {
    if (this.currency !== other.currency) {
      throw new Error(
        `Currency mismatch: ${this.currency} vs ${other.currency}`,
      );
    }
  }
}


















