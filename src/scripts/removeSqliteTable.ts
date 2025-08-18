import Database from 'better-sqlite3';
const db = new Database('app.db');

const query = `
  DROP table records;
`;

db.exec(query);