'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

const SignUpPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('/api/user/signup', user);

      if (res.data.code === 201) {
        toast.success('User registration successfully!');
        router.push('/login');
      }
      if (res.data.code === 409) {
        toast.error(res.data.error);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.username && user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <section className='flex justify-center items-center h-screen'>
      <div className='w-[400px] border border-cyan-300 p-10  rounded-lg'>
        <h1 className='text-2xl text-center text-cyan-300 mb-5'>
          {loading ? 'Registering a new account' : 'Register a new account!'}
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            className='w-full p-2 rounded-md border-none outline-none text-gray-800 mb-3 bg-cyan-100'
            placeholder='username'
            value={user.username}
            onChange={(e) => setUser((prev) => ({ ...prev, username: e.target.value }))}
          />
          <input
            type='text'
            className='w-full p-2 rounded-md border-none outline-none text-gray-800 mb-3 bg-cyan-100'
            placeholder='Email'
            value={user.email}
            onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
          />
          <input
            type='text'
            className='w-full p-2 rounded-md border-none outline-none text-gray-800 mb-3 bg-cyan-100'
            placeholder='Password'
            value={user.password}
            onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
          />
          <div className='flex justify-center'>
            <button
              disabled={buttonDisabled}
              className='py-2 px-8 bg-cyan-300 rounded-full text-gray-800 font-bold disabled:bg-slate-600'
            >
              Register
            </button>
          </div>
        </form>
        <h1 className='text-center mt-5 text-blue-700'>
          <Link href='/login'>Already Have account? Visit Here!</Link>
        </h1>
      </div>
    </section>
  );
};

export default SignUpPage;
