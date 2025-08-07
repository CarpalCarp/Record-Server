import type { Record } from '../../types/Record';
import { Controller, Route, SuccessResponse, Tags, Response, Path, Body, Put } from 'tsoa';
import { FileStorage } from '../../../storage/FileStorage';
import { IFileStorage } from '../../../storage/IFileStorage';
import { UnreachableCaseError } from '../../shared/UnreachableCaseError';

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
    const deps = {
      fileStorage: new FileStorage()
    };

    const result = updateRecord(deps, id, body);
    if (result.type === 'ok') {
      this.setStatus(200);
      return { message: result.message };
    } else if (result.type === 'badRequest') {
      this.setStatus(400);
      return { message: result.message };
    } else if (result.type === 'notFound') {
      this.setStatus(404);
      return { message: result.message };
    } else {
      throw new UnreachableCaseError();
    }

  }
}

interface Dependencies {
  fileStorage: IFileStorage
}

type Exits = { type: 'ok', message: string } |
{ type: 'badRequest', message: string } |
{ type: 'notFound', message: string };

const updateRecord = (deps: Dependencies, id: number, body: Record): Exits => {
  const data = deps.fileStorage.readFile('./data/records.json');
  const dataClone = structuredClone(data);
  const record = dataClone.records.find((record: Record) => record.id === id);
  const index = dataClone.records.indexOf(record);

  if (index === -1) {
    return { type: 'notFound', message: 'Record not found' };
  }

  dataClone.records[index] = body;
  deps.fileStorage.writeFile('./data/records.json', dataClone);
  return { type: 'ok', message: `Record with id: ${id} updated` };
}
