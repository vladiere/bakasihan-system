"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MYSQL_HOST = process.env.MYSQLHOST || "localhost";
const MYSQL_USER = process.env.MYSQLUSER || "root";
const MYSQL_PASSWORD = process.env.MYSQLPASSWORD || "xReaper#666";
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "default_db";
const MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
};
const SERVER_HOST = process.env.HOST || "localhost";
const SERVER_PORT = process.env.MYSQL_PORT || 3306;
const SERVER_ACCESS_TOKEN_EXPIRETIME = process.env.SERVER_ACCESS_TOKEN_EXPIRETIME || "60m";
const SERVER_REFRESH_TOKEN_EXPIRETIME = process.env.SERVER_REFRESH_TOKEN_EXPIRETIME || "7d";
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || "MIT";
const SERVER_SECRET_KEY = process.env.SERVER_SECRET_KEY || "default_secret";
const SERVER_REFRESH_SECRET_KEY = process.env.SERVER_REFRESH_SECRET_KEY || "default_secret";
const SERVER_RESET_SECRET_KEY = process.env.SERVER_RESET_SECRET_KEY || "default_secret";
const SERVER_RESET_EXPIRETIME = process.env.SERVER_RESET_EXPIRETIME || "30m";
const MYSQL_URL = `mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}:${SERVER_PORT}/${MYSQL_DATABASE}`;
const SERVER = {
    hostname: SERVER_HOST,
    port: SERVER_PORT,
    token: {
        refreshTokenExpireTime: SERVER_REFRESH_TOKEN_EXPIRETIME,
        accessTokenExpireTime: SERVER_ACCESS_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        accessSecret: SERVER_SECRET_KEY,
        refreshSecret: SERVER_REFRESH_SECRET_KEY,
        resetAccessSecret: SERVER_RESET_SECRET_KEY,
        resetTokenExpireTime: SERVER_RESET_EXPIRETIME,
    },
};
const config = {
    mysql: MYSQL,
    server: SERVER,
    mysqlurl: MYSQL_URL
};
exports.default = config;
