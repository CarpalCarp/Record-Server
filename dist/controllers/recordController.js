"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecord = exports.updateRecord = exports.addRecord = exports.getRecordById = exports.getRecords = void 0;
const fs_1 = __importDefault(require("fs"));
const getRecords = (req, res) => {
    const file = fs_1.default.readFileSync('./data/records.json', 'utf-8');
    const data = JSON.parse(file);
    return res.status(200).json(data.records);
};
exports.getRecords = getRecords;
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
const updateRecord = (req, res) => {
    const id = parseInt(req.params.id);
    const file = fs_1.default.readFileSync('./data/records.json', 'utf-8');
    const dataClone = structuredClone(JSON.parse(file));
    const record = dataClone.records.find((record) => record.id === id);
    const index = dataClone.records.indexOf(record);
    if (index === -1) {
        return res.status(404).send('Record not found');
    }
    dataClone.records[index] = req.body;
    fs_1.default.writeFileSync('./data/records.json', JSON.stringify(dataClone, null, 2));
    res.status(200).send(`Record with id: ${id} updated`);
};
exports.updateRecord = updateRecord;
const deleteRecord = (req, res) => {
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
