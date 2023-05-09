import React from 'react';

const Ballance = ({ totalBallance }) => {
  return (
    <div className="col-12 col-md-6 border flex">
      <div className="text-center">
        <h1>Total Ballance</h1>
        <h2>{totalBallance} BDT</h2>
        {totalBallance < 0 && (
          <div className="alert alert-danger mt-2">
            You have spent more then your income!
          </div>
        )}
      </div>
    </div>
  );
};

export default Ballance;
