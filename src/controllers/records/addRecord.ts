import { verifyRecord } from '../../util/validate.ts';
import { Body, Controller, Post, Route, SuccessResponse, Tags } from 'tsoa';
import { Record } from '../../types/Record';
import { FileStorage } from '../../../storage/FileStorage.ts';

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
    const deps = {
      fileStorage: new FileStorage()
    };

    const result = verifyRecord(body);
    if (result.type !== 'ok') {
      this.setStatus(400);
      return { message: result.message };
    }
    const data = deps.fileStorage.readFile('./data/records.json');
    const newRecords = [
      ...data.records,
      body
    ];

    deps.fileStorage.writeFile('./data/records.json', { records: newRecords });

    this.setStatus(200);
    return { message: `Record with id: ${body.id} added` };
  }
}
