import React from 'react';
import { waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';
import * as actions from '../redux/actions';
import { act } from 'react-dom/test-utils';

const emailteste = 'aluno@trybe.com';
const currenciesList = ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'];
const expenseList = [{ id: 0, value: '10', currency: 'USD', method: 'Dinheiro', tag: 'Alimentação', description: 'comida', exchangeRates: mockData }, { id: 1, value: '20', currency: 'CAD', method: 'Dinheiro', tag: 'Transporte', description: 'trem', exchangeRates: mockData }];

describe('testando a API', () => {
  afterEach(() => jest.clearAllMocks());
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(async () => ({
        json: async () => mockData,
      }));
  });
  test('Verifica se a API é chamada', async () => {
    const initialState = {
      user: {
        email: emailteste,
      },
      wallet: {
        currencies: [],
        expenses: [],
        editor: false,
        idToEdit: 0,
      },
    };
    await act( async () => {
      renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });   
    });
    expect(global.fetch).toHaveBeenCalled();
  });
});

describe('Verifica a adição de valor na chave editor no estado global',  () => {
  const initialState = {
    user: {
      email: emailteste,
    },
    wallet: {
      currencies: currenciesList,
      expenses: expenseList,
      editor: false,
      idToEdit: 0,
    },
  };
  
  test('Verifica EXPENSE_EDIT', async () => {
    await act(async () => {
      const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
      store.dispatch({ type: actions.EXPENSE_EDIT, payload: true });
      const state = store.getState();
      const { editor } = state.wallet;
      expect(editor).toEqual(true);
    });
  });
});
