import { IRecordStorage } from './IRecordStorage';
import { Record } from '../types/Record';

export class RecordStorageFake implements IRecordStorage {
  #recordStorage: Record[] = [];

  constructor(data: Record[]) {
    this.#recordStorage = [...data];
  }

  get contents() {
    return this.#recordStorage;
  }

  getRecords(): { type: 'ok', value: Record[] } {
    return { type: 'ok', value: this.#recordStorage };
  }

  getRecordById(id: string): { type: 'ok', value: Record } | { type: 'notFound', message: string } {
    const record = this.#recordStorage.find(record => record.id === parseInt(id));
    if (record) {
      return { type: 'ok', value: record };
    } else {
      return { type: 'notFound', message: `Record with id: ${id} not found.` };
    }
  }
  updateRecord(id: string, record: Record): { type: 'ok', message: string } | { type: 'notFound', message: string } {
    const index = this.#recordStorage.findIndex(record => record.id === parseInt(id));
    if (index !== -1) {
      this.#recordStorage[index] = { ...this.#recordStorage[index], ...record };
      return { type: 'ok', message: `Record with id: ${id} updated.` };
    } else {
      return { type: 'notFound', message: `Record with id: ${id} not found.` }
    }
  }

  deleteRecord(id: string): { type: 'ok', message: string } | { type: 'notFound', message: string } {
    const index = this.#recordStorage.findIndex(record => record.id === parseInt(id));
    if (index !== -1) {
      this.#recordStorage.splice(index, 1);
      return { type: 'ok', message: `Record with id: ${id} removed.` };
    } else {
      return { type: 'notFound', message: `Record with id: ${id} not found.` }
    }
  }

  addRecord(record: Record): { type: 'ok', message: string } {
    this.#recordStorage.push(record);
    return { type: 'ok', message: `Record with id: ${record.id} added.` };
  }
}