import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

const emailTeste = 'tryber@trybe.com';
const creditCardText = 'Cartão de crédito';
const editBtnTestId = 'edit-btn';

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

    const btnEdit = screen.getAllByTestId(editBtnTestId);
    const btnEditSecond = btnEdit[1];

    userEvent.click(btnEditSecond);

    const inputValue = screen.getByTestId('value-input');
    userEvent.clear(inputValue);
    userEvent.type(inputValue, '60');

    const btnAddExpense = screen.getByRole('button', {
      name: 'Editar despesa',
    });
    userEvent.click(btnAddExpense);
    await waitFor(() => {
      expect(screen.getByRole('cell', { name: /60\.00/i })).toBeInTheDocument();
    });
  });
});
