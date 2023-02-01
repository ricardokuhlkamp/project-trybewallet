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

export function apiCambio() {
  return async (dispatch) => {
    try {
      dispatch(searchBegin());
      const API_COTACAO = 'https://economia.awesomeapi.com.br/json/all';
      const response = await fetch(API_COTACAO);
      const data = await response.json();
      const dataCoins = { ...data };
      delete dataCoins.USDT;
      dispatch(searchCurrencies(Object.keys(dataCoins)));
    } catch (error) {
      // console.log(error.message);
      dispatch(searchError(error));
    }
  };
}
