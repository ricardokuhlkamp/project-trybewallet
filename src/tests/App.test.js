import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';
import * as actions from '../redux/actions';

const emailteste = 'aluno@trybe.com';
const currenciesList = ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'];

describe('Page Login', () => {
  test('Verifica se a tela Login é renderizada  corretam coorretamente', () => {
    renderWithRouterAndRedux(<App />);
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    expect(btnEntrar).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });
  test('Verifica a validação de email e senha', () => {
    const password = '123456';
    const email = 'aluno@trybe,com';
    renderWithRouterAndRedux(<App />);
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');

    expect(btnEntrar).toBeDisabled();

    userEvent.type(inputEmail, '123');
    userEvent.type(inputPassword, '12345');

    expect(btnEntrar).toBeDisabled();

    userEvent.type(inputEmail, email);
    userEvent.type(inputPassword, '12345');

    expect(btnEntrar).toBeDisabled();

    userEvent.type(inputEmail, '1234');
    userEvent.type(inputPassword, password);

    expect(btnEntrar).toBeDisabled();

    // userEvent.type(inputEmail, email);
    // userEvent.type(inputPassword, password);

    // expect(btnEntrar).not.toBeDisabled();

    // expect(btnEntrar).toBeEnabled();
    // act(() => {
    //   userEvent.click(btnEntrar);
    // });
    // userEvent.click(btnEntrar);
    // const { pathname } = history.location;
    // expect(pathname).toBe('/carteira');
    // expect(pathname).not.toBe('/');
    // const inputValue = screen.getByRole('spinbutton', {
    //   name: /valor/i,
    // });
    // expect(inputValue).toBeInTheDocument();
  });
});

describe('Page Wallet', () => {
  test('Verifica se a page Wallet é renderizada', () => {
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
    const emailField = screen.getByRole('heading', { name: /email: aluno@trybe\.com/i });
    expect(emailField).toBeInTheDocument();

    const inputValue = screen.getByRole('spinbutton', {
      name: /valor/i,
    });
    expect(inputValue).toBeInTheDocument();

    const thTheadTableDescription = screen.getByRole('columnheader', {
      name: /descrição/i,
    });
    expect(thTheadTableDescription).toBeInTheDocument();
  });
});

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
  test.skip('Testando a API', async () => {
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
    // afterEach(() => jest.clearAllMocks());
    // beforeEach(() => {
    // });
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    // const value = 10;
    // const description = 'uber';
    // const currency = 'EUR';
    // const method = 'Dinheiro';
    // const tag = 'transporte';
    // // const currenciesList = ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'];

    // const inputValue = screen.getByRole('spinbutton', { name: /valor/i });
    // const inputDescription = screen.getByRole('textbox', { name: /descrição/i });
    // const currencySelect = screen.getByTestId('currency-input');
    // // const currencySelect = screen.getByRole('listbox');
    // const methodSelect = screen.getByTestId('method-input');
    // const tagSelect = screen.getByTestId('tag-input');
    // const btnAddCost = screen.getByRole('button', { name: /adicionar despesa/i });

    // userEvent.type(inputValue, value);
    // userEvent.type(inputDescription, description);
    // userEvent.selectOptions(currencySelect, [screen.getByText(currency)]);
    // userEvent.selectOptions(methodSelect, [method, method]);
    // userEvent.selectOptions(tagSelect, [tag, tag]);
    // userEvent.click(btnAddCost);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });
  test('Verificando a adição de despesa na Tabela', async () => {
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
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    await waitFor(() => {
      expect(global.fetch).toBeCalledTimes(1);
    });
    // expect(store.getState().wallet.currencies).toContain(currenciesList);
    const result = await store.getState().wallet.currencies;
    expect(result).toEqual(expect.arrayContaining(currenciesList));
    const inputValue = screen.getByRole('spinbutton', { name: /valor/i });
    const btnAddExpense = screen.getByRole('button', { name: /adicionar despesa/i });
    // await waitFor(() => {
    // });
    userEvent.type(inputValue, '10');
    userEvent.click(btnAddExpense);
    await waitFor(() => {
      expect(global.fetch).toBeCalledTimes(2);
    });
    // console.log(store.getState().wallet.expenses);
    // const cellValue10USD = screen.getByRole('cell', { name: /10\.00/i });
    // userEvent.type(inputValue, '20');
    // userEvent.click(btnAddExpense);
    // expect(cellValue10USD.innerHTML).toBe(store.getState().wallet.expenses.value);
    // expect(cellValue10USD).toBeInTheDocument();
  });
});

describe('Verifica as actions', () => {
  test('test action validEmail', () => {
    const mockActionValidEmail = jest.spyOn(actions, 'validEmail');
    const payload = emailteste;
    const result = actions.validEmail(payload);
    expect(mockActionValidEmail).toHaveBeenCalledWith(payload);
    expect(mockActionValidEmail).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      type: 'VALID_EMAIL',
      payload: emailteste,
    });
  });
  test('test action searchCurrencies', () => {
    const mockActionSearchCurrencies = jest.spyOn(actions, 'searchCurrencies');
    const payload = currenciesList;
    const result = actions.searchCurrencies(payload);
    expect(mockActionSearchCurrencies).toHaveBeenCalledWith(payload);
    expect(mockActionSearchCurrencies).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      type: 'SEARCH_CURRENCIES',
      payload: currenciesList,
    });
  });
  test('test action expensesObjectList', () => {
    const mockActionExpensesObjectList = jest.spyOn(actions, 'expensesObjectList');
    const objetoForm = {
      id: 1,
      value: '1',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
      description: 'teste',
      exchangeRates: mockData,
    };
    const payload = objetoForm;
    const result = actions.expensesObjectList(payload);
    expect(mockActionExpensesObjectList).toHaveBeenCalledWith(payload);
    expect(mockActionExpensesObjectList).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      type: 'EXPENSES_OBJECT_LIST',
      payload: objetoForm,
    });
  });
});

describe('Verifica as actions Parte 02', () => {
  test('test action expenseSaveUpdate', () => {
    const mockActionExpensesSaveUpdate = jest.spyOn(actions, 'expenseSaveUpdate');
    const objetoForm = {
      id: 1,
      value: '1',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
      description: 'teste',
      exchangeRates: mockData,
    };
    const payload = objetoForm;
    const result = actions.expenseSaveUpdate(payload);
    expect(mockActionExpensesSaveUpdate).toHaveBeenCalledWith(payload);
    expect(mockActionExpensesSaveUpdate).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      type: 'EXPENSE_SAVE_UPDATE',
      payload: objetoForm,
    });
  });
  test('test action expensesUpdateRow', () => {
    const mockActionExpensesUpdateRow = jest.spyOn(actions, 'expensesUpdateRow');
    const objetoForm = {
      id: 1,
      value: '1',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
      description: 'teste',
      exchangeRates: mockData,
    };
    const payload = objetoForm;
    const result = actions.expensesUpdateRow(payload);
    expect(mockActionExpensesUpdateRow).toHaveBeenCalledWith(payload);
    expect(mockActionExpensesUpdateRow).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      type: 'EXPENSES_UPDATE_ROW',
      payload: objetoForm,
    });
  });
});

describe('Verifica as actions parte 03', () => {
  test('teste action idExpenseEdit', () => {
    const mockActionIdExpenseEdit = jest.spyOn(actions, 'idExpenseEdit');
    const payload = 0;
    const result = actions.idExpenseEdit(payload);
    expect(mockActionIdExpenseEdit).toHaveBeenCalledWith(payload);
    expect(mockActionIdExpenseEdit).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      type: 'ID_EXPENSE_EDIT',
      payload: 0,
    });
  });
  test('Verifica ID_EXPENSE_EDIT', () => {
    const initialState = {
      user: {
        email: emailteste,
      },
      wallet: {
        currencies: currenciesList,
        expenses: [{ id: 0, value: '10', currency: 'USD', method: 'Dinheiro', tag: 'Alimentação', description: 'comida', exchangeRates: mockData }, { id: 1, value: '20', currency: 'CAD', method: 'Dinheiro', tag: 'Transport', description: 'trem', exchangeRates: mockData }],
        editor: false,
        idToEdit: 0,
      },
    };
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    store.dispatch({ type: actions.ID_EXPENSE_EDIT, payload: 1 });
    const state = store.getState();
    const { idToEdit } = state.wallet;
    expect(idToEdit).toEqual(1);
  });
  test('teste action expenseEdit', () => {
    const mockActionExpenseEdit = jest.spyOn(actions, 'expenseEdit');
    const payload = true;
    const result = actions.expenseEdit(payload);
    expect(mockActionExpenseEdit).toHaveBeenCalledWith(payload);
    expect(mockActionExpenseEdit).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      type: 'EXPENSE_EDIT',
      payload: true,
    });
  });
  test('Verifica EXPENSE_EDIT', () => {
    const initialState = {
      user: {
        email: emailteste,
      },
      wallet: {
        currencies: currenciesList,
        expenses: [{ id: 0, value: '10', currency: 'USD', method: 'Dinheiro', tag: 'Alimentação', description: 'comida', exchangeRates: mockData }, { id: 1, value: '20', currency: 'CAD', method: 'Dinheiro', tag: 'Transport', description: 'trem', exchangeRates: mockData }],
        editor: false,
        idToEdit: 0,
      },
    };
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    store.dispatch({ type: actions.EXPENSE_EDIT, payload: true });
    const state = store.getState();
    const { editor } = state.wallet;
    expect(editor).toEqual(true);
  });
});

describe('Verifica as actions parte 04', () => {
  afterEach(() => jest.clearAllMocks());
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(async () => ({
        json: async () => mockData,
      }));
  });
  test.skip('teste action apiCambio', async () => {
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
    const formData = {
      id: 0,
      value: '20',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Transporte',
      description: 'travel',
    };
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const { dispatch } = store;
    // const spyExpensesObjectList = jest.spyOn(actions, 'expensesObjectList');
    const spySearchCurrencies = jest.spyOn(actions, 'searchCurrencies');
    await dispatch(actions.apiCambio(formData));
    expect(global.fetch).toHaveBeenCalled();
    expect(spySearchCurrencies).toHaveBeenCalled();
    // expect(spyExpensesObjectList).toHaveBeenCalledWith({
    //   id: 0,
    //   value: '20',
    //   currency: 'USD',
    //   method: 'Dinheiro',
    //   tag: 'Transporte',
    //   description: 'travel',
    //   exchangeRates: mockData,
    // });
    // expect(spyExpensesObjectList).toHaveBeenCalledTimes(1);
    // expect(spySearchCurrencies).toHaveBeenCalled();
    // expect(spySearchCurrencies).toHaveBeenCalledTimes(1);
  });
});

// describe.skip('actions', () => {
//   teste.skip('teste a action com erro', async () => {
//     const initialState = {
//       user: {
//         email: emailteste,
//       },
//       wallet: {
//         currencies: [],
//         expenses: [],
//         editor: false,
//         idToEdit: 0,
//       },
//     };
//     const store = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
//     console.log(store);
//     const expectedActions = [
//       { type: actions.SEARCH_ERROR, error: new Error('API error') },
//     ];

//     global.fetch = jest.fn().mockRejectedValue(new Error('API error'));

//     await store.store.dispatch(actions.apiCambio());

//     expect(store.getActions()).toEqual(expectedActions);
//   });
// });
