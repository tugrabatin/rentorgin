/**
 * Upload Controller
 * File upload endpoints
 * 
 * Yükleme Controller
 * Dosya yükleme endpoint'leri
 */

import { 
  Controller, 
  Post, 
  UseInterceptors, 
  UploadedFile,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UploadService } from './upload.service';

// Serverless-compatible storage: use memory storage for Netlify Functions
// Netlify Functions'da dosya sistemi read-only, memory storage kullan
// Check if running in serverless environment (AWS Lambda / Netlify Functions)
const isServerless = !!(
  process.env.AWS_LAMBDA_FUNCTION_NAME || 
  process.env.AWS_EXECUTION_ENV ||
  process.env.NETLIFY ||
  process.env.VERCEL
);

@ApiTags('upload')
@Controller('upload')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('contract')
  @ApiOperation({ summary: 'Upload contract document / Sözleşme dokümanı yükle' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      // Serverless ortamda memory storage kullan (disk storage read-only)
      // Netlify Functions'da dosya sistemi read-only, bu yüzden memory storage kullan
      // Always use memory storage in production/serverless to avoid filesystem issues
      storage: undefined, // undefined = memory storage (works in both serverless and regular)
      limits: {
        fileSize: 50 * 1024 * 1024, // 50MB
      },
      fileFilter: (req, file, cb) => {
        // Check file extension
        const allowedExtensions = ['.pdf', '.doc', '.docx'];
        const ext = extname(file.originalname).toLowerCase();
        
        // Check MIME type
        const allowedMimeTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];
        
        if (!allowedExtensions.includes(ext)) {
          cb(new BadRequestException('Invalid file extension. Only PDF, DOC, DOCX allowed.'), false);
          return;
        }
        
        if (!allowedMimeTypes.includes(file.mimetype)) {
          cb(new BadRequestException('Invalid file type. MIME type check failed.'), false);
          return;
        }
        
        // Sanitize filename
        const sanitized = file.originalname
          .replace(/[^a-zA-Z0-9.-]/g, '_')
          .replace(/\.{2,}/g, '.');
        
        file.originalname = sanitized;
        cb(null, true);
      },
    }),
  )
  uploadContract(@UploadedFile() file: any, @CurrentUser() user: any) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Serverless ortamda file.buffer kullan (memory storage)
    // Production'da file.path kullan (disk storage)
    const filename = file.filename || `${Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('')}${extname(file.originalname)}`;
    const path = isServerless ? `/tmp/${filename}` : (file.path || `./storage/uploads/${filename}`);

    return this.uploadService.saveFileMetadata({
      filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      path,
      buffer: isServerless ? file.buffer : undefined, // Memory storage için buffer
      tenantId: user.tenantId,
      uploadedBy: user.userId,
    });
  }
}



