import { createSelector } from '@ngrx/store';
import {
    selectClassLoaded,
    selectSelectedClass,
} from '../app-store/classes-state/classes.selectors';
import {
    selectActiveStudents,
    selectStudentLoaded,
    selectStudents,
} from '../app-store/student-state/students.selectors';
import { StudentModel } from '../common/models/student';
import { ClassModel } from '../common/models/class';
import { AlphabeticalStudentsPipe } from '../common/pipes/alphabeticalstudents/alphabeticalstudents';
import { AttendanceModel } from '../common/models/attendance.model';

export const attendanceSelector = classId =>
    createSelector(
        selectStudents,
        selectSelectedClass(classId),
        (students: StudentModel[], aclass: ClassModel) => {
            const a = new AlphabeticalStudentsPipe();

            const s = students.map((student: StudentModel) => {
                return {
                    hbId: student.hbId,
                    grade: student.grade,
                    name: student.name,
                    isActive: student.isActive,
                    attended: aclass.attendance.includes(
                        student.hbId.toLowerCase()
                    ),
                };
            });

            return a.transform(s) as AttendanceModel[];
        }
    );

export const selectAttendanceloaded = createSelector(
    selectClassLoaded,
    selectStudentLoaded,
    (classLoaded, studentLoaded) => {
        return classLoaded && studentLoaded;
    }
);
