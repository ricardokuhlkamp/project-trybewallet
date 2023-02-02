// Coloque aqui suas actions
export const VALID_EMAIL = 'VALID_EMAIL';

export const validEmail = (payload) => ({
  type: VALID_EMAIL,
  payload,
});

// wallet

export const SEARCH_BEGIN = 'SEARCH_BEGIN';
export const SEARCH_CURRENCIES = 'SEARCH_CURRENCIES';
export const SEARCH_ERROR = 'SEARCH_ERROR';

export const EXPENSES_OBJECT_LIST = 'EXPENSES_OBJECT_LIST';

export const EXPENSES_DELETE_ROW = 'EXPENSES_DELETE_ROW';

export const searchBegin = () => ({
  type: SEARCH_BEGIN,
});

export const searchCurrencies = (payload) => ({
  type: SEARCH_CURRENCIES,
  payload,
});

export const searchError = (error) => ({
  type: SEARCH_ERROR,
  error,
});

export const expensesObjectList = (payload) => ({
  type: EXPENSES_OBJECT_LIST,
  payload,
});

export function apiCambio(formData) {
  return async (dispatch) => {
    try {
      dispatch(searchBegin());
      const API_COTACAO = 'https://economia.awesomeapi.com.br/json/all';
      const response = await fetch(API_COTACAO);
      const exchangeRates = await response.json();
      delete exchangeRates.USDT;
      if (formData) {
        const data = {
          ...formData, exchangeRates,
        };
        dispatch(expensesObjectList(data));
      }
      // const coins = { ...exchangeRates };
      dispatch(searchCurrencies(Object.keys(exchangeRates)));
    } catch (error) {
      // console.log(error.message);
      dispatch(searchError(error));
    }
  };
}

export const expensesDeleteRow = (payload) => ({
  type: EXPENSES_DELETE_ROW,
  payload,
});
