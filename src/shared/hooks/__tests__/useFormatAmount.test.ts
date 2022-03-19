import useFormatAmount, { NumberFormatterConfig } from '../useFormatAmount';

describe('useFormatAmount', () => {
  test.each([
    { number: 10000, expected: '$10,000' },
    { number: 2513211, expected: '$2,513,211' },
    { number: 0, expected: '$0' },
  ])(
    'useFormatAmount({ amount: $number }) -> $expected (with default config)',
    ({ number, expected }) => {
      expect(useFormatAmount({ amount: number })).toBe(expected);
    },
  );

  test.each<{
    number: number;
    expected: string;
    config: NumberFormatterConfig;
  }>([
    {
      number: 10000,
      expected: '10.000,00 Euro',
      config: {
        locale: 'de-DE',
        style: 'currency',
        currency: 'EUR',
        currencyDisplay: 'name',
      },
    },
    {
      number: 2513212,
      expected: '+251,321,200%',
      config: { style: 'percent', signDisplay: 'always' },
    },
    {
      number: 500000,
      expected: '500000 m',
      config: { useGrouping: false, style: 'unit', unit: 'meter' },
    },
  ])(
    'useFormatAmount({ amount: $number, config: $config }) -> $expected',
    ({ number, expected, config }) => {
      expect(useFormatAmount({ amount: number, config })).toBe(expected);
    },
  );
});
