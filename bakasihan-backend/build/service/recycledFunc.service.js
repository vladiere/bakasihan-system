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
exports.getAllProductsCategories = exports.getProductCategories = exports.getProducts = void 0;
const executeQuery_util_1 = __importDefault(require("../utils/executeQuery.util"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category_id, searchValue } = req.body;
        const Query = 'SELECT id,category_id,product_image,product_name,product_description,price,status FROM products_tbl WHERE category_id LIKE %?% AND product_name LIKE %?%';
        const result = (0, executeQuery_util_1.default)(Query, [category_id, searchValue]);
        if (!result) {
            return res.status(402).send({ message: "Error fetching." });
        }
        return res.status(200).send({ products: result });
    }
    catch (error) {
        console.error(error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
});
exports.getProducts = getProducts;
const getProductCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category_id } = req.body;
        const getQuery = 'SELECT id,category_name FROM product_categories_tbl WHERE id LIKE %?%';
        const result = (0, executeQuery_util_1.default)(getQuery, [category_id]);
        if (!result) {
            return res.status(402).send({ message: "Error fetching." });
        }
        return res.status(200).send({ categories: result });
    }
    catch (error) {
        console.error(error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
});
exports.getProductCategories = getProductCategories;
const getAllProductsCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get pagination parameters from request query
        const page = parseInt(req.query.page) || 1; // default to page 1
        const limit = parseInt(req.query.per_page) || 5; // default limit to 10
        const searchTerm = req.query.searchTerm ? `%${req.query.searchTerm}%` : '%%'; // if no searchTerm, match all
        const offset = (page - 1) * limit;
        // Query to get the total number of records (without pagination)
        const totalQuery = 'SELECT COUNT(*) as total FROM product_categories_tbl WHERE category_name LIKE ?';
        const totalResult = yield (0, executeQuery_util_1.default)(totalQuery, [searchTerm]);
        const total = totalResult[0].total; // Get total from the result
        // Query to get paginated results with search
        const getQuery = 'SELECT id, category_name FROM product_categories_tbl WHERE category_name LIKE ? LIMIT ? OFFSET ?';
        const result = yield (0, executeQuery_util_1.default)(getQuery, [searchTerm, limit, offset]);
        if (!result) {
            return res.status(402).send({ message: "Error fetching." });
        }
        // Send the paginated results along with total records
        return res.status(200).send({
            categories: result,
            current_page: page,
            per_page: limit,
            total: total, // total number of matching records
        });
    }
    catch (error) {
        return res.status(500).send({ message: "Server error.", error });
    }
});
exports.getAllProductsCategories = getAllProductsCategories;
