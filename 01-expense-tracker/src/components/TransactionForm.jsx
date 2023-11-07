import React, { useEffect, useState } from 'react';
import randomId from '../utils/randomId';

const TransactionForm = ({ setTransactions }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
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
      setAmount('');
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
    <div className='flex border rounded-3xl'>
      <div className='p-4'>
        <h2 className='text-center text-xl font-bold'>Your Transactions</h2>
        <form className='form' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Transaction Title'
            className='w-full outline-none border mt-2 py-1 px-4 rounded-lg'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type='number'
            placeholder='Amount (USD)'
            className='w-full outline-none border mt-2 py-1 px-4 rounded-lg'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select
            className='w-full outline-none border mt-2 py-1 px-4 rounded-lg'
            defaultValue={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value=''>Select One*</option>
            <option value='income'>Income</option>
            <option value='expense'>Expense</option>
          </select>
          <div className='flex items-center justify-center my-2'>
            <input
              type='submit'
              value='Add Transaction'
              className='bg-blue-500 py-1 px-5 rounded-full text-white font-bold'
            />
          </div>
          {isError && (
            <div className='bg-red-300 py-1 px-5  text-center rounded-full'>
              Must Provide All Fields value!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
