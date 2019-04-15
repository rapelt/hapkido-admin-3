import { FamilyModel } from '../models/family.model';
import { AlphabeticalFamilyPipe } from './alphabetical-family.pipe';

describe('Alphabetical Family Pipe', () => {
  const familyArray: Array<FamilyModel> = [
    { id: 1, name: 'a'},
    { id: 3, name: 'c'},
    { id: 4, name: 'd'},
    { id: 2, name: 'b'}
  ];

  const expectedFamilyArray: Array<FamilyModel> = [
    { id: 1, name: 'a'},
    { id: 2, name: 'b'},
    { id: 3, name: 'c'},
    { id: 4, name: 'd'}
  ];


  it('create an instance', () => {
    const pipe = new AlphabeticalFamilyPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return an ordered array of students', () => {
    const pipe = new AlphabeticalFamilyPipe();
    const alphabeticalFamilies = pipe.transform(familyArray);
    expect(alphabeticalFamilies).toEqual(expectedFamilyArray);
  });


  it('should return null if array is null', () => {
    const a: Array<FamilyModel> = null;

    const pipe = new AlphabeticalFamilyPipe();
    const alphabeticalStudents = pipe.transform(a);
    expect(alphabeticalStudents).toBeNull();
  });
});
