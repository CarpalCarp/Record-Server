import { Request, Response } from 'express';
import { Record } from '../types/record';
import fs from 'fs';

export const getRecordById = (req: Request, res: Response) => {
  const file = fs.readFileSync('./data/records.json', 'utf-8');
  const data = JSON.parse(file);
  const record = data.records.find((record: Record) => record.id === parseInt(req.params.id));
  if (record) {
    res.status(200).json(record);
  } else {
    res.status(404).send('Record not found');
  }
};