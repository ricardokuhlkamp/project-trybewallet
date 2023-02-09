import React from 'react';
import { waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';
import * as actions from '../redux/actions';

const emailteste = 'aluno@trybe.com';
const currenciesList = ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'];
const expenseList = [{ id: 0, value: '10', currency: 'USD', method: 'Dinheiro', tag: 'Alimentação', description: 'comida', exchangeRates: mockData }, { id: 1, value: '20', currency: 'CAD', method: 'Dinheiro', tag: 'Transporte', description: 'trem', exchangeRates: mockData }];

// describe.only('Verifica o do componente Table apartir do Login', () => {
//   test('Verifica se a edição é renderizada na tabela', async () => {
//     jest.spyOn(global, 'fetch')
//       .mockImplementation(async () => ({
//         json: async () => mockData,
//       }));
//     const initialState = {
//       user: {
//         email: emailteste,
//       },
//       wallet: {
//         currencies: currenciesList,
//         expenses: expenseList,
//         editor: true,
//         idToEdit: 1,
//       },
//     };
//     const { debug } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
//     const coinCell = screen.getByRole('cell', {
//       name: /dólar americano\/real brasileiro/i,
//     });
//     expect(coinCell).toBeInTheDocument();

//     // const totalField = screen.getByTestId('total-field');
//     // expect(totalField.innerHTML).toBe('122.65');
//     const emailField = screen.getByTestId('email-field');
//     expect(emailField.innerHTML).toBe(`Email: ${emailteste}`);
//     const allBtnsEdit = screen.getAllByTestId('edit-btn');

//     userEvent.click(allBtnsEdit[1]);
//     const inputValue = screen.getByTestId('value-input');
//     // const inputDescription = screen.getByTestId('description-input');

//     userEvent.clear(inputValue);
//     userEvent.type(inputValue, '30');

//     const btnEditExpense = screen.getByRole('button', {
//       name: /editar despesa/i,
//     });
//     expect(btnEditExpense).toBeInTheDocument();
//     userEvent.type(btnEditExpense);
// const cellValue = await screen.findByRole('cell', {
//   name: '30.00',
// });
// debug();
// expect(cellValue).toBeInTheDocument();
//   });
// });

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
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });
});

describe('Verifica a adição de valor na chave editor no estado global', () => {
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

  test('Verifica EXPENSE_EDIT', () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    store.dispatch({ type: actions.EXPENSE_EDIT, payload: true });
    const state = store.getState();
    const { editor } = state.wallet;
    expect(editor).toEqual(true);
  });
});
