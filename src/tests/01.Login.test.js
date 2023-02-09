import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

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
