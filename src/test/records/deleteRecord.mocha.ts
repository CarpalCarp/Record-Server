import { expect } from 'chai';
import { RecordStorageFake } from '../../storage/RecordStorageFake';
import type { Record } from '../../types/Record';
import { deleteRecord } from '../../components/records/deleteRecord';

const defaultRecord = {
  'id': 1,
  'firstName': 'John',
  'lastName': 'Doe',
  'age': 30,
  'description': 'This is the first record.',
  'dateOfBirth': '04/15/1994',
  'details': {
    'email': 'johnDoe@gmail.com',
    'phone': '123-456-7890',
    'address': {
      'street': '123 Main St',
      'city': 'Anytown',
      'state': 'CA',
      'zip': 12345
    }
  }
};

describe('Tests for deleteRecord.ts', () => {
  const initialize = (records: Record[]) => {
    return {
      fileStorage: new RecordStorageFake(records)
    }
  };

  it('should remove a patient record', () => {
    const deps = initialize([
      defaultRecord
    ]);

    const result = deleteRecord(deps, 1);
    expect(result.type).to.equal('ok');
    expect(deps.fileStorage.contents.includes(defaultRecord)).to.be.false;
  });

  it('should return not found if patient record does not exist', () => {
    const deps = initialize([
      defaultRecord
    ]);

    const result = deleteRecord(deps, 123); // 123 does not exist
    expect(result.type).to.equal('notFound');
  });
});
