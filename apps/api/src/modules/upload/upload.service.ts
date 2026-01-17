/**
 * Upload Service
 * File management business logic
 * 
 * Yükleme Servisi
 * Dosya yönetimi iş mantığı
 */

import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  /**
   * Save file metadata
   * Dosya meta verilerini kaydet
   */
  async saveFileMetadata(metadata: any) {
    // In production, save to database
    // Production'da veritabanına kaydet
    return {
      success: true,
      file: {
        id: metadata.filename,
        url: `/storage/uploads/${metadata.filename}`,
        originalName: metadata.originalName,
        size: metadata.size,
        uploadedAt: new Date(),
      },
    };
  }
}




















