import { records } from '../../data/records';
import Database from 'better-sqlite3';
const db = new Database('app.db');

const insertData = db.prepare("INSERT INTO records (firstName, lastName, age, description, dateOfBirth, email, phone, street, city, state, zip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

for (const record of records) {
  insertData.run(record.firstName,
    record.lastName,
    record.age,
    record.description,
    record.dateOfBirth,
    record.email,
    record.phone,
    record.street,
    record.city,
    record.state,
    record.zip
  );
}

db.close();
