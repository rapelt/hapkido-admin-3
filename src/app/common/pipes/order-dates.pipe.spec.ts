import { createClassWithAll } from '../../../testing-helpers/class-test-helper';
import { OrderDatesPipe } from './order-dates.pipe';
import * as moment from 'moment';

describe('OrderDatesPipe', () => {
  const class1 = createClassWithAll('1', null, null, null, moment('01/02/18'), null);
  const class2 = createClassWithAll('2', null, null, null, moment('02/02/18'), null);
  const class3 = createClassWithAll('3', null, null, null, moment('03/02/18'), null);
  const class4 = createClassWithAll('4', null, null, null, moment('04/02/18'), null);
  const class5 = createClassWithAll('5', null, null, null, moment('05/02/18'), null);

    const unorderedDates = [
      class2,
      class4,
      class1,
      class5,
      class3
  ];

  const expectedAscendingDates = [
    class1,
    class2,
    class3,
    class4,
    class5
  ];

  const expectedDescendingDates = [
    class5,
    class4,
    class3,
    class2,
    class1
  ];




  it('create an instance', () => {
    const pipe = new OrderDatesPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return an ordered array of students in ascending order', () => {
    const pipe = new OrderDatesPipe();
    const ascendingDates = pipe.transform(unorderedDates, null);
    expect(ascendingDates).toEqual(expectedAscendingDates);
  });

  it('should return an ordered array of students in descending order', () => {
    const pipe = new OrderDatesPipe();
    const descendingDates = pipe.transform(unorderedDates, 'descending');
    expect(descendingDates).toEqual(expectedDescendingDates);
  });
});
