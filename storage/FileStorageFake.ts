import { IFileStorage } from './IFileStorage';
import { Record } from '../src/types/Record';

export class FileStorageFake implements IFileStorage {
  #recordStorage: Record[] = [];

  constructor(data: Record[]) {
    this.#recordStorage = [...data];
  }

  get contents() {
    return this.#recordStorage;
  }

  readFile() {
    return { records: this.#recordStorage };
  }

  writeFile(filePath: string, data: { records: Record[] }) {
    this.#recordStorage = [...data.records];
  }
}