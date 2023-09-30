const UserProfile = ({ params }: any) => {
  return (
    <section className='flex justify-center items-center h-screen'>
      <div className='w-[400px] border border-cyan-300 p-10  rounded-lg'>
        <h1 className='text-5xl text-center'>profile {params.id}</h1>
      </div>
    </section>
  );
};

export default UserProfile;
