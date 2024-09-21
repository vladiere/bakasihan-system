"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_util_1 = __importDefault(require("../utils/verifyToken.util"));
const admin_controller_1 = require("../controllers/admin.controller");
const uploadImage_middleware_1 = require("../middleware/uploadImage.middleware");
const admin = express_1.default.Router();
admin.get('/adminGetAllProductsCategories', verifyToken_util_1.default, admin_controller_1.adminGetAllProductsCategories);
admin.post('/insertProduct', uploadImage_middleware_1.upload.single('product_image'), verifyToken_util_1.default, admin_controller_1.insertProduct);
admin.post('/insertProductCategory', verifyToken_util_1.default, admin_controller_1.insertProductCategory);
exports.default = admin;
