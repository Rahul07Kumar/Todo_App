import React from 'react'

function Navbar() {
  return (
    <nav className='flex justify-between bg-blue-800 text-white py-2'> 
        <div className="logo">
            <span className="font-bold text-xl mx-8 cursor-pointer">iTask</span>
        </div>
        <ul className='flex gap-8 mx-8 '>
            <li className='cursor-pointer hover:font-bold transition-all '>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all '>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
