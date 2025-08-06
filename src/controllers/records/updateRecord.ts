import type { Record } from '../../types/Record';
import fs from 'fs';
import { Controller, Route, SuccessResponse, Tags, Response, Path, Body, Put } from 'tsoa';
import { verifyRecord } from '../../util/validate';

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
    @Path() id: number,
    @Body() body: Record
  ): Promise<any> {
    const result = verifyRecord(body);
    if (result.type !== 'ok') {
      this.setStatus(400);
      return { message: result.message };
    }

    const file = fs.readFileSync('./data/records.json', 'utf-8');
    const dataClone = structuredClone(JSON.parse(file));
    const record = dataClone.records.find((record: Record) => record.id === id);
    const index = dataClone.records.indexOf(record);

    if (index === -1) {
      this.setStatus(404);
      return { message: 'Record not found' };
    }

    dataClone.records[index] = body;
    fs.writeFileSync('./data/records.json', JSON.stringify(dataClone, null, 2));
    this.setStatus(200);
    return { message: `Record with id: ${id} updated` };
  }
}
