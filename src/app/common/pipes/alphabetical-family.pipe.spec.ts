import { FamilyModel } from '../models/family.model';
import { AlphabeticalFamilyPipe } from './alphabetical-family.pipe';

fdescribe('Alphabetical Family Pipe', () => {
    const familyArray: FamilyModel[] = [
        { family_id: 1, name: 'a' },
        { family_id: 3, name: 'c' },
        { family_id: 4, name: 'd' },
        { family_id: 2, name: 'b' },
    ];

    const expectedFamilyArray: FamilyModel[] = [
        { family_id: 1, name: 'a' },
        { family_id: 2, name: 'b' },
        { family_id: 3, name: 'c' },
        { family_id: 4, name: 'd' },
    ];

    it('create an instance', () => {
        const pipe = new AlphabeticalFamilyPipe();
        expect(pipe).toBeTruthy();
    });

    it('should return an ordered array of students', () => {
        const pipe = new AlphabeticalFamilyPipe();
        const alphabeticalFamilies = pipe.transform(familyArray);
        expect(alphabeticalFamilies).toEqual(expectedFamilyArray);
    });

    it('should return null if array is null', () => {
        const a: FamilyModel[] = null;

        const pipe = new AlphabeticalFamilyPipe();
        const alphabeticalStudents = pipe.transform(a);
        expect(alphabeticalStudents).toBeNull();
    });
});
