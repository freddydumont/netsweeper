import { DigitsByNumber, Digits } from './Digits';

/**
 * Converts a number into an array of Digits frames
 */
function numberToFrames(count: number) {
  if (count >= 999) {
    return [Digits.NINE, Digits.NINE, Digits.NINE];
  }

  if (count <= -99) {
    return [Digits.MINUS, Digits.NINE, Digits.NINE];
  }

  const characters: string[] = count.toString(10).split('');

  if (count >= 0) {
    while (characters.length < 3) {
      characters.unshift('0');
    }

    return characters.map((i) => DigitsByNumber[parseInt(i, 10)]);
  } else {
    // remove minus sign
    characters.shift();

    // add 0 at the start
    while (characters.length < 2) {
      characters.unshift('0');
    }

    return [
      Digits.MINUS,
      ...characters.map((i) => DigitsByNumber[parseInt(i, 10)]),
    ];
  }
}

export { numberToFrames };
