import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  state = {
    cambio: 'BRL',
  };

  render() {
    const { cambio } = this.state;
    const { email, expenses } = this.props;
    console.log(expenses);
    return (
      <div>
        <h1>TrybeWallet</h1>
        <h5
          data-testid="email-field"
        >
          {`Email: ${email}`}
        </h5>
        <h5>
          Total das Dispesas R$
          {' '}
          <span data-testid="total-field">
            { expenses.reduce((acc, curr) => (
              acc + (curr.value * curr.exchangeRates[curr.currency].ask)
            ), 0).toFixed(2)}
          </span>
        </h5>
        <h5
          data-testid="header-currency-field"
        >
          { cambio }
        </h5>
      </div>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
}.isRequired;

export default connect(mapStateToProps)(Header);
