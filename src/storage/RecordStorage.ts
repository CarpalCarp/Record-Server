import { IRecordStorage } from './IRecordStorage';
import Database from 'better-sqlite3';
import type { Record } from '../types/Record';
const db = new Database('app.db');

export class RecordStorage implements IRecordStorage {
  getRecords(): { type: 'ok', value: Record[] } {
    const query = `
      SELECT * FROM records;
    `;
    try {
      return { type: 'ok', value: db.prepare(query).all() as Record[] };
    } catch (error) {
      console.error('Error retrieving records: ', error);
      return { type: 'ok', value: [] };
    }
  }

  getRecordById(id: string): { type: 'ok', value: Record } | { type: 'notFound', message: string } {
    const query = `
      SELECT * FROM records
      WHERE id = ?;
    `;

    try {
      const record = db.prepare(query).get(id) as Record;
      if (record) {
        return { type: 'ok', value: record };
      } else {
        return { type: 'notFound', message: 'Record not found' };
      }
    } catch (error) {
      throw new Error(`Error retrieving record with id ${id}: ${error.message}`);
    }
  }

  updateRecord(id: string, record: Omit<Record, 'id'>): { type: 'ok', message: string } | { type: 'notFound', message: string } {
    const result = this.getRecordById(id);
    if (result.type === 'notFound') {
      return result;
    }
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
      return { type: 'ok', message: `Record with id: ${id} updated` };
    } catch (error) {
      throw new Error(`Error updating record with id ${id}: ${error.message}`);
    }
  }

  deleteRecord(id: string): { type: 'ok', message: string } | { type: 'notFound', message: string } {
    const result = this.getRecordById(id);
    if (result.type === 'notFound') {
      return result;
    }

    const query = `
      DELETE FROM records WHERE id = ?;
    `;
    const deleteRecord = db.prepare(query);

    try {
      deleteRecord.run(id);
      return { type: 'ok', message: `Record with id: ${id} removed` };
    } catch (error) {
      throw new Error(`Error deleting record with id ${id}: ${error.message}`);
    }
  }

  addRecord(record: Record): { type: 'ok', message: string } {
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
      return { type: 'ok', message: `Record with id: ${record.id} added` };
    } catch (error) {
      throw new Error(`Error adding record with id ${record.id}: ${error.message}`);
    }
  }
}
