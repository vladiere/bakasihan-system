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
exports.getRefreshTokenValue = exports.generateAccessToken = exports.generateRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const executeQuery_util_1 = __importDefault(require("./executeQuery.util"));
const config_util_1 = __importDefault(require("./config.util"));
const generateRefreshToken = (thisid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = jsonwebtoken_1.default.sign({ id: thisid }, config_util_1.default.server.token.refreshSecret, { expiresIn: config_util_1.default.server.token.refreshTokenExpireTime });
        const insertRefreshTokenQuery = 'INSERT INTO refresh_token(user_id, refresh_token) VALUES (?, ?)';
        yield (0, executeQuery_util_1.default)(insertRefreshTokenQuery, [thisid, refreshToken]);
        return refreshToken;
    }
    catch (error) {
        console.error('Error generating refresh token:', error);
        throw error; // or handle the error as needed
    }
});
exports.generateRefreshToken = generateRefreshToken;
const generateAccessToken = (thisid) => {
    return jsonwebtoken_1.default.sign({ id: thisid }, config_util_1.default.server.token.accessSecret, { expiresIn: config_util_1.default.server.token.accessTokenExpireTime });
};
exports.generateAccessToken = generateAccessToken;
const getRefreshTokenValue = (token) => {
    return jsonwebtoken_1.default.verify(token, config_util_1.default.server.token.refreshSecret);
};
exports.getRefreshTokenValue = getRefreshTokenValue;
