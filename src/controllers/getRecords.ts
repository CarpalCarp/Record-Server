import express from 'express';
import fs from 'fs';

export const getRecords = (req: express.Request, res: express.Response) => {
  const file = fs.readFileSync('./data/records.json', 'utf-8');
  const data = JSON.parse(file);

  return res.status(200).json(data.records);
};