import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

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
