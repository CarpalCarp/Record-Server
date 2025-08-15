import { expect } from 'chai';
import { FileStorageFake } from '../../storage/FileStorageFake';
import type { Record } from '../../types/Record';
import { getRecords } from '../../components/records/getRecords';

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

describe('Tests for getRecords.ts', () => {
  const initialize = (records: Record[]) => {
    return {
      fileStorage: new FileStorageFake(records)
    };
  }

  it('should update a patient record', () => {
    const deps = initialize([
      defaultRecord
    ]);

    const result = getRecords(deps);
    expect(result.type).to.equal('ok');
    expect(result.value).to.eql([defaultRecord]); // deep equality check using .eql()
  });
});
