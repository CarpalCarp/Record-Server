import Database from 'better-sqlite3';
const db = new Database('app.db');

const query = `
  CREATE TABLE records (
    id INTEGER PRIMARY KEY,
    firstName STRING NOT NULL,
    lastName STRING NOT NULL,
    age INTEGER,
    description STRING,
    dateOfBirth STRING,
    email STRING,
    phone STRING,
    street STRING,
    city STRING,
    state STRING,
    zip STRING
  )
`;

db.exec(query);
