import { StudentNameFilterPipe } from './student-name-filter.pipe';
import { AttendanceModel } from '../models/attendance.model';

describe('StudentNameFilterPipe', () => {
    const attendance = [
        {
            hbId: 'hb001',
            name: {
                firstname: 'a',
                lastname: 'z',
            },
        },
        {
            hbId: 'hb002',
            name: {
                firstname: 'b',
                lastname: 'y',
            },
        },
        {
            hbId: 'hb003',
            name: {
                firstname: 'c',
                lastname: 'x',
            },
        },
    ];

    it('create an instance', () => {
        const pipe = new StudentNameFilterPipe();
        expect(pipe).toBeTruthy();
    });

    it('should return enitre list if search is empty', () => {
        const pipe = new StudentNameFilterPipe();
        // @ts-ignore
        const value = pipe.transform(attendance, '');
        expect(value).toEqual(attendance);
    });

    it('should return student with first name a', () => {
        const pipe = new StudentNameFilterPipe();
        // @ts-ignore
        const value = pipe.transform(attendance, 'a');
        expect(value.length).toEqual(1);

        expect(value).toEqual([
            {
                hbId: 'hb001',
                name: {
                    firstname: 'a',
                    lastname: 'z',
                },
            },
        ]);
    });

    it('should return student with last name x', () => {
        const pipe = new StudentNameFilterPipe();
        // @ts-ignore
        const value = pipe.transform(attendance, 'x');
        expect(value.length).toEqual(1);

        expect(value).toEqual([
            {
                hbId: 'hb003',
                name: {
                    firstname: 'c',
                    lastname: 'x',
                },
            },
        ]);
    });

    it('should return empty list when no matches', () => {
        const pipe = new StudentNameFilterPipe();
        // @ts-ignore
        const value = pipe.transform(attendance, 'm');
        expect(value.length).toEqual(0);

        expect(value).toEqual([]);
    });
});
