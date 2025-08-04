import express from 'express';
import { verifyRecord } from '../util/validate.ts';
import fs from 'fs';

export const addRecord = (req: express.Request, res: express.Response) => {
  const result = verifyRecord(req.body);
  if (result.type !== 'ok') {
    return res.status(400).send(result.message);
  }
  const file = fs.readFileSync('./data/records.json', 'utf-8');
  const data = JSON.parse(file);
  const newRecords = [
    ...data.records,
    req.body
  ];

  fs.writeFileSync('./data/records.json', JSON.stringify({ records: newRecords }, null, 2));
  res.status(200).send(`Record with id: ${req.body.id} added`);
};
