export const selectTransactions = (state) => state.transactions.items;
export const selectCategories = (state) => state.transactions.categories;
export const selectTransactionsIsLoading = (state) =>
  state.transactions.isLoading;
export const selectTransactionsError = (state) => state.transactions.error;
export const selectBalance = (state) =>
  state.transactions.transactionsSummary.periodTotal;
