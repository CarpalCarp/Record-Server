"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecords = void 0;
const fs_1 = __importDefault(require("fs"));
const getRecords = (req, res) => {
    const file = fs_1.default.readFileSync('./data/records.json', 'utf-8');
    const data = JSON.parse(file);
    return res.status(200).json(data.records);
};
exports.getRecords = getRecords;
