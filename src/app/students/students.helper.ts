import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { StudentModel } from '../common/models/student';
import { GradingDatesModel } from '../common/models/grading-dates';
import { StudentsModule } from './students.module';

@Injectable({
    providedIn: 'root',
})
export class StudentsHelper {
    constructor() {}

    getGradingInformationForStudents(stu: StudentModel[], cls: Moment) {
        const studentsWhoGraded: StudentModel[] = stu.filter(student =>
            this.gradedToday(student, cls)
        );

        return studentsWhoGraded.map(student => {
            const beforeGrading = this.gradeBeforeGrading(student, cls);
            const afterGrading = this.gradeAfterGrading(student, cls);

            return {
                beforeGrading,
                afterGrading,
                hbId: student.hbId,
                name: {
                    firstname: student.name.firstname,
                    lastname: student.name.lastname,
                },
            };
        });
    }

    getGradingInformationForStudentsWithNoneGradedStudents(
        studentWhoAttended: StudentModel[],
        cls: Moment
    ) {
        return studentWhoAttended.map(student => {
            const beforeGrading = this.gradeBeforeGrading(student, cls);
            const afterGrading = this.gradeAfterGrading(student, cls);

            return {
                beforeGrading,
                afterGrading,
                hbId: student.hbId,
                name: {
                    firstname: student.name.firstname,
                    lastname: student.name.lastname,
                },
                didGrade: this.gradedToday(student, cls),
            };
        });
    }

    gradedToday(student: StudentModel, classDate: Moment) {
        const didGrade = student.gradingDates.find(grading => {
            if (moment(grading.date).isSame(classDate)) {
                return grading.grade > 0;
            }
            return false;
        });

        if (didGrade) {
            return true;
        }
        return false;
    }

    gradeBeforeGrading(student: StudentModel, classDate: Moment) {
        const grades = this.reverseOrderGrades(student.gradingDates);

        const grade = grades.find(grading => {
            if (moment(grading.date).isBefore(classDate)) {
                return true;
            }
            return false;
        });

        if (grade) {
            return grade.grade;
        }

        return null;
    }

    gradeAfterGrading(student: StudentModel, classDate: Moment) {
        const grades = this.reverseOrderGrades(student.gradingDates);

        const grade = grades.find(grading => {
            if (moment(grading.date).isSameOrBefore(classDate)) {
                return true;
            }
            return false;
        });

        if (grade) {
            return grade.grade;
        }

        return student.grade;
    }

    reverseOrderGrades(gradingDates: GradingDatesModel[]): GradingDatesModel[] {
        return gradingDates.sort((a, b) => {
            if (b.grade < a.grade) {
                return -1;
            } else if (a.grade < b.grade) {
                return 1;
            } else {
                return 0;
            }
        });
    }

    getStudentsByIds(hbIds: string[], students: StudentModel[]) {
        const attended: StudentModel[] = [];
        students.forEach(student => {
            hbIds.forEach(id => {
                if (student.hbId.toLowerCase() === id.toLowerCase()) {
                    attended.push(student);
                }
            });
        });

        return attended;
    }

    getStudentsById(hbId: string, students: StudentModel[]) {
        return students.find(
            stu => stu.hbId.toLowerCase() === hbId.toLowerCase()
        );
    }

    checkIfGradeAlreadyExists(student, number, classDate) {
        return student.gradingDates.find(grade => {
            if (
                this.gradeBeforeGrading(student, classDate) + number ===
                grade.grade
            ) {
                return true;
            }
            return false;
        });
    }
}
