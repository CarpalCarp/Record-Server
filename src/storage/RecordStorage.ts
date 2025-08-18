import { IRecordStorage as IRecordStorage } from './IRecordStorage';
import Database from 'better-sqlite3';
import type { Record } from '../types/Record';
const db = new Database('app.db');

export class RecordStorage implements IRecordStorage {
  getRecords(): Record[] {
    const query = `
      SELECT * FROM records;
    `;
    try {
      return db.prepare(query).all() as Record[];
    } catch (error) {
      console.error('Error adding record: ', error);
      return [];
    }
  }

  getRecordById(id: string): Record {
    const query = `
      SELECT * FROM records
      WHERE id = ?;
    `;

    try {
      return db.prepare(query).get(id) as Record;
    } catch (error) {
      console.error('Error adding record: ', error);
      return null;
    }
  }

  updateRecord(id: string, record: Omit<Record, 'id'>): void {
    const query = `
      UPDATE records
      SET firstName = ?, lastName = ?, age = ?, description = ?, dateOfBirth = ?, email = ?, phone = ?, street = ?, city = ?, state = ?, zip = ?
      WHERE id = ?;
    `;
    const updateRecord = db.prepare(query);

    try {
      updateRecord.run(record.firstName,
        record.lastName,
        record.age,
        record.description,
        record.dateOfBirth,
        record.email,
        record.phone,
        record.street,
        record.city,
        record.state,
        record.zip,
        id
      );
    } catch (error) {
      console.error('Error adding record: ', error);
    }
  }

  deleteRecord(id: string): void {
    const query = `
      DELETE FROM records WHERE id = ?;
    `;
    const deleteRecord = db.prepare(query);

    try {
      deleteRecord.run(id);
    } catch (error) {
      console.error('Error adding record: ', error);
    }
  }

  addRecord(record: Record): void {
    const query = `
      INSERT INTO records (id, firstName, lastName, age, description, dateOfBirth, email, phone, street, city, state, zip)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const insertRecord = db.prepare(query);

    try {
      insertRecord.run(record.id,
        record.firstName,
        record.lastName,
        record.age,
        record.description,
        record.dateOfBirth,
        record.email,
        record.phone,
        record.street,
        record.city,
        record.state,
        record.zip);
    } catch (error) {
      console.error('Error adding record: ', error);
    }
  }
}
