import { FileStorage } from '../../../storage/FileStorage';
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
    @Path() id: string
  ): Promise<Record[] | { message: string }> {
    const deps = {
      fileStorage: new FileStorage()
    };
    const data = deps.fileStorage.readFile('./data/records.json');
    const record = data.records.find((record: Record) => record.id === parseInt(id));

    if (record) {
      this.setStatus(200);
      return record;
    } else {
      this.setStatus(404);
      return { message: 'Record not found' }
    }
  }
}
