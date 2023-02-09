import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Header.module.css';
import logo from '../imgs/logoTrybeWallet.png';
import coinsPicture from '../imgs/coins.png';
import iconeEmail from '../imgs/iconeEmail.png';

class Header extends React.Component {
  state = {
    cambio: 'BRL',
  };

  render() {
    const { cambio } = this.state;
    const { email, expenses } = this.props;
    return (
      <div className={ styles.container }>
        <div className={ styles.header_container }>
          <div className={ styles.coins_and_total }>
            <img src={ logo } alt="logo Trybe" className={ styles.logo } />
          </div>
          <div className={ styles.coins_and_total }>
            <img src={ coinsPicture } alt="ilustração de moedas empilhadas" />
            <h5>
              Total das Dispesas R$
              {' '}
              <span data-testid="total-field">
                { expenses.reduce((acc, curr) => (
                  acc + (curr.value * curr.exchangeRates[curr.currency].ask)
                ), 0).toFixed(2)}
              </span>
              <span
                data-testid="header-currency-field"
              >
                { ` ${cambio}` }
              </span>
            </h5>
          </div>
          <div className={ styles.icone_email }>
            <img src={ iconeEmail } alt="ilustração referente ao email" />
            <h5
              data-testid="email-field"
            >
              {`Email: ${email}`}
            </h5>
          </div>
        </div>
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
