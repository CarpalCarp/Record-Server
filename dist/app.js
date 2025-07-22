"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require('cors');
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const record_routes_1 = require("./routes/record_routes");
const app = (0, express_1.default)();
app.use(cors({
    origin: ['http://localhost:4200']
}));
app.listen(3000);
app.use(express_1.default.json());
// log request details to the console
app.use((0, morgan_1.default)('dev'));
app.use('/app', record_routes_1.router);
app.use((req, res) => {
    res.status(404).send('Route not found');
});
