declare global {
  namespace Express {
    export interface Request {
      files?: {
        [fieldname: string]: MulterS3File[];
      };
    }
  }
}
