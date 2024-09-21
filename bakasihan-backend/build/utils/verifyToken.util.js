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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_util_1 = __importDefault(require("./config.util"));
// Middleware for verifying JWT token
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader) {
        console.warn("Unauthorized: No Token Provided");
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    const token = authHeader.slice(7);
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_util_1.default.server.token.accessSecret);
        if (!decoded) {
            console.error('error');
            return res.status(401).json({ message: "Unauthorized: Token expired" });
        }
        req.body.user = decoded; // Attach user data to the request for later use
        next();
    }
    catch (error) {
        console.log("error in authenticating Middleware", error);
        throw (error);
    }
});
exports.default = verifyToken;
