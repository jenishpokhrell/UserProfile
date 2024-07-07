import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import AddUser from "./pages/AddUser"
import { IUsers } from "./types/global.typing"
import { useState } from "react"

const App:React.FC = () => {

  const [users, setUsers] = useState<IUsers[]>([])

  const handleUser = (user: IUsers) => {
    setUsers([...users, user]);
  };
  return (
    <div>
      <Navbar/>
      <div>
        <Routes>
          <Route path='/' element={<Home users={users}/>}/>
          <Route path='/adduser' element={<AddUser onSubmit={handleUser}/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App