export interface IFileStorage {
  readFile(filePath: string): any
  writeFile(filePath: string, data: any): void
}
