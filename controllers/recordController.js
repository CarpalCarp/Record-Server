const fs = require('fs');

const getRecords = (req, res) => {
  const file = fs.readFileSync('./data/records.json');
  const data = JSON.parse(file);

  return res.status(200).json(data.records);
};

const getRecordById = (req, res) => {
  const file = fs.readFileSync('./data/records.json');
  const data = JSON.parse(file);
  const record = data.records.find(record => record.id === parseInt(req.params.id));
  if (record) {
    res.status(200).json(record);
  } else {
    res.status(404).send('Record not found');
  }
};

const addRecord = (req, res) => {
  const file = fs.readFileSync('./data/records.json');
  const data = JSON.parse(file);
  const newRecords = [
    ...data.records,
    req.body
  ];

  fs.writeFileSync('./data/records.json', JSON.stringify({ records: newRecords }, null, 2));
  res.status(200).send(`Record with id: ${req.body.id} added`);
};

const updateRecord = (req, res) => {
  const id = parseInt(req.params.id);
  const file = fs.readFileSync('./data/records.json');
  const dataClone = structuredClone(JSON.parse(file));
  const record = dataClone.records.find(record => record.id === id);
  const index = dataClone.records.indexOf(record);

  if (index === -1) {
    return res.status(404).send('Record not found');
  }

  dataClone.records[index] = req.body;
  fs.writeFileSync('./data/records.json', JSON.stringify(dataClone, null, 2));
  res.status(200).send(`Record with id: ${id} updated`);
};

const deleteRecord = (req, res) => {
  const id = parseInt(req.params.id);
  const file = fs.readFileSync('./data/records.json');
  const dataClone = structuredClone(JSON.parse(file));
  const record = dataClone.records.find(record => record.id === id);
  const index = dataClone.records.indexOf(record);

  if (index === -1) {
    return res.status(404).send('Record not found');
  }

  dataClone.records.splice(index, 1);
  fs.writeFileSync('./data/records.json', JSON.stringify(dataClone, null, 2));
  res.status(200).send(`Record with id: ${id} removed`);
};

module.exports = {
  getRecords,
  getRecordById,
  addRecord,
  updateRecord,
  deleteRecord
}
