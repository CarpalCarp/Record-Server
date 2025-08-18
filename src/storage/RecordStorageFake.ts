import { IRecordStorage } from './IRecordStorage';
import { Record } from '../types/Record';

export class RecordStorageFake implements IRecordStorage {
  #recordStorage: Record[] = [];

  constructor(data: Record[]) {
    this.#recordStorage = [...data];
  }
  getRecordById(id: string): Record {
    throw new Error('Method not implemented.');
  }
  updateRecord(id: string, record: Record): void {
    throw new Error('Method not implemented.');
  }
  deleteRecord(id: string): void {
    throw new Error('Method not implemented.');
  }

  get contents() {
    return this.#recordStorage;
  }

  getRecords() {
    return this.#recordStorage;
  }

  addRecord(record: Record) {
    this.#recordStorage.push(record);
  }
}