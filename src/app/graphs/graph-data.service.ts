import { Injectable } from '@angular/core';
import { GraphDataHttp } from './graph-data.http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Moment } from 'moment';
import * as moment from 'moment';
import { start } from 'repl';

@Injectable({
    providedIn: 'root',
})
export class GraphDataService {
    constructor(private graphDataHttp: GraphDataHttp) {}

    onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    getColumnHeaders(classes) {
        let colHeaders = [];
        colHeaders.push('Class Type');
        colHeaders.push('Name');

        let dates = [];

        classes.map(aclass => {
            const date = moment(
                moment(aclass.date)
                    .startOf('day')
                    .format()
            );
            dates.push(date);
        });

        dates.sort((a, b) => {
            if (a.isBefore(b)) {
                return -1;
            }
            if (a.isAfter(b)) {
                return 1;
            }
            return 0;
        });

        dates = dates.map(date => {
            return date.format('ddd, DD/MMM/YY');
        });

        const uniqueDates = dates.filter(this.onlyUnique);

        colHeaders = [...colHeaders, ...uniqueDates];
        colHeaders.push('Total');

        return colHeaders;
    }

    createNewStudentObject(student, colHeaders) {
        const newObject = {};

        colHeaders.map(header => {
            if (header === 'Name') {
                newObject[header] = student.name;
                return;
            }

            if (header === 'Class Type') {
                newObject[header] = student.classType;
                return;
            }

            newObject[header] = null;
        });

        return newObject;
    }

    filterOutEmptyClasses(classes) {
        return classes.filter(aclass => aclass.attendance.length > 0);
    }

    createEmptyStudentObjects(students, colHeaders): Map<string, any> {
        const studentSet: Map<string, any> = new Map();

        students.map(student => {
            studentSet.set(
                student.hbId,
                this.createNewStudentObject(student, colHeaders)
            );
        });

        return studentSet;
    }

    calculateStudentTotals(studentSet): any[] {
        return [...studentSet].map(set => {
            const studentData = set[1];
            studentData['Total'] = this.calculateTotalsForAllClasses(
                studentData
            );
            return studentData;
        });
    }

    calculateTotalsForAllClasses(studentData): number {
        let total = 0;
        Object.values(studentData).map((eachClass: any) => {
            if (!isNaN(eachClass)) {
                total = total + eachClass;
            }
        });
        return total;
    }

    getGraphData(startDate, endDate): Observable<any> {
        return this.graphDataHttp
            .getDataBetweenDates({ start: startDate, finish: endDate })
            .pipe(
                map((data: { classes: any; students: any }) => {
                    data.classes = this.filterOutEmptyClasses(data.classes);
                    const colHeaders = this.getColumnHeaders(data.classes);
                    const studentSet = this.createEmptyStudentObjects(
                        data.students,
                        colHeaders
                    );

                    const totals = this.createNewStudentObject(
                        { name: 'Total', classType: '' },
                        colHeaders
                    );

                    const totalFamily = this.createNewStudentObject(
                        { name: 'Total Family', classType: 'Family' },
                        colHeaders
                    );

                    const visitors = this.createNewStudentObject(
                        { name: 'Visitors', classType: 'Visitors' },
                        colHeaders
                    );

                    const totalAdult = this.createNewStudentObject(
                        { name: 'Total Adult', classType: 'Adults' },
                        colHeaders
                    );

                    data.classes.map(aclass => {
                        const classDate = this.getClassDateString(aclass);
                        aclass.attendance.map(hbId => {
                            const student = studentSet.get(hbId);
                            // Add visitors attendance
                            if (student.Name.includes('Visitor')) {
                                visitors[classDate] = visitors[classDate] + 1;

                                totals[classDate] = totals[classDate] + 1;

                                if (student['Class Type'] === 'Family') {
                                    totalFamily[classDate] =
                                        totalFamily[classDate] + 1;
                                }

                                if (student['Class Type'] === 'Adults') {
                                    totalAdult[classDate] =
                                        totalAdult[classDate] + 1;
                                }

                                return;
                            }

                            // Add student attendance
                            if (student[classDate] !== 1) {
                                student[classDate] = 1;
                                totals[classDate] = totals[classDate] + 1;

                                if (student['Class Type'] === 'Family') {
                                    totalFamily[classDate] =
                                        totalFamily[classDate] + 1;
                                }

                                if (student['Class Type'] === 'Adults') {
                                    totalAdult[classDate] =
                                        totalAdult[classDate] + 1;
                                }
                            }
                        });
                    });

                    // For each student calculate the total classes attended
                    let dataset: any[] = this.calculateStudentTotals(
                        studentSet
                    );

                    // Calculate the total visitors across all classes
                    visitors['Total'] = this.calculateTotalsForAllClasses(
                        visitors
                    );

                    // Filter out students who attended 0 classes
                    dataset = dataset.filter(student => student.Total > 0);

                    // Filter out visitors because they have been added to a visitors total
                    dataset = dataset.filter(
                        student => !student.Name.includes('Visitor')
                    );

                    dataset.push(visitors);
                    dataset.push(totals);
                    dataset.push(totalFamily);
                    dataset.push(totalAdult);

                    return {
                        dataset: dataset,
                        colHeaders: colHeaders,
                    };
                })
            );
    }

    getClassDateString(aclass) {
        const date = moment(
            moment(aclass.date)
                .startOf('day')
                .format()
        );

        return date.format('ddd, DD/MMM/YY');
    }
}
