import { numberToFrames } from '../numberToFrames';
import { Digits } from '../Digits';

describe('numberToFrames', () => {
  it('should return a sequence of frames based on the number input', () => {
    expect(numberToFrames(0)).toEqual([Digits.ZERO, Digits.ZERO, Digits.ZERO]);
    expect(numberToFrames(9)).toEqual([Digits.ZERO, Digits.ZERO, Digits.NINE]);
    expect(numberToFrames(99)).toEqual([Digits.ZERO, Digits.NINE, Digits.NINE]);
    expect(numberToFrames(999)).toEqual([
      Digits.NINE,
      Digits.NINE,
      Digits.NINE,
    ]);
  });

  it('should cap at 999', () => {
    expect(numberToFrames(1024)).toEqual([
      Digits.NINE,
      Digits.NINE,
      Digits.NINE,
    ]);
  });

  it('should work with a negative number', () => {
    expect(numberToFrames(-2)).toEqual([Digits.MINUS, Digits.ZERO, Digits.TWO]);
    expect(numberToFrames(-21)).toEqual([Digits.MINUS, Digits.TWO, Digits.ONE]);
  });

  it('should cap at -99', () => {
    expect(numberToFrames(-584)).toEqual([
      Digits.MINUS,
      Digits.NINE,
      Digits.NINE,
    ]);
  });
});
