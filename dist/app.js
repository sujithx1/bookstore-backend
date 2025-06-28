"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.io = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = require("./config/db");
const cors_2 = require("./config/cors");
const authrouts_1 = __importDefault(require("./presentation/routes/authrouts"));
const bookrouts_1 = __importDefault(require("./presentation/routes/bookrouts"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const checkoutrouts_1 = require("./presentation/routes/checkoutrouts");
const socket_1 = require("./utils/socket");
const errorhandler_1 = require("./presentation/middleware/errorhandler");
const adminrouts_1 = require("./presentation/routes/adminrouts");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
exports.server = server;
app.use((0, cors_1.default)(cors_2.corsOptions));
const io = new socket_io_1.Server(server, {
    cors: cors_2.corsOptions,
    path: "/ws",
});
exports.io = io;
(0, socket_1.socketConnection)();
(0, db_1.db)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded());
app.use((0, morgan_1.default)('dev'));
app.use('/api', authrouts_1.default);
app.use('/api/book', bookrouts_1.default);
app.use('/api/checkout', checkoutrouts_1.checkoutrouter);
app.use('/api/admin', adminrouts_1.adminrouter);
app.use((err, req, res, next) => {
    (0, errorhandler_1.errorHandler)(err, req, res, next);
});
