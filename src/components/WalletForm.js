import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { apiCambio } from '../redux/actions';

class WalletForm extends Component {
  state = {
    methodList: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
    tagList: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
    id: 0,
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
  };

  componentDidMount() {
    // this.apiCotacao();
    // preciso fazer um dispatch para chamar a api
    // dentro dessa chamada eu preciso ter um segundo dispatc, no qual eu irei mandar para o reducer as moedas salvas
    const { dispatch } = this.props;
    dispatch(apiCambio());
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleChangeTag = (event) => {
    this.setState({ tag: event.target.value });
  };

  handleChangeMethod = (event) => {
    this.setState({ method: event.target.value });
  };

  handleChangeCurrency = (event) => {
    this.setState({ currency: event.target.value });
  };

  handleClick = () => {
    const {
      id,
      value,
      currency,
      method,
      tag,
      description,
    } = this.state;

    const expenses = {
      id,
      value,
      currency,
      method,
      tag,
      description,
    };
    const { dispatch } = this.props;
    dispatch(apiCambio(expenses));
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
      description: '',
    }));
  };

  render() {
    const {
      methodList,
      tagList,
      tag,
      method,
      currency,
      value,
      description,
    } = this.state;
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
                value={ value }
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
                value={ description }
                type="text"
                onChange={ this.handleChange }
                data-testid="description-input"
              />
            </label>
            <label htmlFor="currencies">
              <select
                id="currencies"
                name="currencies"
                data-testid="currency-input"
                value={ currency }
                onChange={ this.handleChangeCurrency }
              >
                { currencies.map((curr, index) => (
                  <option
                    key={ index }
                    value={ curr }
                    id={ curr }
                  >
                    { curr }
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="method">
              <select
                id="method"
                name="method"
                data-testid="method-input"
                value={ method }
                onChange={ this.handleChangeMethod }
              >
                { methodList.map((met, index) => (
                  <option
                    key={ index }
                    value={ met }
                    id={ met }
                  >
                    { met }
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="tag">
              <select
                id="tag"
                name="tag"
                data-testid="tag-input"
                value={ tag }
                onChange={ this.handleChangeTag }
              >
                { tagList.map((tagItem, index) => (
                  <option
                    key={ index }
                    value={ tagItem }
                    id={ tagItem }
                  >
                    { tagItem }
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={ this.handleClick }
            >
              Adicionar despesa
            </button>
          </div>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
