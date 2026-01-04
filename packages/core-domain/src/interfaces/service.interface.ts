/**
 * Service Interfaces
 * Business logic service contracts
 * 
 * Servis Arayüzleri
 * İş mantığı servis sözleşmeleri
 */

export interface ILeaseService {
  calculateCurrentRent(leaseId: string, date?: Date): Promise<number>;
  checkExpiringLeases(daysThreshold: number): Promise<any[]>;
  initiateRenewal(leaseId: string): Promise<any>;
}

export interface IAnalyticsService {
  calculateStorePerformance(storeId: string, year: number, month: number): Promise<any>;
  generatePerformanceReport(storeId: string, dateRange: any): Promise<any>;
  compareStores(storeIds: string[]): Promise<any>;
}

export interface IAIAssistantService {
  executePrompt(promptId: string, context: any, userInput: string): Promise<string>;
  logInteraction(userId: string, promptId: string, result: any): Promise<void>;
  learnFromFeedback(interactionId: string, feedback: any): Promise<void>;
}

export interface ITranslationService {
  translateDocument(fileUrl: string, sourceLang: string, targetLang: string): Promise<string>;
  getTranslationProgress(jobId: string): Promise<number>;
  cancelTranslation(jobId: string): Promise<boolean>;
}

export interface ISessionService {
  exportSession(userId: string): Promise<any>;
  importSession(userId: string, sessionData: any): Promise<boolean>;
  validateSession(sessionData: any): Promise<boolean>;
}



















