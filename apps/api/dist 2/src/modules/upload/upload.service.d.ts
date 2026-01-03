export declare class UploadService {
    saveFileMetadata(metadata: any): Promise<{
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
//# sourceMappingURL=upload.service.d.ts.map