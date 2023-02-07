import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
// import App from '../App';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';
// import * as actions from '../redux/actions';

const emailTeste = 'tryber@trybe.com';
const creditCardText = 'Cartão de crédito';

describe('teste da rota "/carteira"', () => {
  const INITIAL_STATE = {
    user: {
      email: emailTeste,
    },
    wallet: {
      currencies: [
        'USD',
        'CAD',
        'GBP',
        'ARS',
        'BTC',
        'LTC',
        'EUR',
        'JPY',
        'CHF',
        'AUD',
        'CNY',
        'ILS',
        'ETH',
        'XRP',
        'DOGE',
      ],
      expenses: [],
      editor: false,
      idToEdit: 0,
    },
  };
  test('testando a renderização do elementos do formulário', () => {
    const { history } = renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'], initialState: INITIAL_STATE });
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    const columnHeaderDescription = screen.getByRole('columnheader', { name: /descrição/i });
    const columnHeaderTag = screen.getByRole('columnheader', { name: /tag/i });
    const columnHeaderMethod = screen.getByRole('columnheader', { name: /método de pagamento/i });
    const columnHeaderExchange = screen.getByRole('columnheader', {
      name: /câmbio utilizado/i,
    });
    const columnheaderCoin = screen.getByRole('columnheader', { name: /moeda de conversão/i });
    const columnHeaderEditAndDelete = screen.getByRole('columnheader', {
      name: /editar\/excluir/i,
    });

    expect(columnHeaderDescription).toBeInTheDocument();
    expect(columnHeaderTag).toBeInTheDocument();
    expect(columnHeaderMethod).toBeInTheDocument();
    expect(columnHeaderExchange).toBeInTheDocument();
    expect(columnheaderCoin).toBeInTheDocument();
    expect(columnHeaderEditAndDelete).toBeInTheDocument();
  });
});

describe('', () => {
  afterEach(() => jest.restoreAllMocks());
  const INITIAL_STATE = {
    user: {
      email: emailTeste,
    },
    wallet: {
      currencies: [
        'USD',
        'CAD',
        'GBP',
        'ARS',
        'BTC',
        'LTC',
        'EUR',
        'JPY',
        'CHF',
        'AUD',
        'CNY',
        'ILS',
        'ETH',
        'XRP',
        'DOGE',
      ],
      expenses: [
        {
          id: 0,
          value: '10',
          currency: 'CAD',
          method: creditCardText,
          tag: 'Transporte',
          description: 'uber',
          exchangeRates: mockData,
        },
      ],
      editor: false,
      idToEdit: 0,
    },
  };
  const testIdValue = 'value-input';
  test('Verificação a renderização de despesas na tabela', async () => {
    // jest.spyOn(global, 'fetch')
    //   .mockImplementation(async () => ({
    //     json: async () => mockData,
    //   }));
    const { history, store } = renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'], initialState: INITIAL_STATE });
    // console.log('store', store.getState());
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    const btnAddExpense = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(btnAddExpense).toBeInTheDocument();

    const inputValue = screen.getByTestId(testIdValue);
    const inputDescription = screen.getByTestId('description-input');
    const selectCoin = screen.getByRole('combobox', {
      name: /moeda/i,
    });
    const selectMethod = screen.getByRole('combobox', {
      name: /método de pagamento/i,
    });
    const selectTag = screen.getByRole('combobox', {
      name: /categoria/i,
    });

    expect(inputValue).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();
    expect(selectCoin).toBeInTheDocument();
    expect(selectMethod).toBeInTheDocument();
    expect(selectTag).toBeInTheDocument();

    userEvent.type(inputValue, '10');
    userEvent.type(inputDescription, 'uber');
    await waitFor(() => userEvent.selectOptions(selectCoin, 'CAD'));
    await waitFor(() => userEvent.selectOptions(selectMethod, creditCardText));
    await waitFor(() => userEvent.selectOptions(selectTag, 'Transporte'));
    // userEvent.selectOptions(selectMethod, 'Cartão de crédito' );
    // userEvent.selectOptions(selectTag, 'Transporte');
    userEvent.click(btnAddExpense);
    await waitFor(() => {
      const state = store.getState();

      expect(state.wallet.expenses[0].value).toBe('10');
      expect(state.wallet.expenses[0].description).toBe('uber');
      expect(state.wallet.expenses[0].tag).toBe('Transporte');
      expect(state.wallet.expenses[0].currency).toBe('CAD');
      expect(state.wallet.expenses[0].method).toBe(creditCardText);
    });

    expect(screen.getByRole('cell', { name: /uber/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /transporte/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /cartão de crédito/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /10\.00/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /dólar canadense\/real brasileiro/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /editar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /excluir/i })).toBeInTheDocument();
  });

  test('Verifica a edição dos itens na tabela', async () => {
    const { history } = renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'], initialState: INITIAL_STATE });

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    expect(screen.getByRole('cell', { name: /uber/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /transporte/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /cartão de crédito/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /10\.00/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /dólar canadense\/real brasileiro/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /editar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /excluir/i })).toBeInTheDocument();

    const btnEdit = screen.getByTestId('edit-btn');
    userEvent.click(btnEdit);

    const inputValueField = screen.getByTestId(testIdValue);
    const inputDescription = screen.getByTestId('description-input');
    const selectCoin = screen.getByRole('combobox', {
      name: /moeda/i,
    });
    // const selectMethodCombobox = screen.getByRole('combobox', {
    //   name: /método de pagamento/i,
    // });
    const selectTag = screen.getByRole('combobox', {
      name: /categoria/i,
    });

    userEvent.type(inputValueField, '20');
    userEvent.type(inputDescription, 'passeio');
    await waitFor(() => userEvent.selectOptions(selectCoin, 'USD'));
    // await waitFor(() => userEvent.selectOptions(selectMethod, 'Dinheiro'));
    await waitFor(() => userEvent.selectOptions(selectTag, 'Lazer'));

    const btnEditExpense = screen.getByRole('button', {
      name: 'Editar despesa',
    });
    userEvent.click(btnEditExpense);
    await waitFor(() => {
      expect(screen.getByRole('cell', { name: /20\.00/i })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: /passeio/i })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: /lazer/i })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: /Dólar Americano\/Real Brasileiro/i })).toBeInTheDocument();
      // expect(screen.getByRole('cell', { name: /dinheiro/i })).toBeInTheDocument();
    });

    // userEvent.type(inputValueField, '20');
    // await waitFor( async () => {
    //   const inputValueField = screen.getByTestId('value-input');
    //   await screen.findByTestId('value-input');
    // })

    // console.log(inputValueField.innerHTML)
    // await waitFor( async () => {
    //   const inputValueField = await screen.findAllByTestId('value-input');
    //   expect(inputValueField.value).toBe('10');
    // });
  });
  test('Verifica a eliminação dos itens na tabela', async () => {
    const { store } = renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'], initialState: INITIAL_STATE });

    expect(screen.getByRole('cell', { name: /uber/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /transporte/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /cartão de crédito/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /10\.00/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /dólar canadense\/real brasileiro/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /editar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /excluir/i })).toBeInTheDocument();

    const btnDelete = screen.getByRole('button', { name: /excluir/i });
    expect(btnDelete).toBeInTheDocument();
    const descriptionCell = screen.getByRole('cell', {
      name: /uber/i,
    });
    expect(descriptionCell).toBeInTheDocument();
    await waitFor(() => {
      userEvent.click(btnDelete);
      expect(btnDelete).not.toBeInTheDocument();
      // expect(screen.getByRole('cell', { name: /10\.00/i })).not.toBeInTheDocument();
    });
    // screen.logTestingPlaygroundURL();
    expect(descriptionCell).not.toBeInTheDocument();
    // expect(screen.getByRole('cell', { name: /10\.00/i })).not.toBeInTheDocument();
    const state = store.getState();
    expect(state.wallet.expenses).toEqual([]);
  });
  test('Verificando a adição de despesa na Tabela', async () => {
    const currenciesList = [
      'USD', 'CAD', 'EUR',
      'GBP', 'ARS', 'BTC',
      'LTC', 'JPY', 'CHF',
      'AUD', 'CNY', 'ILS',
      'ETH', 'XRP', 'DOGE',
    ];

    jest.spyOn(global, 'fetch')
      .mockImplementation(async () => ({
        json: async () => mockData,
      }));

    const initialState0 = {
      user: {
        email: 'aluno@aluno.com',
      },
      wallet: {
        currencies: [],
        expenses: [],
        editor: false,
        idToEdit: 0,
      },
    };
    const { store } = renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'], initialState0 });
    await waitFor(() => {
      expect(global.fetch).toBeCalledTimes(1);
    });
    console.log(store.getState().wallet.currencies);
    expect(store.getState().wallet.currencies).toEqual(currenciesList);
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
  });
});

describe('teste de edição', () => {
  const INITIAL_STATE = {
    user: {
      email: emailTeste,
    },
    wallet: {
      currencies: [
        'USD',
        'CAD',
        'GBP',
        'ARS',
        'BTC',
        'LTC',
        'EUR',
        'JPY',
        'CHF',
        'AUD',
        'CNY',
        'ILS',
        'ETH',
        'XRP',
        'DOGE',
      ],
      expenses: [
        {
          id: 0,
          value: '10',
          currency: 'CAD',
          method: creditCardText,
          tag: 'Transporte',
          description: 'uber',
          exchangeRates: mockData,
        },
        {
          id: 1,
          value: '40',
          currency: 'ARS',
          method: 'Cartão de débito',
          tag: 'Alimentação',
          description: 'almoço',
          exchangeRates: mockData,
        },
      ],
      editor: false,
      idToEdit: 0,
    },
  };

  test('Verifica a renderização da edição dos itens na tabela', async () => {
    const { history } = renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'], initialState: INITIAL_STATE });

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    expect(screen.getByRole('cell', { name: /uber/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /transporte/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /cartão de crédito/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /10\.00/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /dólar canadense\/real brasileiro/i })).toBeInTheDocument();

    expect(screen.getByRole('cell', { name: /almoço/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /Alimentação/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /Cartão de débito/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /40\.00/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /Argentino\/Real Brasileiro/i })).toBeInTheDocument();

    // const table = screen.getByRole('table');
    // console.log(table)
    const btnEdit = screen.getAllByTestId('edit-btn');
    const btnEditSecond = btnEdit[1];

    userEvent.click(btnEditSecond);

    const inputValue = screen.getByTestId('value-input');

    fireEvent.change(inputValue, { target: { value: '60' } });
    const btnAddExpense = screen.getByRole('button', {
      name: 'Editar despesa',
    });
    userEvent.click(btnAddExpense);
    await waitFor(() => {
      expect(screen.getByRole('cell', { name: /60\.00/i })).toBeInTheDocument();
    });
  });
});
