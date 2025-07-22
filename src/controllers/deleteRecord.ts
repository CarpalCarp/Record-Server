import { Request, Response } from 'express';
import { Record } from '../types/record';
import fs from 'fs';

export const deleteRecord = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const file = fs.readFileSync('./data/records.json', 'utf-8');
  const dataClone = structuredClone(JSON.parse(file));
  const record = dataClone.records.find((record: Record) => record.id === id);
  const index = dataClone.records.indexOf(record);

  if (index === -1) {
    return res.status(404).send('Record not found');
  }

  dataClone.records.splice(index, 1);
  fs.writeFileSync('./data/records.json', JSON.stringify(dataClone, null, 2));
  res.status(200).send(`Record with id: ${id} removed`);
};