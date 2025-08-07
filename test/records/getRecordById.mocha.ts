import { expect } from 'chai';
import * as assert from 'assert';
import { FileStorageFake } from '../../storage/FileStorageFake';
import type { Record } from '../../src/types/Record';
import { getRecordById } from '../../src/components/records/getRecordById';

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

describe('Tests for getRecordById.ts', () => {

  const initialize = (records: Record[]) => {
    return {
      fileStorage: new FileStorageFake(records)
    };
  }

  it('should return a record by its id', () => {
    const deps = initialize([
      defaultRecord
    ]);

    const result = getRecordById(deps, 1);
    expect(result.type).to.equal('ok');
    assert.strictEqual(result.type, 'ok');
    expect(result.value).to.equal(defaultRecord);
  });

  it('should return not found if given id which matches no record', () => {
    const deps = initialize([
      defaultRecord
    ]);

    const result = getRecordById(deps, 123);
    expect(result.type).to.equal('notFound');
  });
});
