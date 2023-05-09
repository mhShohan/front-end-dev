import React, { useEffect, useState } from 'react';
import randomId from '../utils/randomId';

const TransactionForm = ({ setTransactions }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title && amount && type) {
      const newTransaction = {
        id: randomId(),
        title,
        amount: Number(amount),
        type,
      };
      setTransactions((prev) => [...prev, newTransaction]);
      setTitle('');
      setAmount(0);
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  useEffect(() => {
    if (!isError) {
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  }, [isError]);

  return (
    <div className="col-12 col-md-6 border flex">
      <div className="my-3">
        <h2 className="text-center">Your Transactions</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Transaction Title"
            className="form-control mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount (Taka)"
            className="form-control mb-2"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select
            className="form-control mb-2"
            defaultValue={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select One*</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <div className="d-grid gap-2">
            <input
              type="submit"
              value="Add Transaction"
              className="btn btn-info btn-block"
            />
          </div>
          {isError && (
            <div className="alert alert-danger mt-2">
              Must Provide All Fields!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
