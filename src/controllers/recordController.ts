import { Request, Response } from 'express';
import fs from 'fs';

interface RecordDetails {
  email: string
  phone: string
  address: {
    street: string
    city: string
    state: string
    zip: number
  }
}

interface Record {
  id: number
  firstName: string
  lastName: string
  age: number
  description: string
  dateOfBirth: string
  details: RecordDetails
}

export const getRecords = (req: Request, res: Response) => {
  const file = fs.readFileSync('./data/records.json', 'utf-8');
  const data = JSON.parse(file);

  return res.status(200).json(data.records);
};

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

export const updateRecord = (req: Request, res: Response) => {
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
