import { Request, Response } from 'express';
import fs from 'fs';

export const addRecord = (req: Request, res: Response) => {
  const file = fs.readFileSync('./data/records.json', 'utf-8');
  const data = JSON.parse(file);
  const newRecords = [
    ...data.records,
    req.body
  ];

  fs.writeFileSync('./data/records.json', JSON.stringify({ records: newRecords }, null, 2));
  res.status(200).send(`Record with id: ${req.body.id} added`);
};