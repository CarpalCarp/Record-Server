"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRecord = void 0;
const fs_1 = __importDefault(require("fs"));
const addRecord = (req, res) => {
    const file = fs_1.default.readFileSync('./data/records.json', 'utf-8');
    const data = JSON.parse(file);
    const newRecords = [
        ...data.records,
        req.body
    ];
    fs_1.default.writeFileSync('./data/records.json', JSON.stringify({ records: newRecords }, null, 2));
    res.status(200).send(`Record with id: ${req.body.id} added`);
};
exports.addRecord = addRecord;
