/**
 * Upload Service Unit Tests
 * Tests for file upload management
 * 
 * Yükleme Servisi Birim Testleri
 * Dosya yükleme yönetimi testleri
 */

import { Test, TestingModule } from '@nestjs/testing';
import { UploadService } from './upload.service';

describe('UploadService', () => {
  let service: UploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadService],
    }).compile();

    service = module.get<UploadService>(UploadService);
  });

  describe('saveFileMetadata', () => {
    it('should save file metadata and return success', async () => {
      const metadata = {
        filename: 'test.pdf',
        originalName: 'contract.pdf',
        mimeType: 'application/pdf',
        size: 1024000,
        path: '/uploads/test.pdf',
        tenantId: 't1',
        uploadedBy: 'u1',
      };

      const result = await service.saveFileMetadata(metadata);

      expect(result.success).toBe(true);
      expect(result.file).toHaveProperty('id');
      expect(result.file).toHaveProperty('url');
      expect(result.file.originalName).toBe('contract.pdf');
    });

    it('should generate correct file URL', async () => {
      const metadata = {
        filename: 'abc123.pdf',
        originalName: 'test.pdf',
        size: 1000,
      };

      const result = await service.saveFileMetadata(metadata);

      expect(result.file.url).toBe('/storage/uploads/abc123.pdf');
    });

    it('should include upload timestamp', async () => {
      const metadata = {
        filename: 'test.pdf',
        originalName: 'file.pdf',
        size: 1000,
      };

      const result = await service.saveFileMetadata(metadata);

      expect(result.file.uploadedAt).toBeInstanceOf(Date);
    });
  });
});


















