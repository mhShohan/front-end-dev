'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface UserProps {
  _id: string;
  username: string;
  email: string;
}

const UserProfile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<null | UserProps>(null);

  const logout = async () => {
    try {
      const res = await axios.get('/api/user/logout');
      if (res.data.code === 200) {
        toast.success(res.data.message);
        router.push('/');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    (async () => {
      const res = await axios.get('/api/user/self');
      setUser(res.data.data);
      setLoading(false);
    })();
  }, []);

  return (
    <section className='flex justify-center items-center h-screen'>
      <div className='w-[400px] border border-cyan-300 p-10  rounded-lg text-center'>
        {loading ? (
          <h2>Loading....</h2>
        ) : (
          <div>
            <h1 className='text-3xl text-center'>
              Hello,{' '}
              <span className='bg-amber-500 px-4 uppercase text-slate-900 rounded-full font-bold'>
                {user?.username}
              </span>
            </h1>
            <h2>{user?.email}</h2>
          </div>
        )}
        <button
          onClick={logout}
          className='bg-cyan-300 py-2 px-12 rounded-full mt-10 text-slate-900'
        >
          Logout
        </button>
      </div>
    </section>
  );
};

export default UserProfile;
