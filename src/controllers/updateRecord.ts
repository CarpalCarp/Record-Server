import express from 'express';
import type { Record } from '../types/Record.ts';
import { verifyRecord } from '../util/validate.ts';
import fs from 'fs';

export const updateRecord = (req: express.Request, res: express.Response) => {
  const result = verifyRecord(req.body);
  if (result.type !== 'ok') {
    return res.status(400).send(result.message);
  }

  const id = parseInt(req.params.id);
  const file = fs.readFileSync('./data/records.json', 'utf-8');
  const dataClone = structuredClone(JSON.parse(file));
  const record = dataClone.records.find((record: Record) => record.id === id);
  const index = dataClone.records.indexOf(record);

  if (index === -1) {
    return res.status(404).send('Record not found');
  }

  dataClone.records[index] = req.body;
  fs.writeFileSync('./data/records.json', JSON.stringify(dataClone, null, 2));
  res.status(200).send(`Record with id: ${id} updated`);
};