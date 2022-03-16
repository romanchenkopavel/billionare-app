type NumberFormatterConfig = Intl.NumberFormatOptions & { locale: string };

interface NumberFormatter {
  amount: number;
  config?: NumberFormatterConfig;
}

const defaultLocale = 'en-US';
const defaultConfig: Intl.NumberFormatOptions = {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
};

function useFormatAmount({ amount, config }: NumberFormatter) {
  let options;
  let locale;

  if (config?.locale) {
    const { locale: rawLocale, ...rest } = config;
    locale = rawLocale;
    options = rest;
  } else {
    options = config || defaultConfig;
  }

  const formatter = Intl.NumberFormat(locale || defaultLocale, { ...options });

  return formatter.format(amount);
}

export default useFormatAmount;
