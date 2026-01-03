/**
 * Job Description Template Entity
 * Represents a job description template for leasing manager positions
 * 
 * İş Tanımı Şablonu Varlığı
 * Kiralama yöneticisi pozisyonları için iş tanımı şablonunu temsil eder
 */

import { SeniorityLevel } from '../enums';

export interface IJobDescriptionTemplate {
  id: string;
  tenantId: string;
  
  // Role Definition
  roleNameTR: string;
  roleNameEN: string;
  summaryTR?: string;
  summaryEN?: string;
  
  // Responsibilities
  responsibilitiesTR: string[];
  responsibilitiesEN: string[];
  
  // Skills & Requirements
  skillsTR: string[];
  skillsEN: string[];
  
  // Additional Info
  sectors: string[];
  seniorityLevel: SeniorityLevel;
  
  // Context
  companyContext?: string;
  
  // Metadata
  isTemplate: boolean;
  isPublished: boolean;
  
  // Audit
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
}

export class JobDescriptionTemplateEntity implements IJobDescriptionTemplate {
  constructor(
    public id: string,
    public tenantId: string,
    public roleNameTR: string,
    public roleNameEN: string,
    public responsibilitiesTR: string[],
    public responsibilitiesEN: string[],
    public skillsTR: string[],
    public skillsEN: string[],
    public sectors: string[],
    public seniorityLevel: SeniorityLevel,
    public isTemplate: boolean,
    public isPublished: boolean,
    public createdById: string,
    public createdAt: Date,
    public updatedAt: Date,
    public summaryTR?: string,
    public summaryEN?: string,
    public companyContext?: string,
  ) {}

  /**
   * Checks if this is a reusable template
   * Bunun yeniden kullanılabilir bir şablon olup olmadığını kontrol eder
   */
  isReusableTemplate(): boolean {
    return this.isTemplate;
  }

  /**
   * Checks if template is published
   * Şablonun yayınlanıp yayınlanmadığını kontrol eder
   */
  isPublishedTemplate(): boolean {
    return this.isPublished;
  }

  /**
   * Gets total number of responsibilities
   * Toplam sorumluluk sayısını alır
   */
  getTotalResponsibilities(): number {
    return this.responsibilitiesTR.length;
  }

  /**
   * Gets total number of skills
   * Toplam yetkinlik sayısını alır
   */
  getTotalSkills(): number {
    return this.skillsTR.length;
  }

  /**
   * Publishes the template
   * Şablonu yayınlar
   */
  publish(): void {
    this.isPublished = true;
    this.updatedAt = new Date();
  }

  /**
   * Unpublishes the template
   * Şablonu yayından kaldırır
   */
  unpublish(): void {
    this.isPublished = false;
    this.updatedAt = new Date();
  }

  /**
   * Gets company context as object
   * Şirket bağlamını nesne olarak alır
   */
  getCompanyContextObject(): Record<string, any> | null {
    if (!this.companyContext) return null;
    try {
      return JSON.parse(this.companyContext);
    } catch {
      return null;
    }
  }

  /**
   * Exports to job posting format (Turkish)
   * İş ilanı formatına dönüştürür (Türkçe)
   */
  exportToJobPostingTR(): string {
    let output = `# ${this.roleNameTR}\n\n`;
    
    if (this.summaryTR) {
      output += `## Pozisyon Özeti\n${this.summaryTR}\n\n`;
    }
    
    if (this.responsibilitiesTR.length > 0) {
      output += `## Görev ve Sorumluluklar\n`;
      this.responsibilitiesTR.forEach((resp, idx) => {
        output += `${idx + 1}. ${resp}\n`;
      });
      output += '\n';
    }
    
    if (this.skillsTR.length > 0) {
      output += `## Aranan Nitelikler\n`;
      this.skillsTR.forEach((skill, idx) => {
        output += `${idx + 1}. ${skill}\n`;
      });
      output += '\n';
    }
    
    if (this.sectors.length > 0) {
      output += `## Sektörler\n${this.sectors.join(', ')}\n\n`;
    }
    
    return output;
  }

  /**
   * Exports to job posting format (English)
   * İş ilanı formatına dönüştürür (İngilizce)
   */
  exportToJobPostingEN(): string {
    let output = `# ${this.roleNameEN}\n\n`;
    
    if (this.summaryEN) {
      output += `## Position Summary\n${this.summaryEN}\n\n`;
    }
    
    if (this.responsibilitiesEN.length > 0) {
      output += `## Responsibilities\n`;
      this.responsibilitiesEN.forEach((resp, idx) => {
        output += `${idx + 1}. ${resp}\n`;
      });
      output += '\n';
    }
    
    if (this.skillsEN.length > 0) {
      output += `## Required Skills\n`;
      this.skillsEN.forEach((skill, idx) => {
        output += `${idx + 1}. ${skill}\n`;
      });
      output += '\n';
    }
    
    if (this.sectors.length > 0) {
      output += `## Sectors\n${this.sectors.join(', ')}\n\n`;
    }
    
    return output;
  }

  /**
   * Converts to plain object
   * Düz nesneye dönüştürür
   */
  toJSON() {
    return {
      id: this.id,
      tenantId: this.tenantId,
      roleNameTR: this.roleNameTR,
      roleNameEN: this.roleNameEN,
      summaryTR: this.summaryTR,
      summaryEN: this.summaryEN,
      responsibilitiesTR: this.responsibilitiesTR,
      responsibilitiesEN: this.responsibilitiesEN,
      skillsTR: this.skillsTR,
      skillsEN: this.skillsEN,
      sectors: this.sectors,
      seniorityLevel: this.seniorityLevel,
      companyContext: this.companyContext,
      isTemplate: this.isTemplate,
      isPublished: this.isPublished,
      createdById: this.createdById,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}
