import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { expenseDeleteRow, idExpenseEdit, expenseEdit } from '../redux/actions';
import styles from './Table.module.css';
import editarPicture from '../imgs/Editar.png';
import excluirPicture from '../imgs/Vector.png';

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
      <div className={ styles.container_table }>
        <table>
          <thead>
            <tr>
              <th className={ styles.cell_description }>Descrição</th>
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
            { expenses?.map((e) => (
              <tr key={ `${Number(e.id)}` }>
                <td>{ e.description }</td>
                <td>{ e.tag }</td>
                <td>{ e.method }</td>
                <td>{ Number(e.value).toFixed(2) }</td>
                <td>{ e.exchangeRates[e.currency].name }</td>
                <td>{ Number(e.exchangeRates[e.currency].ask).toFixed(2) }</td>
                <td>{ Number(e.exchangeRates[e.currency].ask * e.value).toFixed(2) }</td>
                <td>Real</td>
                <td className={ styles.buttons }>
                  <button
                    className={ styles.button_edit }
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.handleClickEdit(e.id) }
                  >
                    <img src={ editarPicture } alt="botão de editar" />
                  </button>
                  <button
                    className={ styles.button_delete }
                    id={ Number(e.id) }
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => this.handleClick(Number(e.id)) }
                  >
                    <img src={ excluirPicture } alt="botão de excluir" />
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
