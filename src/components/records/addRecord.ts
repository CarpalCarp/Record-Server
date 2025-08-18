import { Body, Controller, Post, Response, Route, SuccessResponse, Tags } from 'tsoa';
import { Record } from '../../types/Record';
import { RecordStorage } from '../../storage/RecordStorage.ts';
import { IRecordStorage } from '../../storage/IRecordStorage.ts';
import { UnreachableCaseError } from '../../util/UnreachableCaseError.ts';

@Route('/app/records')
export class AddRecordController extends Controller {
  /**
   * Add a patient record
   */
  @Post()
  @Tags('Records')
  @SuccessResponse(
    200,
    'OK'
  )
  @Response(
    400,
    'badRequest',
    'Invalid record submitted'
  )
  public async addRecordController(
    @Body() body: { record: Record }
  ): Promise<{ message: string }> {
    const deps = {
      recordStorage: new RecordStorage()
    };

    const result = addRecord(deps, body.record);
    if (result.type === 'ok') {
      this.setStatus(200);
      return { message: result.message };
    } else {
      throw new UnreachableCaseError();
    }
  }
}

interface Dependencies {
  recordStorage: IRecordStorage
}

type Exits = { type: 'ok', message: string };

export const addRecord = (deps: Dependencies, record: Record): Exits => {
  deps.recordStorage.addRecord(record);

  return { type: 'ok', message: `Record with id: ${record.id} added` };
}
