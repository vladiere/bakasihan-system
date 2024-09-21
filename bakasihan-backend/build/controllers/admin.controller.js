"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminGetAllProductsCategories = exports.insertProductCategory = exports.insertProduct = void 0;
const executeQuery_util_1 = __importDefault(require("../utils/executeQuery.util"));
const recycledFunc_service_1 = require("../service/recycledFunc.service");
const insertProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_image = req.file;
        const { category_id, product_name, product_description, price } = req.body;
        if (!product_image) {
            return res.status(400).send({ message: 'No file uploaded.' });
        }
        // Construct the image path
        const imagePath = `images/${product_image.originalname}`;
        const insertQuery = 'INSERT INTO products_tbl(category_id,product_image,product_name,product_description,price)VALUES(?,?,?,?)';
        const result = yield (0, executeQuery_util_1.default)(insertQuery, [category_id, imagePath, product_name, product_description, price]);
        if (!result) {
            return res.status(402).send({ message: "Error Inserting." });
        }
        return res.status(200).send({ message: "Success Fully Inserted." });
    }
    catch (error) {
        console.error(error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
});
exports.insertProduct = insertProduct;
const insertProductCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category_name } = yield req.body;
        console.log(req.body);
        const insertCategoryQuery = 'INSERT INTO product_categories_tbl(category_name) VALUES(?)';
        const result = yield (0, executeQuery_util_1.default)(insertCategoryQuery, [category_name]);
        if (!result) {
            return res.status(402).send({ message: "Error Inserting." });
        }
        return res.status(200).send({ message: "Success Fully Inserted." });
    }
    catch (error) {
        console.error(error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
});
exports.insertProductCategory = insertProductCategory;
const adminGetAllProductsCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, recycledFunc_service_1.getAllProductsCategories)(req, res);
});
exports.adminGetAllProductsCategories = adminGetAllProductsCategories;
