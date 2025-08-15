// import { verifyRecord } from '../../util/validate.ts';
import { Body, Controller, Post, Response, Route, SuccessResponse, Tags } from 'tsoa';
import { Record } from '../../types/Record';
import { FileStorage } from '../../storage/FileStorage.ts';
import { IFileStorage } from '../../storage/IFileStorage.ts';
import { UnreachableCaseError } from '../../shared/UnreachableCaseError.ts';

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
  @Response(
    400,
    'badRequest',
    'Invalid record submitted'
  )
  public async addRecordController(
    @Body() body: Record
  ): Promise<{ message: string }> {
    const deps = {
      fileStorage: new FileStorage()
    };

    const result = addRecord(deps, body);
    if (result.type === 'ok') {
      this.setStatus(200);
      return { message: result.message };
    } else {
      throw new UnreachableCaseError();
    }
  }
}

interface Dependencies {
  fileStorage: IFileStorage
}

type Exits = { type: 'ok', message: string };

export const addRecord = (deps: Dependencies, body: Record): Exits => {
  const data = deps.fileStorage.readFile('./data/records.json');
  const newRecords = [
    ...data.records,
    body
  ];

  deps.fileStorage.writeFile('./data/records.json', { records: newRecords });

  return { type: 'ok', message: `Record with id: ${body.id} added` };
}
