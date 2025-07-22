"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecordById = void 0;
const fs_1 = __importDefault(require("fs"));
const getRecordById = (req, res) => {
    const file = fs_1.default.readFileSync('./data/records.json', 'utf-8');
    const data = JSON.parse(file);
    const record = data.records.find((record) => record.id === parseInt(req.params.id));
    if (record) {
        res.status(200).json(record);
    }
    else {
        res.status(404).send('Record not found');
    }
};
exports.getRecordById = getRecordById;
