import { Body, Controller, Example, Post, Response, Route, SuccessResponse, Tags } from 'tsoa';
import { Record } from '../../types/Record';
import { RecordStorage } from '../../storage/RecordStorage.ts';
import { IRecordStorage } from '../../storage/IRecordStorage.ts';
import { UnreachableCaseError } from '../../util/UnreachableCaseError.ts';

const recordExample = {
  record: {
    id: 50,
    firstName: 'John',
    lastName: 'Doe',
    age: 35,
    description: 'Some description',
    dateOfBirth: '07/15/1990',
    email: 'john@gmail.com',
    phone: '801-445-7495',
    street: '123 S 456 W',
    city: 'Denver',
    state: 'Colorado',
    zip: 84615
  }
}

@Route('/records')
export class AddRecordController extends Controller {
  /**
   * Add a patient record
   * @param body The patient record to add
   */
  @Post()
  @Tags('Records')
  @Example(recordExample)
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
    @Body() body: { record: Record }
  ): Promise<{ message: Record | string }> {
    const deps = {
      recordStorage: new RecordStorage()
    };
    const result = addRecord(deps, body.record);
    if (result.type === 'ok') {
      this.setStatus(200);
      return { message: result.message };
    } else {
      throw new UnreachableCaseError();
    }
  }
}

interface Dependencies {
  recordStorage: IRecordStorage
}

type Exits = { type: 'ok', message: string };

export const addRecord = (deps: Dependencies, record: Record): Exits => {
  return deps.recordStorage.addRecord(record);
}
