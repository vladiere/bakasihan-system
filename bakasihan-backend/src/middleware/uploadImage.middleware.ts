import multer, { StorageEngine, FileFilterCallback } from 'multer';
import { Request } from 'express';

// Define the storage configuration
const storage: StorageEngine = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, './src/public/images');
  },
  filename: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, file.originalname);
  }
});

// Define the file filter for allowed MIME types
const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Export the upload middleware for a single file
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter
})
