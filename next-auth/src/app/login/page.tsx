'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('/api/user/login', user);

      if (res.data.code >= 400) {
        toast.error(res.data.error);
      }
      if (res.data.code === 203) {
        toast.success('Login Successfully!');
        router.push(`/profile/${res.data.data.username}`);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <section className='flex justify-center items-center h-screen'>
      <div className='w-[400px] border border-cyan-300 p-10  rounded-lg'>
        <h1 className='text-2xl text-center text-cyan-300 mb-5'>
          {loading ? 'processing' : 'Login into your account!'}
        </h1>
        <form onSubmit={handleLogin}>
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
              className='py-2 px-8 bg-cyan-300 rounded-full text-gray-800 font-bold disabled:bg-gray-500'
            >
              Login
            </button>
          </div>
        </form>
        <h1 className='text-center mt-5 text-blue-700'>
          <Link href='/signup'>Do not Have an account? Visit Here!</Link>
        </h1>
      </div>
    </section>
  );
};

export default LoginPage;
