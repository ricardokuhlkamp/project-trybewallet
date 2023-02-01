import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  state = {
    despesaTotal: 0,
    cambio: 'BRL',
  };

  render() {
    const { despesaTotal, cambio } = this.state;
    const { email } = this.props;
    return (
      <div>
        <h1>TrybeWallet</h1>
        <h5
          data-testid="email-field"
        >
          {`Email: ${email}`}
        </h5>
        <h5
          data-testid="total-field"
        >
          {`Despesa Total R$ ${despesaTotal}`}
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

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
}.isRequired;

export default connect(mapStateToProps)(Header);
