'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';

const VerifyEmail = () => {
  const [token, setToken] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const res = await axios.post('/api/user/verifyemail', { token });
      console.log(res.data);

      if (res.data.code === 200) {
        setVerified(true);
        toast.success('Email Verified!');
      }
      if (res.data.code === 404) {
        setVerified(false);
        setError(res.data.error);
        toast.error(res.data.error);
      }
    } catch (error: any) {
      setError(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken || '');
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-96 border-2 border-slate-500 rounded-lg'>
        {verified && (
          <div className='text-center text-2xl p-10'>
            <h1 className='text-green-500'>Verified</h1>
            <Link href='/login'>Login</Link>
          </div>
        )}
        {error && (
          <div className='text-center text-2xl p-10'>
            <h1 className='text-red-600'>{error}</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
