import { RecordStorage } from '../../storage/RecordStorage.ts';
import { IRecordStorage } from '../../storage/IRecordStorage.ts';
import { UnreachableCaseError } from '../../util/UnreachableCaseError.ts';
import { Controller, Delete, Route, SuccessResponse, Tags, Response, Path } from 'tsoa';

@Route('/app/records/:id')
export class DeleteRecordController extends Controller {
  /**
   * Removed a patient record
   * @param id The ID of the patient record to remove
   */
  @Delete()
  @Tags('Records')
  @SuccessResponse(
    200,
    'OK'
  )
  @Response(
    404,
    'Record not found'
  )
  public async deleteRecordController(
    @Path() id: string
  ): Promise<{ message: string }> {
    const deps = {
      recordStorage: new RecordStorage()
    };

    const result = deleteRecord(deps, id);
    if (result.type === 'ok') {
      this.setStatus(200);
      return { message: result.message };
    } if (result.type === 'notFound') {
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

export const deleteRecord = (deps: Dependencies, id: string): Exits => {
  return deps.recordStorage.deleteRecord(id);
}
