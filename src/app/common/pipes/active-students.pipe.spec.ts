import { ActiveStudentPipe } from './active-students.pipe';
import { AttendanceFilterPipePipe } from './attendance-filter-pipe.pipe';

describe('ActiveStudentsPipe', () => {
    const attendance = [
        {
            hbId: 'hb001',
            isActive: false,
        },
        {
            hbId: 'hb002',
            isActive: true,
        },
        {
            hbId: 'hb003',
            isActive: false,
        },
    ];

    it('create an instance', () => {
        const pipe = new ActiveStudentPipe();
        expect(pipe).toBeTruthy();
    });

    it('should return enitre list if search is empty', () => {
        const pipe = new ActiveStudentPipe();
        // @ts-ignore
        const value = pipe.transform(attendance);
        expect(value.length).toEqual(1);
        expect(value).toEqual([attendance[1]]);
    });
});
