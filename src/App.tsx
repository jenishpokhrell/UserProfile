import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import AddUser from "./pages/AddUser"
import { IUsers } from "./types/global.typing"
import { useState } from "react"
import UsersList from "./pages/UsersList"
import EditUser from "./pages/EditUser"

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
          <Route path='/' element={<Home users={users} setUsers={setUsers}/>}/>
          <Route path='/AddUser' element= {<AddUser onSubmit={handleUser} users={users} setUsers={setUsers}/>}/>
          <Route path='/UsersList' element={<UsersList users={users} setUsers={setUsers}/>} />
          <Route path='/EditUser/:email' element={<EditUser users={users} setUsers={setUsers}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App