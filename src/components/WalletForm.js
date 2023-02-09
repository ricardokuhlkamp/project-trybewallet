import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { apiCambio, expenseEdit } from '../redux/actions';
// import Table from './Table';
import styles from './WalletForm.module.css';

class WalletForm extends React.Component {
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

  componentDidUpdate(prevProps) {
    const { editor, idToEdit, expenses } = this.props;
    if (editor !== prevProps?.editor) {
      const formDataRequest = expenses?.filter((e) => (
        e.id === idToEdit
      ))[0];
      if (editor) {
        this.setState({ ...formDataRequest });
      }
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
    const { id, value, currency, method, tag, description } = this.state;
    const expenses = { id, value, currency, method, tag, description };
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
    const { dispatch, expenses } = this.props;
    const { value, currency, method, tag, description } = this.state;
    const { idToEdit } = this.props;
    const updateExpense = { id: idToEdit, value, currency, method, tag, description };
    dispatch(apiCambio(null, updateExpense));
    dispatch(expenseEdit(false));
    this.setState({
      id: expenses[expenses.length - 1].id + 1,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
      description: '',
    });
  };

  render() {
    const { methodList, tagList, tag, method, currency, value, description } = this.state;
    const { currencies, editor } = this.props;

    return (
      <form className={ styles.container_form }>
        <div className={ styles.container_fields }>
          <div className={ styles.container_input_description }>
            <label
              htmlFor="description"
              className={ styles.labelDescriptionTxt }
            >
              Descrição
              <input
                className={ styles.inputDescriptionValue }
                id="description"
                name="description"
                value={ description }
                type="text"
                onChange={ this.handleChange }
                data-testid="description-input"
              />
            </label>
          </div>
          <div className={ styles.container_input_category }>
            <label
              htmlFor="tag"
              className={ styles.labelCategoryTxt }
            >
              Categoria
              <select
                className={ styles.inputSelectCategory }
                id="tag"
                name="tag"
                data-testid="tag-input"
                value={ tag }
                onChange={ this.handleChangeTag }
              >
                {tagList?.map((tagItem, index) => (
                  <option
                    data-testid={ tagItem }
                    key={ index }
                    value={ tagItem }
                    id={ tagItem }
                  >
                    {tagItem}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className={ styles.container_input_value }>
            <label
              htmlFor="value"
              className={ styles.labelValueTxt }
            >
              Valor
              <input
                className={ styles.inputValueField }
                id="value"
                name="value"
                value={ value }
                type="number"
                onChange={ this.handleChange }
                data-testid="value-input"
              />
            </label>
          </div>
          <div className={ styles.container_input_method }>
            <label
              htmlFor="method"
              className={ styles.labelMethodTxt }
            >
              Método de pagamento
              <select
                className={ styles.inputSelectMethod }
                id="method"
                name="method"
                data-testid="method-input"
                value={ method }
                onChange={ this.handleChangeMethod }
              >
                {methodList?.map((met, index) => (
                  <option
                    data-testid={ met }
                    key={ index }
                    value={ met }
                    id={ met }
                  >
                    {met}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className={ styles.container_input_currency }>
            <label
              htmlFor="currencies"
              className={ styles.labelCoinTxt }
            >
              Moeda
              <select
                className={ styles.inputSelectCoin }
                id="currencies"
                name="currencies"
                data-testid="currency-input"
                value={ currency }
                onChange={ this.handleChangeCurrency }
              >
                {currencies?.map((curr, index) => (
                  <option
                    data-testid={ curr }
                    key={ index }
                    value={ curr }
                    id={ curr }
                  >
                    {curr}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className={ styles.container_button }>
          {!editor ? (
            <button
              className={ styles.buttonAddExpense }
              type="button"
              onClick={ this.handleClick }
            >
              Adicionar despesa
            </button>
          ) : (
            <button
              className={ styles.buttonEditExpense }
              type="button"
              onClick={ this.handleClickUpdate }
            >
              Editar despesa
            </button>
          )}
        </div>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
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
