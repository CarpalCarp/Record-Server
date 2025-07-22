import express from 'express';
import { addRecord } from './controllers/addRecord';
import { deleteRecord } from './controllers/deleteRecord';
import { getRecordById } from './controllers/getRecordById';
import { getRecords } from './controllers/getRecords';
import { updateRecord } from './controllers/updateRecord';

export const router = express.Router();

router.get('/records', getRecords);
router.get('/records/:id', getRecordById);
router.post('/records', addRecord);
router.put('/records/:id', updateRecord);
router.delete('/records/:id', deleteRecord);
