import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import styles from './Wallet.module.css';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <div className={ styles.container_components }>
          <Header />
          <WalletForm />
        </div>
        <Table />
      </div>
    );
  }
}

export default Wallet;
