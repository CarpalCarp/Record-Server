import { Record } from '../types/Record';

export interface IRecordStorage {
  getRecords(): { type: 'ok', value: Record[] }
  getRecordById(id: string): { type: 'ok', value: Record } | { type: 'notFound', message: string }
  addRecord(record: Record): { type: 'ok', message: string }
  updateRecord(id: string, record: Omit<Record, 'id'>): { type: 'ok', message: string } | { type: 'notFound', message: string }
  deleteRecord(id: string): { type: 'ok', message: string } | { type: 'notFound', message: string }
}
