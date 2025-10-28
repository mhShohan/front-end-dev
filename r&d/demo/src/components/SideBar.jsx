import React from 'react';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
    return (
        <div className='bg-blue-900 h-screen text-gray-50 font-bold p-4'>
            <ul>
                <li className='mb-4 border-b'>
                    <NavLink
                        to='/'
                        className={({ isActive }) =>
                            isActive ? 'text-blue-300' : ''
                        }
                    >
                        Home
                    </NavLink>
                </li>
                <li className='mb-4 border-b'>
                    <NavLink
                        to='/about'
                        className={({ isActive }) =>
                            isActive ? 'text-blue-300' : ''
                        }
                    >
                        About
                    </NavLink>
                </li>
                <li className='mb-4 border-b'>
                    <NavLink
                        to='/contacts'
                        className={({ isActive }) =>
                            isActive ? 'text-blue-300' : ''
                        }
                    >
                        Contacts
                    </NavLink>
                </li>
                <li className='mb-4 border-b'>
                    <NavLink
                        to='/features'
                        className={({ isActive }) =>
                            isActive ? 'text-blue-300' : ''
                        }
                    >
                        Features
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default SideBar;
