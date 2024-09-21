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
exports.logout = exports.Token = exports.loginUser = exports.createUser = void 0;
const executeQuery_util_1 = __importDefault(require("../utils/executeQuery.util"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_util_1 = require("../utils/generateToken.util");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const CheckingQuery = 'Select username from user_tbl Where username = ?';
        const insertQuery = 'INSERT INTO user_tbl(username,password)VALUES(?,?)';
        const { username, password, confirm_password } = req.body;
        if (password !== confirm_password) {
            return res.status(403).send({ message: "Passwords Doesnot Match" });
        }
        const [existUser] = yield (0, executeQuery_util_1.default)(CheckingQuery, [username]);
        if (existUser) {
            return res.status(403).send({ message: "Username is Already in use" });
        }
        else {
            if (!password) {
                throw new Error("Password is undefined or null.");
            }
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const response = yield (0, executeQuery_util_1.default)(insertQuery, [username, hashedPassword]);
            if (response) {
                return res.status(201).send({ message: "User Created Successfully" });
            }
        }
    }
    catch (error) {
        console.error(error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const CheckingQuery = 'SELECT id, username, password, status FROM user_tbl WHERE username = ?';
        const { username, password } = req.body;
        const [user] = yield (0, executeQuery_util_1.default)(CheckingQuery, [username]);
        if (!user) {
            return res.status(409).send({ message: "User does not exist!" });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password.toString(), user.password);
        if (!isPasswordValid) {
            return res.status(400).send({ message: "Password is incorrect" });
        }
        const thisaccessToken = (0, generateToken_util_1.generateAccessToken)(user.id);
        const thisrefreshToken = yield (0, generateToken_util_1.generateRefreshToken)(user.id);
        return res.status(200).send({
            message: 'Login Successful',
            accessToken: thisaccessToken,
            refreshToken: thisrefreshToken,
            user: {
                username: user.username,
            }
        });
    }
    catch (error) {
        console.error("Database Error: ", error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
});
exports.loginUser = loginUser;
const Token = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.body;
        const checkTokenQuery = 'SELECT refresh_token FROM refresh_token WHERE refresh_token = ?';
        const getToken = yield (0, executeQuery_util_1.default)(checkTokenQuery, [refreshToken]);
        if (!getToken) {
            return res.status(404).send({ message: 'Token Invalid' });
        }
        const decoded = (0, generateToken_util_1.getRefreshTokenValue)(refreshToken);
        if (typeof decoded === 'string') {
            return res.status(400).send({ message: 'Invalid token format' });
        }
        const payload = decoded;
        const accessToken = (0, generateToken_util_1.generateAccessToken)(payload.id);
        const CheckingQuery = 'SELECT id, username, password, status FROM user_tbl WHERE id = ?';
        const [user] = yield (0, executeQuery_util_1.default)(CheckingQuery, [payload.id]);
        if (!accessToken) {
            return res.status(404).send({ message: 'Error Generating AccessToken' });
        }
        return res.status(201).send({
            message: 'Access Token Generated Successfully',
            accessToken: accessToken,
            user: {
                username: user.username,
            }
        });
    }
    catch (error) {
        console.error("Database Error: ", error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
});
exports.Token = Token;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userAuth = req.body.user;
        const DeleteQuery = 'DELETE FROM refresh_token WHERE user_id = ?';
        const result = yield (0, executeQuery_util_1.default)(DeleteQuery, [userAuth.id]);
        if (!result) {
            return res.status(404).send({ message: 'User Not Found' });
        }
        return res.status(200).send({ message: 'User Successfully Logout' });
    }
    catch (error) {
        console.error("Database Error: ", error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
});
exports.logout = logout;
