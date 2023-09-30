import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex h-screen items-center justify-center flex-col'>
      <h1 className='text-6xl text-cyan-400 font-extrabold'>Next.js - Full Stack Auth</h1>
      <Link
        href='/login'
        className='py-2 px-10 border border-cyan-300 mt-5 text-cyan-300 rounded-md hover:bg-cyan-300 hover:text-black transition-all'
      >
        Login Here
      </Link>
    </main>
  );
}
