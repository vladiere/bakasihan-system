"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
// Define the storage configuration
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, './src/public/images');
    },
    filename: (_req, file, cb) => {
        cb(null, file.originalname);
    }
});
// Define the file filter for allowed MIME types
const fileFilter = (_req, file, cb) => {
    if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
// Export the upload middleware for a single file
exports.upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter
});
