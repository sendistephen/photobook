const PREFIXES = [
  { value: 1, symbol: '' },
  { value: 1000, symbol: 'k' },
  { value: 1000000, symbol: 'M' },
  { value: 1000000000, symbol: 'B' },
  { value: 1000000000000, symbol: 'T' },
];

export const shortenNumber = (number) => {
  if (number === 0) return number;

  const divisor = PREFIXES.filter((num) => number >= num.value).pop();
  const truncatedNumber = (number / divisor.value).toFixed(1);

  return `${truncatedNumber}${divisor.symbol}`;
};
