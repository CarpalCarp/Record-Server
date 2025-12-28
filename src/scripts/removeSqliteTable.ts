import Database from 'better-sqlite3';
const db = new Database('app.db');

const query = `
  DROP table users;
`;

db.exec(query);