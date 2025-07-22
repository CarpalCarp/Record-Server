"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const addRecord_1 = require("./controllers/addRecord");
const deleteRecord_1 = require("./controllers/deleteRecord");
const getRecordById_1 = require("./controllers/getRecordById");
const getRecords_1 = require("./controllers/getRecords");
const updateRecord_1 = require("./controllers/updateRecord");
exports.router = express_1.default.Router();
exports.router.get('/records', getRecords_1.getRecords);
exports.router.get('/records/:id', getRecordById_1.getRecordById);
exports.router.post('/records', addRecord_1.addRecord);
exports.router.put('/records/:id', updateRecord_1.updateRecord);
exports.router.delete('/records/:id', deleteRecord_1.deleteRecord);
