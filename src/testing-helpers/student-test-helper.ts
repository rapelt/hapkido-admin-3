import { ClassTypes } from '../app/students/models/class-types';
import { StudentModel } from '../app/students/models/student';

export function createStudent(): StudentModel {
  return {
    name: {
      firstname: '',
      lastname: ''
    },
    hbId: '',
    email: '',
    grade: 1,
    isAdmin: false,
    isActive: true,
    preferredClass: ClassTypes.Adults
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
    preferredClass: ClassTypes.Adults
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
  preferredClass = ClassTypes.Adults): StudentModel {
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
    preferredClass: preferredClass
  };
}


