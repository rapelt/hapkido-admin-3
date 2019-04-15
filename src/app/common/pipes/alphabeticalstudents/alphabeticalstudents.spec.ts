import { createStudent, createStudentWithName } from '../../../../testing-helpers/student-test-helper';
import { StudentModel } from '../../models/student';
import { AlphabeticalStudentsPipe } from './alphabeticalstudents';

describe('Alphabetical Pipe', () => {
  const studentsArray: Array<StudentModel> = [
    createStudentWithName('b', 'b'),
    createStudentWithName('c', 'c'),
    createStudentWithName('a', 'a')
  ];

  const expectedStudentsArray: Array<StudentModel> = [
    createStudentWithName('a', 'a'),
    createStudentWithName('b', 'b'),
    createStudentWithName('c', 'c')
  ];


  it('create an instance', () => {
    const pipe = new AlphabeticalStudentsPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return an ordered array of students', () => {
    const pipe = new AlphabeticalStudentsPipe();
    const alphabeticalStudents = pipe.transform(studentsArray);
    expect(alphabeticalStudents).toEqual(expectedStudentsArray);
  });

  it('should return students in same order if same name', () => {
    const a: Array<StudentModel> = [
      createStudentWithName('b', 'b'),
      createStudentWithName('b', 'b'),
    ];

    const b: Array<StudentModel> = [
      createStudentWithName('b', 'b'),
      createStudentWithName('b', 'b'),
    ];

    const pipe = new AlphabeticalStudentsPipe();
    const alphabeticalStudents = pipe.transform(a);
    expect(alphabeticalStudents).toEqual(b);
  });

  it('should return null if array is null', () => {
    const a: Array<StudentModel> = null;

    const pipe = new AlphabeticalStudentsPipe();
    const alphabeticalStudents = pipe.transform(a);
    expect(alphabeticalStudents).toBeNull();
  });
});
