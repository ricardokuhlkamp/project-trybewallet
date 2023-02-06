import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { apiCambio, expenseEdit } from '../redux/actions';
import Table from './Table';

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
    const { dispatch } = this.props;
    dispatch(apiCambio());
  }

  componentDidUpdate() {
    const { id } = this.state;
    const { editor, idToEdit, expenses } = this.props;
    const formDataRequest = expenses.filter((e) => (
      e.id === idToEdit
    ))[0];
    if (editor && id !== formDataRequest.id) {
      this.setState({ ...formDataRequest });
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
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
    dispatch(apiCambio(expenses, null));
    this.setState(() => ({
      id: id + 1,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
      description: '',
    }));
  };

  handleClickUpdate = () => {
    const { dispatch } = this.props;
    const {
      value,
      currency,
      method,
      tag,
      description,
    } = this.state;
    const { idToEdit } = this.props;
    const updateExpense = {
      id: idToEdit,
      value,
      currency,
      method,
      tag,
      description,
    };
    dispatch(apiCambio(null, updateExpense));
    dispatch(expenseEdit(false));
    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
      description: '',
    });
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
    const { currencies, editor } = this.props;

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
              Moeda
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
              Método de pagamento
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
              Categoria
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
            { !editor ? (
              <button
                type="button"
                onClick={ this.handleClick }
              >
                Adicionar despesa
              </button>
            ) : (
              <button
                type="button"
                onClick={ this.handleClickUpdate }
              >
                Editar despesa
              </button>
            )}
          </div>
        </form>
        <Table />
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  idToEdit: PropTypes.number.isRequired,
  editor: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
