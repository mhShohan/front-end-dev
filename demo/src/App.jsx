import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import SideBar from './components/SideBar';

function App() {
    return (
        <>
            <Header />
            <main className='flex'>
                <div className='w-48 flex-none'>
                    <SideBar />
                </div>
                <div className='grow'>
                    <Outlet />
                </div>
            </main>
        </>
    );
}

export default App;
