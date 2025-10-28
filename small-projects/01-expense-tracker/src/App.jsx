import { useEffect, useState } from 'react';
import Ballance from './components/Ballance';
import Expense from './components/Expense';
import Income from './components/Income';
import Modal from './components/Modal';
import TransactionForm from './components/TransactionForm';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [totalBallance, setTotalBallance] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [update, setUpdate] = useState(false);

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((p) => p.id !== id));
  };

  const handleOpenModal = (transaction) => {
    setModalData(transaction);
    setOpenModal(true);
  };

  const updateTransaction = (id, transaction) => {
    const transId = transactions.findIndex((t) => t.id === id);
    setTransactions((prev) => {
      prev[transId] = { ...prev[transId], ...transaction };
      return prev;
    });
    setOpenModal(false);
    setUpdate((prev) => !prev);
  };

  useEffect(() => {
    const total = transactions.reduce((acc, cur) => {
      if (cur.type === 'income') {
        acc += cur.amount;
      } else {
        acc -= cur.amount;
      }
      return acc;
    }, 0);
    setTotalBallance(total);
  }, [transactions, update]);
  return (
    <div className='max-w-4xl m-auto px-10'>
      <h1 className='text-center text-4xl py-2 font-bold mb-2'>Income and Expense Tracker!</h1>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <Ballance totalBallance={totalBallance} />
        <TransactionForm setTransactions={setTransactions} />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
        <Income
          incomes={transactions.filter((t) => t.type === 'income')}
          deleteTransaction={deleteTransaction}
          handleOpenModal={handleOpenModal}
        />
        <Expense
          expenses={transactions.filter((t) => t.type === 'expense')}
          deleteTransaction={deleteTransaction}
          handleOpenModal={handleOpenModal}
        />
      </div>
      {openModal && (
        <Modal
          setOpenModal={setOpenModal}
          modalData={modalData}
          updateTransaction={updateTransaction}
        />
      )}
    </div>
  );
}

export default App;
