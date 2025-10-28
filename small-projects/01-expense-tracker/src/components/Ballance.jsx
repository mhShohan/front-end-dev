const Ballance = ({ totalBallance }) => {
  return (
    <div className='flex justify-center items-center border rounded-3xl'>
      <div className='text-center'>
        <h1 className='text-2xl'>Total Ballance</h1>
        <h2 className='text-2xl font-bold'>{totalBallance} USD</h2>
        {totalBallance < 0 && (
          <div className='bg-red-300 py-1 px-5 text-center rounded-full'>
            You have spent more then your income!
          </div>
        )}
      </div>
    </div>
  );
};

export default Ballance;
