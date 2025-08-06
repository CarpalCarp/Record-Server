import type { Record } from '../../types/Record';
import fs from 'fs';
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
    const file = fs.readFileSync('./data/records.json', 'utf-8');
    const dataClone = structuredClone(JSON.parse(file));
    const record = dataClone.records.find((record: Record) => record.id === id);
    const index = dataClone.records.indexOf(record);

    if (index === -1) {
      this.setStatus(404);
      return { message: 'Record not found' };
    }

    dataClone.records.splice(index, 1);
    fs.writeFileSync('./data/records.json', JSON.stringify(dataClone, null, 2));
    this.setStatus(200);
    return { message: `Record with id: ${id} removed` };
  }
}
