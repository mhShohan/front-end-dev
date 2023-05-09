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
      <div className="modal show">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Transaction</h5>
            </div>
            <div className="modal-body">
              <form className="form">
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

                {isError && (
                  <div className="alert alert-danger mt-2">
                    Must Provide All Fields!
                  </div>
                )}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setOpenModal(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
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
