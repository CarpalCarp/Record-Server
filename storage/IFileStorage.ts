import { Record } from '../src/types/Record';

export interface IFileStorage {
  readFile(filePath: string): { records: Record[] }
  writeFile(filePath: string, data: { records: Record[] }): void
}
