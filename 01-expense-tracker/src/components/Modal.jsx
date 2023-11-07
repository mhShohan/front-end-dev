import React, { useState } from 'react';

const Modal = ({ setOpenModal, modalData, updateTransaction }) => {
  const [title, setTitle] = useState(modalData.title);
  const [amount, setAmount] = useState(modalData.amount);
  const [type, setType] = useState(modalData.type);
  const [isError, setIsError] = useState(false);

  const handleUpdate = () => {
    const newTrans = { title, amount: Number(amount), type };
    updateTransaction(modalData.id, newTrans);
  };
  return (
    <>
      <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-500 bg-opacity-75 flex justify-center items-center'>
        <div className='max-w-sm'>
          <div className='py-20 px-10 border-2 rounded-3xl bg-slate-400'>
            <div className=''>
              <h5 className='text-3xl font-bold text-center mb-5'>Update Transaction</h5>
            </div>
            <div className='modal-body'>
              <form className='form'>
                <input
                  type='text'
                  placeholder='Transaction Title'
                  className='w-full py-1 px-3 mb-3 rounded-lg outline-none'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  type='number'
                  placeholder='Amount (Taka)'
                  className='w-full py-1 px-3 mb-3 rounded-lg outline-none'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <select
                  className='w-full py-1 px-3 mb-3 rounded-lg outline-none'
                  defaultValue={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value=''>Select One*</option>
                  <option value='income'>Income</option>
                  <option value='expense'>Expense</option>
                </select>

                {isError && <div className='alert alert-danger mt-2'>Must Provide All Fields!</div>}
              </form>
            </div>
            <div className='flex justify-center gap-5'>
              <button
                type='button'
                className='bg-red-600 py-1 px-5 rounded-full text-white font-semibold'
                onClick={() => setOpenModal(false)}
              >
                Close
              </button>
              <button
                type='button'
                className='bg-green-600 py-1 px-5 rounded-full text-white font-semibold'
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
