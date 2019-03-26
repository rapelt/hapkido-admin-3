import {TestBed, inject} from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { GradeHelper } from './grade';

describe('Grade Provider', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        GradeHelper,
      ]
    });
  });

  it('getLongDisplayName should return Yellow 1 when 1 is parameter', inject([GradeHelper], (gradeProvider: GradeHelper) => {
    expect(gradeProvider.getLongDisplayName(1)).toBe('Yellow 1');
  }));

  it('getLongDisplayName should return Yellow 1 when 1 is parameter', inject([GradeHelper], (gradeProvider: GradeHelper) => {
    expect(gradeProvider.getShortDisplayName(1)).toBe('Y1');
  }));

  it('getLongDisplayName should return Yellow 1 when 1 is parameter', inject([GradeHelper], (gradeProvider: GradeHelper) => {
    expect(gradeProvider.getCssClass(1)).toBe('yellow');
  }));

  it('getLongDisplayName should return Yellow 1 when 1 is parameter', inject([GradeHelper], (gradeProvider: GradeHelper) => {
    expect(gradeProvider.getAllGrades().length).toBe(19);
  }));

});
