import { Moment } from 'moment';
import * as moment from 'moment';
import { ClassModel } from '../app/common/models/class';
import { ClassTypes } from '../app/common/models/class-types';

export function createClass(): ClassModel {
    return {
        classId: '1',
        classType: 'Adults',
        attendance: ['hb001'],
        isGrading: false,
        date: moment(),
        startTime: '16:00',
    };
}

export function createClassWithDate(date: Moment): ClassModel {
    return {
        classId: '1',
        classType: 'Adults',
        attendance: [],
        isGrading: false,
        date: date,
        startTime: '16:00',
    };
}

export function createClassWithAll(
    classId = '1',
    classType = ClassTypes.Adults,
    attendance = ['hb088', 'hb001'],
    isGrading = false,
    date = moment(),
    startTime = '16:00'
): ClassModel {
    return {
        classId: classId,
        classType: classType,
        attendance: attendance,
        isGrading: isGrading,
        date: date,
        startTime: startTime,
    };
}
