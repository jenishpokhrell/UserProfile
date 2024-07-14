import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom"
import { useState } from 'react';

const Navbar = () => {

    const [open, setOpen] = useState(false);

    const toggleNavbar = () => {
        setOpen(!open)
    }

  return (
    <div className='md:w-full md:h-20 bg-black text-white md:flex items-center md:pl-20 z-30'>
        <div className='md:m-0 md:p-0 sm:ml-14 sm:p-5'>
            <h1 className="md:text-4xl text-3xl font-bold">UDAT</h1>
        </div>
        
        <div className={`absolute top-19 pl-[67px] left-0 w-full bg-black md:static md:flex md:items-center ${open ? "block" : "hidden"}`}>
        <nav>
          <ul className="flex flex-col md:flex-row md:space-x-6">
            <li className="m-3 md:m-5 cursor-pointer">
              <Link to="/" onClick={toggleNavbar}>Home</Link>
            </li>
            <li className="m-3 md:m-5 cursor-pointer">
              <Link to="/adduser" onClick={toggleNavbar}>AddUser</Link>
            </li>
            <li className="m-3 md:m-5 cursor-pointer">
              <Link to="/userslist" onClick={toggleNavbar}>Users</Link>
            </li>
          </ul>
        </nav>
      </div>   
        <div className='md:hidden absolute top-6 right-10 'onClick={toggleNavbar}>
           { open ? <CloseIcon className='cursor-pointer'  /> : <MenuIcon className=' cursor-pointer'/> }
        </div>
    </div>
  )
}

export default Navbar