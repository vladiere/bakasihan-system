import multer, { StorageEngine, FileFilterCallback } from 'multer';
import { Request } from 'express';
import { existsSync } from 'fs';
import { join, extname } from 'path'; // extname will help extract the file extension
import dotenv from "dotenv";
dotenv.config();

// Define the storage configuration
const storage: StorageEngine = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, "./src/public/images"); // Use double backslashes
    // or you can use forward slashes like below
    // cb(null, 'C:/Users/asjo/source/repos/LibrarySytem/assets');
  },
  filename: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    // Extract file name and extension
    const originalName = file.originalname;
    const fileExtension = extname(originalName); // Get file extension using extname
    const baseName = originalName.substring(0, originalName.lastIndexOf('.'));

    // Define the initial file path
    let newFileName = originalName;
    let filePath = join("./src/public/images", newFileName);

    // Counter for unique file names
    let counter = 1;

    // Check if file already exists and generate a new name if necessary
    while (existsSync(filePath)) {
      // Generate a new file name with counter
      newFileName = `${baseName}-${counter}${fileExtension}`;
      filePath = join("./src/public/images", newFileName);
      counter++;
    }

    // Final callback with the unique file name
    cb(null, newFileName); // Return only the unique file name, not the full path
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
});