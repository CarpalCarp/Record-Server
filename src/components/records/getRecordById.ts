import { FileStorage } from '../../storage/FileStorage';
import { IFileStorage } from '../../storage/IFileStorage';
import { UnreachableCaseError } from '../../shared/UnreachableCaseError';
import type { Record } from '../../types/Record';
import { Get, Route, SuccessResponse, Response, Tags, Path, Controller } from 'tsoa';

@Route('/app/records/{id}')
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
    @Path() id: number
  ): Promise<Record | { message: string }> {
    const deps = {
      fileStorage: new FileStorage()
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
  fileStorage: IFileStorage
}

type Exits = { type: 'ok', value: Record } |
{ type: 'notFound', message: string };


export const getRecordById = (deps: Dependencies, id: number): Exits => {
  const data = deps.fileStorage.readFile('./data/records.json');
  const record = data.records.find((record: Record) => record.id === id);

  if (record) {
    return { type: 'ok', value: record };
  } else {
    return { type: 'notFound', message: 'Record not found' };
  }
}
