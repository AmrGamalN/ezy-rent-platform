import { S3Service } from '../../src/service/s3/s3.service';
import { CustomError } from '@amrogamal/shared-code';
import { s3Client } from '../../src/config/s3Bucket.config';
import type { Readable } from 'stream';

describe('S3Service', () => {
  let service: S3Service;
  beforeEach(() => {
    jest.clearAllMocks();
    service = S3Service.getInstance();
  });

  describe('deleteMultiImages', () => {
    it('should not call s3Client.send if keys array is empty', async () => {
      await service.deleteMultiImages([]);
      expect(s3Client.send).not.toHaveBeenCalled();
    });
    it('should call s3Client.send with DeleteObjectsCommand if keys are provided', async () => {
      const service = S3Service.getInstance();
      await service.deleteMultiImages(['12345', '67890']);
      expect(s3Client.send).toHaveBeenCalled();
    });
  });

  describe('deleteSingleImages', () => {
    it('should call s3Client.send with DeleteObjectCommand', async () => {
      await service.deleteSingleImages('key1');
      expect(s3Client.send).toHaveBeenCalled();
    });
  });

  describe('checkImagesLimit', () => {
    it('should throw CustomError if newTotal > 5', async () => {
      jest.spyOn(service, 'countImages').mockResolvedValue(5);
      await expect(service.checkImagesLimit('prefix', 0, 1)).rejects.toThrow(
        CustomError,
      );
    });

    it('should not throw if newTotal <= 5', async () => {
      jest.spyOn(service, 'countImages').mockResolvedValue(3);
      await expect(
        service.checkImagesLimit('prefix', 1, 2),
      ).resolves.not.toThrow();
    });
  });

  describe('uploadMultiImages', () => {
    it('should upload multiple images and return urls/keys', async () => {
      const file: Express.Multer.File = {
        fieldname: 'carImages',
        originalname: 'a.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: 123,
        buffer: Buffer.from('a'),
        stream: { readable: true } as Readable,
        destination: '',
        filename: '',
        path: '',
      };
      const files = { carImages: [file] };
      const result = await service.uploadMultiImages(files, 'prefix');
      expect(result[0]).toHaveProperty('url');
      expect(result[0]).toHaveProperty('key');
      expect(s3Client.send).toHaveBeenCalled();
    });

    it('should not upload multiple images and return urls/keys', async () => {
      await service.uploadMultiImages({ carImages: [] }, 'prefix');
      expect(s3Client.send).not.toHaveBeenCalled();
    });
  });

  describe('uploadSingleImage', () => {
    it('should upload a single image and return url/key', async () => {
      const service = S3Service.getInstance();
      const file: Express.Multer.File = {
        fieldname: 'carImages',
        originalname: 'a.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: 123,
        buffer: Buffer.from('a'),
        stream: { readable: true } as Readable,
        destination: '',
        filename: '',
        path: '',
      };
      const result = await service.uploadSingleImage(file);
      expect(result).toHaveProperty('url');
      expect(result).toHaveProperty('key');
      expect(s3Client.send).toHaveBeenCalled();
    });
    it('should not upload a single image and return url/key', async () => {
      const service = S3Service.getInstance();
      const result = await service.uploadSingleImage({} as Express.Multer.File);
      expect(result).toEqual({ url: '', key: '' });
      expect(s3Client.send).not.toHaveBeenCalled();
    });
  });
});
