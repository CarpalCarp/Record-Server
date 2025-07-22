"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const recordController = require('../controllers/recordController');
exports.router = express_1.default.Router();
exports.router.get('/records', recordController.getRecords);
exports.router.get('/records/:id', recordController.getRecordById);
exports.router.post('/records', recordController.addRecord);
exports.router.put('/records/:id', recordController.updateRecord);
exports.router.delete('/records/:id', recordController.deleteRecord);
