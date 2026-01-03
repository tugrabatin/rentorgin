import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadContract(file: Express.Multer.File, user: any): Promise<{
        success: boolean;
        file: {
            id: any;
            url: string;
            originalName: any;
            size: any;
            uploadedAt: Date;
        };
    }>;
}
//# sourceMappingURL=upload.controller.d.ts.map