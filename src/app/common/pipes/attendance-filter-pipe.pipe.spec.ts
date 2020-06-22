import { AttendanceFilterPipePipe } from './attendance-filter-pipe.pipe';
import { StudentNameFilterPipe } from './student-name-filter.pipe';

describe('AttendanceFilterPipePipe', () => {
    const attendance = [
        {
            hbId: 'hb001',
            attended: true,
        },
        {
            hbId: 'hb002',
            attended: true,
        },
        {
            hbId: 'hb003',
            attended: false,
        },
    ];

    it('create an instance', () => {
        const pipe = new AttendanceFilterPipePipe();
        expect(pipe).toBeTruthy();
    });

    it('should return enitre list if search is empty', () => {
        const pipe = new AttendanceFilterPipePipe();
        // @ts-ignore
        const value = pipe.transform(attendance);
        expect(value.length).toEqual(2);
        expect(value).toEqual([attendance[0], attendance[1]]);
    });
});
