import React from 'react';
import TableRow from './TableRow';

const Expense = ({ expenses, deleteTransaction, handleOpenModal }) => {
  return (
    <div className='border'>
      <h2 className='text-center bg-yellow-200 p-1'>
        Total Expense:{' '}
        {expenses.reduce((acc, cur) => {
          acc += cur.amount;
          return acc;
        }, 0)}{' '}
        USD
      </h2>
      <table className='w-full'>
        <thead>
          <tr className='grid grid-cols-4 border-b-2'>
            <th scope='col'>No.</th>
            <th scope='col'>Transactions</th>
            <th scope='col'>Amount</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length <= 0 && (
            <tr>
              <th className='text-red-500 text-center'>No Expense</th>
            </tr>
          )}
          {expenses.length > 0 &&
            expenses.map((expense, index) => (
              <TableRow
                transaction={expense}
                key={expense.id}
                index={index}
                deleteTransaction={deleteTransaction}
                handleOpenModal={handleOpenModal}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Expense;
