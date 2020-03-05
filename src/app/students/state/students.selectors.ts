import {
    createFeatureSelector,
    createSelector,
    MemoizedSelectorWithProps,
} from '@ngrx/store';
import { getClassState } from '../../classes/state/classes.selectors';
import { StudentModel } from '../../common/models/student';
import { StudentsState } from './students.reducers';
import * as fromStudents from './students.reducers';
import * as moment from 'moment';

export const getStudentsState = createFeatureSelector<StudentsState>(
    fromStudents.STUDENTS_FEATURE_NAME
);

export const selectActiveStudents = createSelector(
    getStudentsState,
    studentsState => {
        return studentsState.students.filter((student: StudentModel) => {
            return student.isActive;
        });
    }
);

export const selectInactiveStudents = createSelector(
    getStudentsState,
    studentsState => {
        return studentsState.students.filter((student: StudentModel) => {
            return !student.isActive;
        });
    }
);

export const selectStudents = createSelector(
    getStudentsState,
    studentsState => {
        return studentsState.students;
    }
);

export const selectFamilies = createSelector(
    getStudentsState,
    studentsState => {
        return studentsState.families;
    }
);

export const selectSelectedStudent = (id: string) =>
    createSelector(getStudentsState, studentsState => {
        if (studentsState.students.length === 0) {
            return null;
        }

        return studentsState.students.find(s => {
            return s.hbId.toLowerCase() === id.toLowerCase();
        });
    });

export const selectSelectedStudentGradingDates = (id: string) =>
    createSelector(getStudentsState, studentsState => {
        const student = studentsState.students.find(s => {
            return s.hbId.toLowerCase() === id.toLowerCase();
        });

        return student.gradingDates;
    });

export const selectSelectedStudentClassDates = (id: string) =>
    createSelector(
        getStudentsState,
        getClassState,
        (studentsState, classState) => {
            return classState.classes.filter(aclass => {
                const didAttendClass = aclass.attendance.find(student => {
                    return student.toLowerCase() === id.toLowerCase();
                });

                return !!didAttendClass;
            });
        }
    );

export const selectStudentsWhoAttendedClass = (studentIds: string[]) =>
    createSelector(getStudentsState, studentsState => {
        return studentIds.map(id => {
            return studentsState.students.find(s => {
                return s.hbId.toLowerCase() === id.toLowerCase();
            });
        });
    });

export const selectStudentsWhoAttendedClass2 = createSelector(
    getStudentsState,
    (studentState, props) => {
        return props.studentIds.map(id => {
            return studentState.students.find(s => {
                return s.hbId.toLowerCase() === id.toLowerCase();
            });
        });
    }
);

export const selectStudentsWhoDidntAttendedClass = (studentIds: string[]) =>
    createSelector(getStudentsState, studentsState => {
        return studentsState.students.filter((student: StudentModel) => {
            return (
                studentIds
                    .map(studentId => studentId.toLowerCase())
                    .indexOf(student.hbId.toLowerCase()) < 0
            );
        });
    });

export const selectSelectedStudentFamilyMembers = (studentId: string) =>
    createSelector(getStudentsState, studentsState => {
        const student = studentsState.students.find(s => {
            return s.hbId === studentId;
        });

        let familyMembers = null;

        if (student) {
            familyMembers = studentsState.students.filter(f => {
                return (
                    f.familyId &&
                    f.familyId === student.familyId &&
                    f.hbId !== student.hbId
                );
            });
        }

        return familyMembers;
    });

export const selectSelectedStudentsLastClass = (id: string) =>
    createSelector(
        getStudentsState,
        getClassState,
        (studentsState, classState) => {
            const classes = classState.classes.filter(aclass => {
                const didAttendClass = aclass.attendance.find(student => {
                    return student.toLowerCase() === id.toLowerCase();
                });

                return !!didAttendClass;
            });

            classes.sort((a, b) => {
                if (moment(a.date).isBefore(moment(b.date))) {
                    return 1;
                }
                if (moment(a.date).isAfter(moment(b.date))) {
                    return -1;
                }
                return 0;
            });

            return classes[0];
        }
    );
