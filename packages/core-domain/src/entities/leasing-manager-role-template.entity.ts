/**
 * Leasing Manager Role Template Entity
 * Represents a template for leasing manager job definitions
 * 
 * Kiralama Yöneticisi Rol Şablonu Varlığı
 * Kiralama yöneticisi iş tanımları için şablonu temsil eder
 */

import { SeniorityLevel } from '../enums';

export interface ILeasingManagerRoleTemplate {
  id: string;
  
  // Role Definition
  nameTR: string;
  nameEN: string;
  descriptionTR?: string;
  descriptionEN?: string;
  
  // Core Responsibilities
  coreResponsibilities: string[];
  
  // Core Skills
  coreSkills: string[];
  
  // Applicable Sectors
  sectors: string[];
  seniorityLevel: SeniorityLevel;
  
  // Metadata
  isDefault: boolean;
  isActive: boolean;
  
  // Audit
  createdAt: Date;
  updatedAt: Date;
}

export class LeasingManagerRoleTemplateEntity implements ILeasingManagerRoleTemplate {
  constructor(
    public id: string,
    public nameTR: string,
    public nameEN: string,
    public coreResponsibilities: string[],
    public coreSkills: string[],
    public sectors: string[],
    public seniorityLevel: SeniorityLevel,
    public isDefault: boolean,
    public isActive: boolean,
    public createdAt: Date,
    public updatedAt: Date,
    public descriptionTR?: string,
    public descriptionEN?: string,
  ) {}

  /**
   * Checks if this is the default template
   * Bu şablonun varsayılan olup olmadığını kontrol eder
   */
  isDefaultTemplate(): boolean {
    return this.isDefault;
  }

  /**
   * Checks if template is active
   * Şablonun aktif olup olmadığını kontrol eder
   */
  isActiveTemplate(): boolean {
    return this.isActive;
  }

  /**
   * Gets total number of responsibilities
   * Toplam sorumluluk sayısını alır
   */
  getTotalResponsibilities(): number {
    return this.coreResponsibilities.length;
  }

  /**
   * Gets total number of skills
   * Toplam yetkinlik sayısını alır
   */
  getTotalSkills(): number {
    return this.coreSkills.length;
  }

  /**
   * Deactivates the template
   * Şablonu devre dışı bırakır
   */
  deactivate(): void {
    this.isActive = false;
    this.updatedAt = new Date();
  }

  /**
   * Activates the template
   * Şablonu aktif eder
   */
  activate(): void {
    this.isActive = true;
    this.updatedAt = new Date();
  }

  /**
   * Converts to plain object
   * Düz nesneye dönüştürür
   */
  toJSON() {
    return {
      id: this.id,
      nameTR: this.nameTR,
      nameEN: this.nameEN,
      descriptionTR: this.descriptionTR,
      descriptionEN: this.descriptionEN,
      coreResponsibilities: this.coreResponsibilities,
      coreSkills: this.coreSkills,
      sectors: this.sectors,
      seniorityLevel: this.seniorityLevel,
      isDefault: this.isDefault,
      isActive: this.isActive,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}
