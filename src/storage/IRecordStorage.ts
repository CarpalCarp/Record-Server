import { Record } from '../types/Record';

export interface IRecordStorage {
  getRecords(): Record[]
  getRecordById(id: string): Record
  addRecord(record: Record): void
  updateRecord(id: string, record: Omit<Record, 'id'>): void
  deleteRecord(id: string): void
}
