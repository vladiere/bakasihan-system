"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3000;
// Logging
app.use((0, morgan_1.default)("dev"));
// Parse the request
app.use(express_1.default.urlencoded({ extended: false }));
// Takes care of json data
app.use(express_1.default.json({ limit: "100mb" })); // Setting the data size of an json
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
// Api routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/admin', admin_routes_1.default);
app.use('/api/user', user_routes_1.default);
app.use('/api/images/', express_1.default.static('./src/public'));
// Default route
app.get('/', (req, res) => {
    return res.status(200).json({ message: 'OK' });
});
// Error Handling
app.use((req, res, next) => {
    const error = new Error("Not Found");
    return res.status(404).json({
        message: error.message,
    });
});
app.listen(PORT, () => {
    console.info(`Server listening on Port ${PORT}`);
});
