"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const upload_service_1 = require("./upload.service");
describe('UploadService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [upload_service_1.UploadService],
        }).compile();
        service = module.get(upload_service_1.UploadService);
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
//# sourceMappingURL=upload.service.spec.js.map