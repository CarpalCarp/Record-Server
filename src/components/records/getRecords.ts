import { Controller, Get, Route, SuccessResponse, Tags } from 'tsoa';
import { Record } from '../../types/Record';
import { FileStorage } from '../../../storage/FileStorage';
import { IFileStorage } from '../../../storage/IFileStorage';

@Route('/app/records')
export class GetRecordsController extends Controller {
  /**
   * Get all patient records
   */
  @Get()
  @Tags('Records')
  @SuccessResponse(
    200,
    'OK',
    'Returns all patient records')
  public async getRecordsController(): Promise<Record[]> {
    const deps = {
      fileStorage: new FileStorage()
    };
    const result = getRecords(deps);

    this.setStatus(200);
    return result.value;
  }
}

interface Dependencies {
  fileStorage: IFileStorage
}

type Exits = { type: 'ok', value: Record[] };

export const getRecords = (deps: Dependencies): Exits => {
  const data = deps.fileStorage.readFile('./data/records.json');
  return { type: 'ok', value: data.records };
}
