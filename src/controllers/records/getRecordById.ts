import { RecordStorage } from '../../storage/RecordStorage.ts';
import { IRecordStorage } from '../../storage/IRecordStorage.ts';
import { UnreachableCaseError } from '../../util/UnreachableCaseError.ts';
import type { Record } from '../../types/Record';
import { Get, Route, SuccessResponse, Response, Tags, Path, Controller } from 'tsoa';

@Route('/records/{id}')
export class GetRecordByIdController extends Controller {
  /**
   * Get a patient record by ID
   * @param id The ID of the patient record to retrieve
   */
  @Get()
  @Tags('Records')
  @SuccessResponse(
    200,
    'OK',
    'Returns the patient record with the specified ID')
  @Response(
    404,
    'Not Found')
  public async getRecordByIdController(
    @Path() id: string
  ): Promise<Record | { message: string }> {
    const deps = {
      recordStorage: new RecordStorage()
    };

    const result = getRecordById(deps, id);
    if (result.type === 'ok') {
      this.setStatus(200);
      return result.value;
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

type Exits = { type: 'ok', value: Record } |
{ type: 'notFound', message: string };


export const getRecordById = (deps: Dependencies, id: string): Exits => {
  return deps.recordStorage.getRecordById(id);
}
