"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const verifyToken_util_1 = __importDefault(require("../utils/verifyToken.util"));
const auth = express_1.default.Router();
auth.post('/register', auth_controller_1.createUser);
auth.post('/login', auth_controller_1.loginUser);
auth.post('/refresh-token', auth_controller_1.Token);
auth.post('/logout', verifyToken_util_1.default, auth_controller_1.logout);
exports.default = auth;
