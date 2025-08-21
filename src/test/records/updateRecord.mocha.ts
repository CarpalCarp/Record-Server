import { expect } from 'chai';
import { updateRecord } from '../../components/records/updateRecord';
import { RecordStorageFake } from '../../storage/RecordStorageFake';
import type { Record } from '../../types/Record';

const defaultRecord = {
  'id': 1,
  'firstName': 'John',
  'lastName': 'Doe',
  'age': 30,
  'description': 'This is the first record.',
  'dateOfBirth': '04/15/1994',
  'email': 'johnDoe@gmail.com',
  'phone': '123-456-7890',
  'street': '123 Main St',
  'city': 'Anytown',
  'state': 'CA',
  'zip': 12345
};

describe('Tests for updateRecord.ts', () => {

  const initialize = (records: Record[]) => {
    return {
      recordStorage: new RecordStorageFake(records)
    };
  }

  it('should update a patient record', () => {
    const deps = initialize([
      defaultRecord
    ]);

    const update = {
      'id': 1,
      'firstName': 'Shrek',
      'lastName': 'Doe',
      'age': 30,
      'description': 'This is an updated record.',
      'dateOfBirth': '04/15/1994',
      'email': 'johnDoe@gmail.com',
      'phone': '123-456-7890',
      'street': '123 Main St',
      'city': 'Anytown',
      'state': 'CA',
      'zip': 12345
    };

    expect(deps.recordStorage.contents[0].firstName).to.equal('John');
    expect(deps.recordStorage.contents[0].description).to.equal('This is the first record.');
    const result = updateRecord(deps, '1', update);
    expect(result.type).to.equal('ok');
    expect(deps.recordStorage.contents[0].firstName).to.equal('Shrek');
    expect(deps.recordStorage.contents[0].description).to.equal('This is an updated record.');
  });

  it('should return not found when record does not exist', () => {
    const deps = initialize([
      defaultRecord
    ]);
    const nonExistantId = '123';

    const update = {
      'id': nonExistantId,
      'firstName': 'Shrek',
      'lastName': 'Doe',
      'age': 30,
      'description': 'This is an updated record.',
      'dateOfBirth': '04/15/1994',
      'email': 'johnDoe@gmail.com',
      'phone': '123-456-7890',
      'street': '123 Main St',
      'city': 'Anytown',
      'state': 'CA',
      'zip': 12345
    };

    const result = updateRecord(deps, nonExistantId, update); // 123 does not exist
    expect(result.type).to.equal('notFound');
  });
});
