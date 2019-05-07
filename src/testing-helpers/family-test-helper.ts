import { ClassTypes } from '../app/common/models/class-types';
import { FamilyModel } from '../app/common/models/family.model';
import { StudentModel } from '../app/common/models/student';
import * as moment from 'moment';

export function createFamily(): FamilyModel {
  return {
    family_id: 1,
    name: 'Higgins'
  };
}

export function createFamilyWithAll(id: number = 1, name: string = 'Higgins'): FamilyModel {
  return {
    family_id: id,
    name: name
  };
}


