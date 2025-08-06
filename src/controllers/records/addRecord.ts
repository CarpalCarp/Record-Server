import { verifyRecord } from '../../util/validate.ts';
import fs from 'fs';
import { Body, Controller, Post, Route, SuccessResponse, Tags } from 'tsoa';
import { Record } from '../../types/Record';

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
  public async addRecordController(
    @Body() body: Record
  ): Promise<{ message: string }> {
    const result = verifyRecord(body);
    if (result.type !== 'ok') {
      this.setStatus(400);
      return { message: result.message };
    }
    const file = fs.readFileSync('./data/records.json', 'utf-8');
    const data = JSON.parse(file);
    const newRecords = [
      ...data.records,
      body
    ];

    fs.writeFileSync('./data/records.json', JSON.stringify({ records: newRecords }, null, 2));
    this.setStatus(200);
    return { message: `Record with id: ${body.id} added` };
  }
}
