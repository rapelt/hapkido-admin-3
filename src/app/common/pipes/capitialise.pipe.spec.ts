import { CapitialisePipe } from './capitialise.pipe';

describe('CapitialisePipe', () => {
  it('create an instance', () => {
    const pipe = new CapitialisePipe();
    expect(pipe).toBeTruthy();
  });

  it('should capitalise the first letter of a word and string', () => {
    const pipe = new CapitialisePipe();
    const string = pipe.transform('string');
    expect(string).toEqual('String');
  });
});
