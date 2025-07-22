"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRecord = void 0;
const verifyRecord = (record) => {
    try {
        verifyRequired(record, 'id', 'number');
        verifyRequired(record, 'firstName', 'string');
        verifyRequired(record, 'lastName', 'string');
        verifyRequired(record, 'age', 'number');
        verifyRequired(record, 'description', 'string');
        verifyRequired(record, 'dateOfBirth', 'string');
        verifyRequired(record, 'details', 'object');
        verifyRequired(record.details, 'email', 'string');
        verifyRequired(record.details, 'phone', 'string');
        verifyRequired(record.details, 'address', 'object');
        verifyRequired(record.details.address, 'street', 'string');
        verifyRequired(record.details.address, 'city', 'string');
        verifyRequired(record.details.address, 'state', 'string');
        verifyRequired(record.details.address, 'zip', 'number');
    }
    catch (error) {
        return { type: 'badRequest', message: error.message };
    }
    return { type: 'ok', message: '' };
};
exports.verifyRecord = verifyRecord;
const verifyRequired = (obj, prop, type) => {
    if (!obj[prop]) {
        throw new Error(`Missing ${prop}`);
    }
    return { type: 'ok', message: '' };
};
