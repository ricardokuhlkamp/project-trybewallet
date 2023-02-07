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
const expenseList = [{ id: 0, value: '10', currency: 'USD', method: 'Dinheiro', tag: 'Alimentação', description: 'comida', exchangeRates: mockData }, { id: 1, value: '20', currency: 'CAD', method: 'Dinheiro', tag: 'Transport', description: 'trem', exchangeRates: mockData }];

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
  test('Verifica a validação de email e senha', async () => {
    const password = '123456';
    const email = 'aluno@trybe.com';
    const { history } = renderWithRouterAndRedux(<App />);
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    expect(btnEntrar).toBeDisabled();
    userEvent.type(inputEmail, email);
    userEvent.type(inputPassword, password);
    expect(btnEntrar).toBeEnabled();
    console.log(btnEntrar.disabled);
    userEvent.click(btnEntrar);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
    expect(pathname).not.toBe('/');
    const inputValue = screen.getByRole('spinbutton', {
      name: /valor/i,
    });
    expect(inputValue).toBeInTheDocument();
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

describe('Verifica o componente TABLE', () => {
  test.skip('Verifica se a edição é renderizada na tabela', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(async () => ({
        json: async () => mockData,
      }));
    const initialState = {
      user: {
        email: emailteste,
      },
      wallet: {
        currencies: currenciesList,
        expenses: expenseList,
        editor: true,
        idToEdit: 1,
      },
    };
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const coinCell = screen.getByRole('cell', {
      name: /dólar americano\/real brasileiro/i,
    });
    expect(coinCell).toBeInTheDocument();
    const totalField = screen.getByTestId('total-field');
    expect(totalField.innerHTML).toBe('122.65');
    const emailField = screen.getByTestId('email-field');
    expect(emailField.innerHTML).toBe(`Email: ${emailteste}`);
    const row = screen.getByRole('row', {
      name: /trem/i,
    });
    userEvent.click(row.querySelector('button'));
    const inputValue = screen.getByTestId('value-input');
    userEvent.type(inputValue, '30');
    const btnEditExpense = screen.getByRole('button', {
      name: /editar despesa/i,
    });
    expect(btnEditExpense).toBeInTheDocument();
    await waitFor(() => {
      userEvent.type(btnEditExpense);
    });
    const cellValue = screen.getByRole('cell', {
      name: /30\.00/i,
    });
    expect(cellValue).toBeInTheDocument();
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
  test('Testando a API', async () => {
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
  test('Verifica EXPENSES_UPDATE_ROW', () => {
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
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    store.dispatch({ type: actions.EXPENSES_UPDATE_ROW, payload: [{ id: 1, value: '20', currency: 'CAD', method: 'Dinheiro', tag: 'Transport', description: 'trem', exchangeRates: mockData }] });
    const state = store.getState();
    const { expenses } = state.wallet;
    expect(expenses).toEqual([{ id: 1, value: '20', currency: 'CAD', method: 'Dinheiro', tag: 'Transport', description: 'trem', exchangeRates: mockData }]);
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
        expenses: expenseList,
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
        expenses: expenseList,
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

describe('teste case EXPENSE_SAVE_UPDATE', () => {
  test.skip('Verifica EXPENSE_SAVE_UPDATE', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(async () => ({
        json: async () => mockData,
      }));
    const object1 = { id: 0, value: '10', currency: 'USD', method: 'Dinheiro', tag: 'Alimentação', description: 'comida', exchangeRates: mockData };
    const object2 = { id: 1, value: '20', currency: 'CAD', method: 'Dinheiro', tag: 'Transport', description: 'trem', exchangeRates: mockData };
    const expenseList2 = [object1, object2];
    const initialState = {
      user: {
        email: emailteste,
      },
      wallet: {
        currencies: currenciesList,
        expenses: expenseList2,
        editor: true,
        idToEdit: 1,
      },
    };
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const state = store.getState();
    const { idToEdit } = state.wallet;
    const mockApiCambio = jest.spyOn(actions, 'apiCambio');
    const mockExpenseSaveUpdate = jest.spyOn(actions, 'expenseSaveUpdate');
    await waitFor(() => {
      store.dispatch(mockApiCambio(null, { id: idToEdit, value: '20', currency: 'USD', method: 'Dinheiro', tag: 'Transport', description: 'passagem', exchangeRates: mockData }));
      store.dispatch(mockExpenseSaveUpdate({ type: 'EXPENSE_SAVE_UPDATE', payload: [object1, { id: 1, value: '20', currency: 'USD', method: 'Dinheiro', tag: 'Transport', description: 'passagem', exchangeRates: mockData }] }));
    });
    const { expenses } = state.wallet;
    expect(expenses).toEqual([object1, { id: 1, value: '20', currency: 'USD', method: 'Dinheiro', tag: 'Transport', description: 'passagem', exchangeRates: mockData }]);
  });
});

// describe('Verifica as funções ligadas aos botões editar e excluir', () => {
//   jest.spyOn(global, 'fetch')
//     .mockImplementation(async () => ({
//       json: async () => mockData,
//     }));
//   const list = [{ id: 0, value: '20', currency: 'CAD', method: 'Dinheiro', tag: 'Alimentação', description: 'comida', exchangeRates: mockData }];
//   const initialState2 = {
//     user: {
//       email: emailteste,
//     },
//     wallet: {
//       currencies: currenciesList,
//       expenses: list,
//       editor: true,
//       idToEdit: 0,
//     },
//   };
//   const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState2 });
//   test.skip('Verifica o botão de editar e a respectiva função', async () => {
//     const inputValue = screen.getByTestId('value-input');
//     fireEvent.change(inputValue, { target: { value: '30' } });
//     expect(inputValue.value).toBe('30');
//     const btnAddExpense = screen.getByRole('button', { name: 'Editar despesa' });
//     expect(btnAddExpense).toBeInTheDocument();
//     userEvent.click(btnAddExpense);
//     expect(global.fetch).toHaveBeenCalledTimes(1);
//     await waitFor(async () => {
//       const state = store.getState();
//       console.log(state.wallet);
//       expect(screen.getByRole('cell', { name: /30\.00/i })).toBeInTheDocument();
//     });
//   });

//   test('Verifica o botão de deletar e a respectiva função', async () => {
//     const btnDelete = screen.getByRole('button', { name: /excluir/i });
//     expect(btnDelete).toBeInTheDocument();
//     const descriptionCell = screen.getByRole('cell', {
//       name: /comida/i,
//     });
//     expect(descriptionCell).toBeInTheDocument();
//     await waitFor(() => {
//       userEvent.click(btnDelete);
//       expect(btnDelete).not.toBeInTheDocument();
//       // expect(screen.getByRole('cell', { name: /10\.00/i })).not.toBeInTheDocument();
//     });
//     // screen.logTestingPlaygroundURL();
//     expect(descriptionCell).not.toBeInTheDocument();
//     // expect(screen.getByRole('cell', { name: /10\.00/i })).not.toBeInTheDocument();
//     console.log(store.getState());
//     const state = store.getState();
//     expect(state.wallet.expenses).toEqual([]);
//   });
// });
