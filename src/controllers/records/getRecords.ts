import { Controller, Get, Route, SuccessResponse, Tags } from 'tsoa';
import { Record } from '../../types/Record';
import { RecordStorage } from '../../storage/RecordStorage.ts';
import { IRecordStorage } from '../../storage/IRecordStorage.ts';

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
      recordStorage: new RecordStorage()
    };
    const result = getRecords(deps);

    this.setStatus(200);
    return result.value;
  }
}

interface Dependencies {
  recordStorage: IRecordStorage
}

type Exits = { type: 'ok', value: Record[] };

export const getRecords = (deps: Dependencies): Exits => {
  return deps.recordStorage.getRecords();
}
