import { IFileStorage } from './IFileStorage';
import { Record } from '../src/types/Record';

export class FileStorageFake implements IFileStorage {
  #recordStorage = [];

  constructor(data: Record[]) {
    this.#recordStorage = [...data];
  }

  readFile() {
    return { records: this.#recordStorage };
  }

  writeFile(filePath: string, data: { records: Record[] }) {
    this.#recordStorage = [...data.records];
  }
}