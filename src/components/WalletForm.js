import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { apiCambio } from '../redux/actions';

class WalletForm extends Component {
  state = {
    method: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
    tag: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
  };

  componentDidMount() {
    // this.apiCotacao();
    // preciso fazer um dispatch para chamar a api
    // dentro dessa chamada eu preciso ter um segundo dispatc, no qual eu irei mandar para o reducer as moedas salvas
    const { dispatch } = this.props;
    dispatch(apiCambio());
  }

  render() {
    const { method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <div>
            <label htmlFor="value">
              Valor
              <input
                id="value"
                name="value"
                // value={value}
                type="number"
                onChange={ this.handleChange }
                data-testid="value-input"
              />
            </label>
            <label htmlFor="description">
              Descrição
              <input
                id="description"
                name="description"
                // value={value}
                type="text"
                onChange={ this.handleChange }
                data-testid="description-input"
              />
            </label>
            <label htmlFor="currencies">
              <select
                id="currencies"
                data-testid="currency-input"
              >
                { currencies.map((coin, index) => (
                  <option
                    key={ index }
                    // value={ coin }
                    // id={ coin }
                  >
                    { coin }
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="method">
              <select
                id="method"
                data-testid="method-input"
              >
                { method.map((methodPay, index) => (
                  <option
                    key={ index }
                    // value={ methodPay }
                    // id={ methodPay }
                  >
                    { methodPay }
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="tag">
              <select
                id="tag"
                data-testid="tag-input"
              >
                { tag.map((tagTask, index) => (
                  <option
                    key={ index }
                    // value={ tagTask }
                    // id={ tagTask }
                  >
                    { tagTask }
                  </option>
                ))}
              </select>
            </label>
          </div>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.shape([]).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
