import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
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
            { expenses.map((e, index) => (
              <tr key={ index }>
                <td>{ e.description }</td>
                <td>{ e.tag }</td>
                <td>{ e.method }</td>
                <td>{ Number(e.value).toFixed(2) }</td>
                {/* <td>{ e.currency }</td> */}
                <td>{ e.exchangeRates[e.currency].name }</td>
                <td>{ Number(e.exchangeRates[e.currency].ask).toFixed(2) }</td>
                <td>{ Number(e.exchangeRates[e.currency].ask * e.value).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
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
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(Table);
