import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

const emailTeste = 'tryber@trybe.com';
const creditCardText = 'Cartão de crédito';
const editBtnTestId = 'edit-btn';
const deleteBtnTestId = 'delete-btn';

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
    await screen.findByTestId('CAD');
    userEvent.selectOptions(selectCoin, 'CAD');
    userEvent.selectOptions(selectMethod, creditCardText);
    userEvent.selectOptions(selectTag, 'Transporte');
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
    expect(screen.getByTestId(editBtnTestId)).toBeInTheDocument();
    expect(screen.getByTestId(deleteBtnTestId)).toBeInTheDocument();
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
    expect(screen.getByTestId(editBtnTestId)).toBeInTheDocument();
    expect(screen.getByTestId(deleteBtnTestId)).toBeInTheDocument();

    const btnEdit = screen.getByTestId(editBtnTestId);
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
    await screen.findByTestId('USD');
    userEvent.selectOptions(selectCoin, 'USD');
    // await waitFor(() => userEvent.selectOptions(selectMethod, 'Dinheiro'));
    await screen.findByTestId('Lazer');
    userEvent.selectOptions(selectTag, 'Lazer');

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
    expect(screen.getByTestId(editBtnTestId)).toBeInTheDocument();
    expect(screen.getByTestId(deleteBtnTestId)).toBeInTheDocument();

    const btnDelete = screen.getByTestId(deleteBtnTestId);
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
});
