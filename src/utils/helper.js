const PREFIXES = [
  { value: 1, symbol: '' },
  { value: 1000, symbol: 'k' },
  { value: 1000000, symbol: 'M' },
  { value: 1000000000, symbol: 'B' },
  { value: 1000000000000, symbol: 'T' },
];

export const shortenNumber = (number) => {
  if (number === 0) {
    return number;
  }

  const divisor = PREFIXES.filter((num) => number >= num.value).pop(),
    truncatedNumber = (number / divisor.value).toFixed(1);

  return `${truncatedNumber}${divisor.symbol}`;
};
export const breakpointColumns = {
  default: 3,
  1200: 3,
  992: 3,
  768: 2,
  576: 1,
};

// Handles async thunk add case for common actions
export const handleAsyncThunkCases = (
  builder,
  thunk,
  { pending, fulfilled, rejected },
) => {
  builder
    .addCase(thunk.pending, (state) => {
      state.isLoading = true;
      if (pending) pending(state);
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      if (fulfilled) fulfilled(state, action);
    })
    .addCase(thunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      if (rejected) rejected(state, action);
    });
};
