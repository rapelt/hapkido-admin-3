import { Moment } from 'moment';

export interface ClassModel {
  classId: string;
  classType: string;
  attendance: Array<string>;
  isGrading: boolean;
  date: Moment;
  startTime: string;
}
