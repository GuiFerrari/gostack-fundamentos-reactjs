import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiCoffee, FiAward } from 'react-icons/fi';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      await api.get('transactions').then(res => {
        setTransactions(res.data.transactions);
        setBalance(res.data.balance);
      });
    }

    loadTransactions();
  }, []);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const showIcon = (title: string) => {
    if (title === 'Food') {
      return <FiCoffee size={20} />;
    }
    if (title === 'Salary') {
      return <FiAward size={20} />;
    }
    return <FiDollarSign size={20} />;
  };

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">
              R$
              {` ${formatValue(Number(balance.income))}`}
            </h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">
              R$
              {` ${formatValue(Number(balance.outcome))}`}
            </h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">
              R$
              {` ${formatValue(Number(balance.total))}`}
            </h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(transaction => {
                return (
                  <tr key={transaction.id}>
                    <td className="title">{transaction?.title}</td>
                    <td className={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      R$
                      {` ${formatValue(Number(transaction.value))}`}
                    </td>
                    <td className="category">
                      {showIcon(transaction.category?.title)}
                      <span>{transaction.category?.title}</span>
                    </td>
                    <td>{formatDate(transaction.created_at)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
