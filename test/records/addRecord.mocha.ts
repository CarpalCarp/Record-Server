import { expect } from 'chai';
import { FileStorageFake } from '../../storage/FileStorageFake';
import type { Record } from '../../src/types/Record';
import { addRecord } from '../../src/components/records/addRecord';

describe('Tests for updateRecord.ts', () => {
  const initialize = (records: Record[]) => {
    return {
      fileStorage: new FileStorageFake(records)
    };
  }

  it('should add a patientRecord', () => {
    const deps = initialize([]);
    const record = {
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

    const result = addRecord(deps, record);
    expect(result.type).to.equal('ok');
    expect(deps.fileStorage.contents.includes(record)).to.be.true;
  });
});
