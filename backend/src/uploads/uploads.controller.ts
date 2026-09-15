import { Controller, Post, Delete, Param, UseInterceptors, UploadedFile, UseGuards, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService, MulterFile } from './uploads.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('admin/uploads')
@UseGuards(JwtAuthGuard)
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (_req: unknown, file: { mimetype: string }, cb: (err: Error | null, accept: boolean) => void) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
        return cb(new BadRequestException('Only image files are allowed!'), false);
      }
      cb(null, true);
    }
  }))
  async uploadImage(@UploadedFile() file: MulterFile) {
    if (!file) throw new BadRequestException('No file provided');
    return this.uploadsService.uploadImage(file, 'jewellery-showroom');
  }

  @Delete(':publicId')
  async deleteImage(@Param('publicId') publicId: string) {
    await this.uploadsService.deleteImage(publicId);
    return { success: true };
  }
}
