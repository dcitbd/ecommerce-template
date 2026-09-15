import { compressImage } from '../utils/imageCompressor';

export class UploadService {
  static async uploadImage(file: File): Promise<string> {
    const base64 = await compressImage(file);
    return base64;
  }
}
