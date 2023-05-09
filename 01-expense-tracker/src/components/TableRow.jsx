import React from 'react';

const TableRow = ({
  transaction,
  index,
  deleteTransaction,
  handleOpenModal,
}) => {
  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{transaction.title}</td>
      <td>{transaction.amount} BDT</td>
      <td>
        <div className="btn-group" role="group">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => handleOpenModal(transaction)}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger"
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
