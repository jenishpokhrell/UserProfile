import { useState } from 'react'
import Navbar from '../components/Navbar'
import { IUsers } from '../types/global.typing'
import AddUser from './AddUser'

const Home: React.FC = () => {


  const [users, setUsers] = useState<IUsers[]>([])

  const handleAddUser = (user: IUsers) => {
    setUsers([...users, user])
  }
  return (
    <div>
      <Navbar />
      <div className='w-full'>
        <div>
          <h1 className=' text-center text-4xl font-bold m-10'>Users</h1>
        </div>
        <div className='table-wrapper'>
        {/* <AddUser onSubmit={handleAddUser} /> */}
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Second Name</th>
                <th>Email</th>
                <th>Phone no.</th>
                <th>City</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNo}</td>
                  <td>{user.city}</td>
                  <td>{user.country}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* <div className='text-center text-4xl mt-10'>
        <p>1. Storing the data from form</p>
        <p>2. Creating User Profile page</p>
        <p>3. Adding functionality like Edit, Delete User</p>
        <p></p>
      </div> */}
    </div>
  )
}

export default Home