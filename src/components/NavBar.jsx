import React from 'react'

const NavBar = () => {
    return (
        <nav className='flex justify-between bg-indigo-900 text-white py-2'>
            <div className="logo"><span className='text-2xl font-bold mx-9'>
                iTask
            </span>
            </div>
            <ul className="flex gap-5 mx-9">
                <li className="hover:cursor-pointer hover:font-bold transition-all duration-300">Home</li>
                <li className="hover:cursor-pointer hover:font-bold transition-all duration-300">Your Tasks</li>
            </ul>
        </nav>
    )
}

export default NavBar
