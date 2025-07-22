"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecord = void 0;
const validate_1 = require("../util/validate");
const fs_1 = __importDefault(require("fs"));
const deleteRecord = (req, res) => {
    const result = (0, validate_1.verifyRecord)(req.body);
    if (result.type !== 'ok') {
        return res.status(400).send(result.message);
    }
    const id = parseInt(req.params.id);
    const file = fs_1.default.readFileSync('./data/records.json', 'utf-8');
    const dataClone = structuredClone(JSON.parse(file));
    const record = dataClone.records.find((record) => record.id === id);
    const index = dataClone.records.indexOf(record);
    if (index === -1) {
        return res.status(404).send('Record not found');
    }
    dataClone.records.splice(index, 1);
    fs_1.default.writeFileSync('./data/records.json', JSON.stringify(dataClone, null, 2));
    res.status(200).send(`Record with id: ${id} removed`);
};
exports.deleteRecord = deleteRecord;
