import React from 'react';
import TableRow from './TableRow';

const Expense = ({ expenses, deleteTransaction, handleOpenModal }) => {
  return (
    <div className="col-12 col-md-6 border p-0">
      <h2 className="bg-warning m-0 p-2">
        Total Expense:{' '}
        {expenses.reduce((acc, cur) => {
          acc += cur.amount;
          return acc;
        }, 0)}{' '}
        BDT
      </h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Transaction Title</th>
            <th scope="col">Amount</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length <= 0 && (
            <tr>
              <th className="text-danger text-center">No Expense</th>
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
