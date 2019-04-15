import {Moment} from 'moment';

// export class GradingDates {
//     constructor(
//         public date: Moment,
//         public grade: number
//     ) {}
// }

export interface GradingDatesModel {
      date: Moment;
      grade: number;
}
