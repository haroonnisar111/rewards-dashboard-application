import React from 'react';
import Dashboard from './components/dashboard';
import { GlobalStyle } from './styles/globalStyles';
import useFetchTransactions from './hooks/useFetchTransctions';

const App = () => {
  const { transactions, isLoading, error } = useFetchTransactions();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <GlobalStyle />
      <Dashboard transactions={transactions} />
    </>
  );
};

export default App;
