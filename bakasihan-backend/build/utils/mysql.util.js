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
exports.Query = exports.Connect = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const config_util_1 = __importDefault(require("./config.util"));
// Parameters for mysql connection
const params = {
    user: config_util_1.default.mysql.username,
    password: config_util_1.default.mysql.password,
    host: config_util_1.default.mysql.host,
    database: config_util_1.default.mysql.database,
};
// Setting up the database connection
const Connect = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const connection = mysql2_1.default.createConnection(params);
        connection.connect((error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(connection);
        });
    });
});
exports.Connect = Connect;
// Setting up for query
const Query = (connection, query, params) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
            connection.end();
        });
    });
});
exports.Query = Query;
