import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { validEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
    isDisabled: true,
  };

  validate = () => {
    const { email, senha } = this.state;
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const regexEmail = new RegExp(regex);
    const n = 6;
    const senhaBool = senha.length >= n;
    const emailBool = regexEmail.test(email);
    this.setState({ isDisabled: !(senhaBool && emailBool) });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.validate);
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(validEmail(email));
    history.push('/carteira');
  };

  render() {
    const { isDisabled, email, senha } = this.state;
    return (
      <div>
        <label htmlFor="email">
          <input
            placeholder="insira seu email"
            data-testid="email-input"
            type="email"
            id="email"
            value={ email }
            name="email"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="senha">
          <input
            placeholder="insira sua senha"
            data-testid="password-input"
            type="senha"
            id="senha"
            value={ senha }
            name="senha"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ isDisabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
