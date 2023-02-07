import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { expenseDeleteRow, idExpenseEdit, expenseEdit } from '../redux/actions';

class Table extends Component {
  handleClick = (id) => {
    const { dispatch, expenses } = this.props;
    const filterExpenses = expenses.filter((e) => Number(e.id) !== Number(id));
    dispatch(expenseDeleteRow(filterExpenses));
  };

  handleClickEdit = (idBtn) => {
    const { dispatch } = this.props;
    dispatch(idExpenseEdit(Number(idBtn)));
    dispatch(expenseEdit(true));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((e) => (
              <tr key={ `${Number(e.id)}` }>
                {console.log(e.id)}
                <td>{ e.description }</td>
                <td>{ e.tag }</td>
                <td>{ e.method }</td>
                <td>{ Number(e.value).toFixed(2) }</td>
                <td>{ e.exchangeRates[e.currency].name }</td>
                <td>{ Number(e.exchangeRates[e.currency].ask).toFixed(2) }</td>
                <td>{ Number(e.exchangeRates[e.currency].ask * e.value).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.handleClickEdit(e.id) }
                  >
                    Editar
                  </button>
                  <button
                    id={ Number(e.id) }
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => this.handleClick(Number(e.id)) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
  editor: wallet.editor,
});

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(Table);
