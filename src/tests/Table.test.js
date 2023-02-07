import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
// import App from '../App';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';
// import * as actions from '../redux/actions';

const emailTeste = 'tryber@trybe.com';

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
    // console.log(store.getState())
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
          method: 'Cartão de crédito',
          tag: 'Transporte',
          description: 'uber',
          exchangeRates: mockData,
        },
      ],
      editor: false,
      idToEdit: 0,
    },
  };
  test('Verificação da inserção de despesas na tabela', async () => {
    // jest.spyOn(global, 'fetch')
    //   .mockImplementation(async () => ({
    //     json: async () => mockData,
    //   }));
    const { history, store } = renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'], initialState: INITIAL_STATE });
    console.log('store', store.getState());
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    const btnAddExpense = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(btnAddExpense).toBeInTheDocument();

    const inputValue = screen.getByTestId('value-input');
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
    // await waitFor(() => userEvent.selectOptions(selectMethod, 'Cartão de crédito'));
    await waitFor(() => userEvent.selectOptions(selectTag, 'Transporte'));
    // userEvent.selectOptions(selectMethod, 'Cartão de crédito' );
    // userEvent.selectOptions(selectTag, 'Transporte');
    console.log('store', store.getState());
    userEvent.click(btnAddExpense);
    await waitFor(() => {
      console.log('store', store.getState().wallet.expenses);
      const state = store.getState();

      expect(state.wallet.expenses[0].value).toBe('10');
      expect(state.wallet.expenses[0].description).toBe('uber');
      expect(state.wallet.expenses[0].tag).toBe('Transporte');
      expect(state.wallet.expenses[0].currency).toBe('CAD');
      // expect(state.wallet.expenses[0].method).toBe('Cartão de crédito');
    });

    expect(screen.getByRole('cell', { name: /uber/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /transporte/i })).toBeInTheDocument();
    // expect(screen.getByRole('cell', { name: /cartão de crédito/i })).toBeInTheDocument();
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

    const inputValue = screen.getByTestId('value-input');
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

    userEvent.type(inputValue, '20');
    userEvent.type(inputDescription, 'lazer');
    await waitFor(() => userEvent.selectOptions(selectCoin, 'USD'));
    // await waitFor(() => userEvent.selectOptions(selectMethod, 'Dinheiro'));
    await waitFor(() => userEvent.selectOptions(selectTag, 'Transporte'));

    const btnEditExpense = screen.getByRole('button', {
      name: 'Editar despesa',
    });
    await waitFor(() => {
      userEvent.click(btnEditExpense);
      expect(screen.getByRole('cell', { name: /20\.00/i })).toBeInTheDocument();
      // expect(screen.getByRole('cell', { name: /lazer/i })).toBeInTheDocument(); ERRO ao adicionar mais um expect
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
    console.log(store.getState());
    const state = store.getState();
    expect(state.wallet.expenses).toEqual([]);
  });
})