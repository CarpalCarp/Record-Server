import express from 'express';
import type { Record } from '../types/Record.ts';
import fs from 'fs';

export const getRecordById = (req: express.Request, res: express.Response) => {
  const file = fs.readFileSync('./data/records.json', 'utf-8');
  const data = JSON.parse(file);
  const record = data.records.find((record: Record) => record.id === parseInt(req.params.id));
  if (record) {
    res.status(200).json(record);
  } else {
    res.status(404).send('Record not found');
  }
};