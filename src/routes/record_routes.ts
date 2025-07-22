import express from 'express';
import { getRecords, getRecordById, addRecord, updateRecord, deleteRecord } from '../controllers/recordController';

export const router = express.Router();

router.get('/records', getRecords);
router.get('/records/:id', getRecordById);
router.post('/records', addRecord);
router.put('/records/:id', updateRecord);
router.delete('/records/:id', deleteRecord);
