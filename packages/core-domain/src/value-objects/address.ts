/**
 * Address Value Object
 * Represents a physical address
 * 
 * Adres Değer Nesnesi
 * Fiziksel bir adresi temsil eder
 */

export class Address {
  constructor(
    public readonly country: string,
    public readonly city: string,
    public readonly district: string | null,
    public readonly addressLine: string,
    public readonly postalCode?: string,
  ) {
    if (!country || country.trim().length === 0) {
      throw new Error('Country is required');
    }
    if (!city || city.trim().length === 0) {
      throw new Error('City is required');
    }
    if (!addressLine || addressLine.trim().length === 0) {
      throw new Error('Address line is required');
    }
  }

  /**
   * Formats the address for display
   * Adresi görüntüleme için biçimlendirir
   */
  format(): string {
    const parts = [this.addressLine];
    
    if (this.district) {
      parts.push(this.district);
    }
    
    parts.push(this.city);
    
    if (this.postalCode) {
      parts.push(this.postalCode);
    }
    
    parts.push(this.country);
    
    return parts.join(', ');
  }

  /**
   * Checks if two addresses are equal
   * İki adresin eşit olup olmadığını kontrol eder
   */
  equals(other: Address): boolean {
    return (
      this.country === other.country &&
      this.city === other.city &&
      this.district === other.district &&
      this.addressLine === other.addressLine &&
      this.postalCode === other.postalCode
    );
  }

  /**
   * Checks if address is in the same city as another address
   * Adresin başka bir adresle aynı şehirde olup olmadığını kontrol eder
   */
  isSameCity(other: Address): boolean {
    return this.country === other.country && this.city === other.city;
  }

  /**
   * Converts to plain object
   * Düz nesneye dönüştürür
   */
  toJSON() {
    return {
      country: this.country,
      city: this.city,
      district: this.district,
      addressLine: this.addressLine,
      postalCode: this.postalCode,
    };
  }

  /**
   * Creates Address from plain object
   * Düz nesneden Address oluşturur
   */
  static fromJSON(json: {
    country: string;
    city: string;
    district: string | null;
    addressLine: string;
    postalCode?: string;
  }): Address {
    return new Address(
      json.country,
      json.city,
      json.district,
      json.addressLine,
      json.postalCode,
    );
  }
}




















