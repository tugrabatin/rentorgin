/**
 * Mall Entity
 * Represents a shopping mall or property
 * 
 * AVM Varlığı
 * Bir alışveriş merkezini veya mülkü temsil eder
 */

import { MallType, RelationshipQuality } from '../enums';
import { Address } from '../value-objects/address';

export interface IMall {
  id: string;
  tenantId: string;
  
  // Basic Info
  name: string;
  type: MallType;
  
  // Location
  address: Address;
  
  // Management
  managementCompany?: string;
  relationshipQuality: RelationshipQuality;
  
  // Audit
  createdAt: Date;
  updatedAt: Date;
}

export class MallEntity implements IMall {
  constructor(
    public id: string,
    public tenantId: string,
    public name: string,
    public type: MallType,
    public address: Address,
    public relationshipQuality: RelationshipQuality,
    public createdAt: Date,
    public updatedAt: Date,
    public managementCompany?: string,
  ) {}

  /**
   * Checks if relationship is good or excellent
   * İlişkinin iyi veya mükemmel olup olmadığını kontrol eder
   */
  hasGoodRelationship(): boolean {
    return (
      this.relationshipQuality === RelationshipQuality.GOOD ||
      this.relationshipQuality === RelationshipQuality.EXCELLENT
    );
  }

  /**
   * Checks if relationship needs attention
   * İlişkinin dikkat gerektirip gerektirmediğini kontrol eder
   */
  needsAttention(): boolean {
    return (
      this.relationshipQuality === RelationshipQuality.POOR ||
      this.relationshipQuality === RelationshipQuality.FAIR
    );
  }

  /**
   * Updates relationship quality
   * İlişki kalitesini günceller
   */
  updateRelationshipQuality(newQuality: RelationshipQuality): void {
    this.relationshipQuality = newQuality;
    this.updatedAt = new Date();
  }

  /**
   * Converts to plain object
   * Düz nesneye dönüştürür
   */
  toJSON() {
    return {
      id: this.id,
      tenantId: this.tenantId,
      name: this.name,
      type: this.type,
      address: this.address.toJSON(),
      managementCompany: this.managementCompany,
      relationshipQuality: this.relationshipQuality,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}


















