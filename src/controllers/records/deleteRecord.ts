import { FileStorage } from '../../../storage/FileStorage';
import type { Record } from '../../types/Record';
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
    @Path() id: number
  ): Promise<{ message: string }> {
    const deps = {
      fileStorage: new FileStorage()
    };

    const data = deps.fileStorage.readFile('./data/records.json');
    const dataClone = structuredClone(data);
    const record = dataClone.records.find((record: Record) => record.id === id);
    const index = dataClone.records.indexOf(record);

    if (index === -1) {
      this.setStatus(404);
      return { message: 'Record not found' };
    }

    dataClone.records.splice(index, 1);
    deps.fileStorage.writeFile('./data/records.json', dataClone);
    this.setStatus(200);
    return { message: `Record with id: ${id} removed` };
  }
}
