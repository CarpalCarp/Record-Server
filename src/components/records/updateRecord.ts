import type { Record } from '../../types/Record';
import { Controller, Route, SuccessResponse, Tags, Response, Path, Body, Put } from 'tsoa';
import { RecordStorage } from '../../storage/RecordStorage';
import { IRecordStorage } from '../../storage/IRecordStorage.ts';
import { UnreachableCaseError } from '../../util/UnreachableCaseError.ts';

@Route('/app/records/{id}')
export class UpdateRecordController extends Controller {
  /**
  * Update a patient record
  * @param id The id of the patient record to update
  */
  @Put()
  @Tags('Records')
  @SuccessResponse(
    200,
    'OK'
  )
  @Response(
    404,
    'Not Found'
  )
  public async updateRecordController(
    @Path() id: string,
    @Body() body: { record: Omit<Record, 'id'> }
  ): Promise<{ message: string }> {
    const deps = {
      recordStorage: new RecordStorage()
    };

    const result = updateRecord(deps, id, body.record);
    if (result.type === 'ok') {
      this.setStatus(200);
      return { message: result.message };
    } else if (result.type === 'notFound') {
      this.setStatus(404);
      return { message: result.message };
    } else {
      throw new UnreachableCaseError();
    }

  }
}

interface Dependencies {
  recordStorage: IRecordStorage
}

type Exits = { type: 'ok', message: string } |
{ type: 'notFound', message: string };

export const updateRecord = (deps: Dependencies, id: string, record: Omit<Record, 'id'>): Exits => {
  deps.recordStorage.updateRecord(id, record);
  return { type: 'ok', message: `Record with id: ${id} updated` };
}
