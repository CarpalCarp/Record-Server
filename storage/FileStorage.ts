import fs from 'fs';

export class FileStorage {

  readFile(filePath: string) {
    const file = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(file);
  }

  writeFile(filePath: string, data: any) {
    const _data = JSON.stringify(data);
    fs.writeFileSync(filePath, _data);
  }
}
