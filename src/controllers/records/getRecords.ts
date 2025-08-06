import fs from 'fs';
import { Controller, Get, Route, SuccessResponse, Tags } from 'tsoa';
import { Record } from '../../types/Record';

@Route('/app/records')
export class GetRecordsController extends Controller {
  /**
   * Get all patient records
   */
  @Get()
  @Tags('Records')
  @SuccessResponse(
    200,
    'OK',
    'Returns all patient records')
  public async getRecordsController(): Promise<Record[]> {
    const file = fs.readFileSync('./data/records.json', 'utf-8');
    const data = JSON.parse(file);
    return data.records;
  }
}
