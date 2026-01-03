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
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UploadService } from './upload.service';

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
      storage: diskStorage({
        destination: './storage/uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
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
  uploadContract(@UploadedFile() file: Express.Multer.File, @CurrentUser() user: any) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    return this.uploadService.saveFileMetadata({
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      path: file.path,
      tenantId: user.tenantId,
      uploadedBy: user.userId,
    });
  }
}



