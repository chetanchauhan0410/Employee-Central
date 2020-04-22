import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {

  it('should create an instance', () => { 
    const pipe = new CapitalizePipe();
    expect(pipe).toBeTruthy();
  });

  it('should capitalize first letter of each word in given value',() =>
  {
    const pipe = new CapitalizePipe();
    expect(pipe.transform('ryan kennedy')).toBe('Ryan Kennedy');
  });
});
