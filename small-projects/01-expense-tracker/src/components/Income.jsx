import React from 'react';
import TableRow from './TableRow';

const Income = ({ incomes, deleteTransaction, handleOpenModal }) => {
  return (
    <div className='border w-full'>
      <h2 className='bg-green-300 text-center p-1'>
        Total Income:{' '}
        {incomes.reduce((acc, cur) => {
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
          {incomes.length <= 0 && (
            <tr>
              <th className='text-red-500 text-center'>No Incomes</th>
            </tr>
          )}
          {incomes.length > 0 &&
            incomes.map((income, index) => (
              <TableRow
                transaction={income}
                key={income.id}
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

export default Income;
