import { NameModel } from './name';

export interface AttendanceModel {
    hbId: string;
    name: NameModel;
    grade: number;
    isActive: boolean;
    attended: boolean;
}
