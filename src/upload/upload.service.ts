// import { Injectable } from '@nestjs/common';
// import * as fs from 'fs';
// import * as path from 'path';

// @Injectable()
// export class UploadService {
//   async uploadFile(file: Express.Multer.File): Promise<string> {
//     const uploadPath = path.join(__dirname, '..', 'uploads', file.originalname);
//     fs.writeFileSync(uploadPath, file.buffer);
//     return `/uploads/${file.originalname}`; // Retorna a URL da foto
//   }
// }