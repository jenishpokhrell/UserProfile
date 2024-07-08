import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className=' w-full h-20 bg-black text-white flex items-center pl-20'>
        <div>
            <h1 className="text-4xl font-bold">UDAT</h1>
        </div>
        <div className="pl-20">
            <nav>
                <ul className="flex">
                    <li className="m-5 cursor-pointer">
                       <Link to="/">Home</Link>
                    </li>
                    <li className="m-5  cursor-pointer">
                       <Link to="/adduser">AddUser</Link>
                    </li>
                    <li className="m-5  cursor-pointer">
                       <Link to="/userslist">Users</Link>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
  )
}

export default Navbar