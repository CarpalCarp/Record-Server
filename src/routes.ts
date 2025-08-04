import express from 'express';
import { addRecord } from './controllers/addRecord.ts';
import { deleteRecord } from './controllers/deleteRecord.ts';
import { getRecordById } from './controllers/getRecordById.ts';
import { getRecords } from './controllers/getRecords.ts';
import { updateRecord } from './controllers/updateRecord.ts';

export const router = express.Router();

// Records
router.get('/records', getRecords);
router.get('/records/:id', getRecordById);
router.post('/records', addRecord);
router.put('/records/:id', updateRecord);
router.delete('/records/:id', deleteRecord);
