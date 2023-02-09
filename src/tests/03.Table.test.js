import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';
import { act } from 'react-dom/test-utils';

// const emailTeste = 'tryber@trybe.com';
// const creditCardText = 'Cartão de crédito';
// const editBtnTestId = 'edit-btn';
// const deleteBtnTestId = 'delete-btn';

describe('', () => {
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
    let state;
    await act( async () => {
      const { store } = renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'], initialState0 });
      state = store;
    })
    await waitFor(() => {
      expect(global.fetch).toBeCalledTimes(1);
    });

    expect(state.getState().wallet.currencies).toEqual(currenciesList);
    const result = await state.getState().wallet.currencies;
    expect(result).toEqual(expect.arrayContaining(currenciesList));

    const inputValue = screen.getByRole('spinbutton', { name: /valor/i });
    const btnAddExpense = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(inputValue, '10');
    await act(async () => {
      userEvent.click(btnAddExpense);

    })
    await waitFor(() => {
      expect(global.fetch).toBeCalledTimes(2);
    });
  });
})