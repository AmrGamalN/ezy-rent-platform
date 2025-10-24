// import multerS3 from 'multer-s3';
import multer, { MulterError, FileFilterCallback } from 'multer';
// import { bucketName, s3Client } from '../config/s3.config';
import { NextFunction, Request, RequestHandler, Response } from 'express';
// import { v4 as uuidv4 } from 'uuid';

// export const uploadFile = multer({
//   storage: multerS3({
//     s3: s3Client,
//     bucket: bucketName,
//     key: function (
//       req: Request,
//       file: Express.Multer.File,
//       cb: (error: Error | null, key?: string) => void,
//     ) {
//       const prefix = uuidv4();
//       cb(null, 'profile/' + prefix + '-' + file.originalname);
//     },
//   }),
//   fileFilter: function (
//     req: Request,
//     file: Express.Multer.File,
//     cb: FileFilterCallback,
//   ) {
//     if (['image/jpeg', 'image/png', 'image/jpg'].includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(
//         new Error('Only jpg and png images are allowed!') as unknown as null,
//         false,
//       );
//     }
//   },
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//     files: 1,
//   },
// });

export const uploadFile = multer({
  storage: multer.memoryStorage(),
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    if (['image/jpeg', 'image/png', 'image/jpg'].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error('Only jpg and png images are allowed!') as unknown as null,
        false,
      );
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
    files: 1,
  },
});

const uploadMiddleware =
  (middleware: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    middleware(req, res, async (err) => {
      if (err instanceof MulterError) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: 'Upload failed',
          error: err.message,
        });
      }
      return next();
    });
  };

export const uploadSingleFileMiddleware = uploadMiddleware(
  uploadFile.single('avatar'),
);
