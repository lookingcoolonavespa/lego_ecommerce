import { capitalizeEachWord, capitalizeStr } from '../utils/misc';

describe('capitalizeEachWord works', () => {
  test('it works', () => {
    const str = 'supply chain transparency statement';

    expect(capitalizeEachWord(str)).toBe('Supply Chain Transparency Statement');
  });

  test('works with special characters', () => {
    const str = 'specials & offers';

    expect(capitalizeEachWord(str)).toBe('Specials & Offers');
  });
});

describe('capitalizeStr works', () => {
  test('it works', () => {
    const str = 'about us';

    expect(capitalizeStr(str)).toBe('ABOUT US');
  });
});
