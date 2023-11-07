import React from 'react';

const TableRow = ({ transaction, index, deleteTransaction, handleOpenModal }) => {
  return (
    <tr className='grid grid-cols-4 text-center border-b'>
      <th scope='row'>{index + 1}</th>
      <td>{transaction.title}</td>
      <td>{transaction.amount} USD</td>
      <td>
        <div className='btn-group' role='group'>
          <button
            type='button'
            className='px-2 bg-green-600 text-white rounded-sm'
            onClick={() => handleOpenModal(transaction)}
          >
            Edit
          </button>
          <button
            type='button'
            className='px-1 bg-red-600 text-white rounded-sm'
            onClick={() => deleteTransaction(transaction.id)}
          >
            X
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
