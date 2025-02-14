// import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { UploadService } from './upload.service';

// @Controller('upload')
// export class UploadController {
//   constructor(private readonly uploadService: UploadService) {}

//   @Post('profile-picture')
//   @UseInterceptors(FileInterceptor('file'))
//   async uploadProfilePicture(@UploadedFile() file: Express.Application) {
//     const url = await this.uploadService.uploadFile(file);
//     return { url };
//   }
// }