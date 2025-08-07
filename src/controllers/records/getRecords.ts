import { Controller, Get, Route, SuccessResponse, Tags } from 'tsoa';
import { Record } from '../../types/Record';
import { FileStorage } from '../../../storage/FileStorage';

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
    const deps = {
      fileStorage: new FileStorage()
    };
    const data = deps.fileStorage.readFile('./data/records.json');
    return data.records;
  }
}
