import { classType } from './class-types';
import { NameModel } from './name';
import { GradingDatesModel } from './grading-dates';

// export class Student {
//     constructor(
//         public name: Name,
//         public hbId: string,
//         public email: string,
//         public grade: number,
//         public isAdmin: boolean,
//         public gradingDates: GradingDates [],
//         public isActive: boolean,
//         public preferredClass: string
//     ) {}
// }


export interface StudentModel {
    name: NameModel;
    hbId: string;
    email: string;
    grade: number;
    isAdmin: boolean;
    gradingDates?: GradingDatesModel [];
    isActive: boolean;
    preferredClass: classType;
}
