import { ClassTypes } from '../app/common/models/class-types';
import { StudentModel } from '../app/common/models/student';
import * as moment from 'moment';

export function createStudent(): StudentModel {
  return {
    name: {
      firstname: 'Rebekah',
      lastname: 'Higgins'
    },
    hbId: 'hb088',
    email: 'rebekah@gmail.com',
    grade: 1,
    isAdmin: false,
    isActive: true,
    preferredClass: ClassTypes.Adults,
    gradingDates: [{ grade: 1, date: moment('01/02/19')}]
  };
}

export function createStudentWithName(firstname, lastname): StudentModel {
  return {
    name: {
      firstname: firstname,
      lastname: lastname
    },
    hbId: '',
    email: '',
    grade: 1,
    isAdmin: false,
    isActive: true,
    preferredClass: ClassTypes.Adults,
    gradingDates: [{ grade: 1, date: moment('01/02/19')}]
  };
}

export function createStudentAll(
  firstname = 'firstname',
  lastname = 'lastname',
  hbid = 'hb001',
  email = 'firstname.lastname@gmail.com',
  grade = 0,
  isAdmin = false,
  isActive = true,
  preferredClass = ClassTypes.Adults,
  gradingDates = [{ grade: 1, date: moment('01/02/19')}],
  familyId = 1
): StudentModel {
  return {
    name: {
      firstname: firstname,
      lastname: lastname
    },
    hbId: hbid,
    email: email,
    grade: grade,
    isAdmin: isAdmin,
    isActive: isActive,
    preferredClass: preferredClass,
    gradingDates: gradingDates,
    familyId: familyId
  };
}


