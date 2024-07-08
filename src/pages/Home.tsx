import Button from '@mui/material/Button';
import { IUsers } from '../types/global.typing'
import { useNavigate } from 'react-router-dom';

interface HomePageProps {
  users: IUsers[];
}

const Home: React.FC<HomePageProps> = ({ users }) => {

  const redirect = useNavigate();

  const handleEdit = () => {
    redirect('/edituser')
  }

  return (
    <div>
      <div className='w-full'>
        <div>
          <h1 className=' text-center text-4xl font-bold m-10'>Users</h1>
        </div>
        {
          users.length === 0 ? (<h1 className='text-center text-4xl font-bold mt-32'>No Users</h1>) : (

            <div className='table-wrapper'>
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>First Name</th>
                    <th>Second Name</th>
                    <th>Email</th>
                    <th>Phone no.</th>
                    <th>City</th>
                    {/* <th>Province</th> */}
                    <th>Country</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td>
                        {user.imageUrl && <img src={user.imageUrl} style={{ maxWidth: '100px', height: 'auto' }} />}
                      </td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.phoneNo}</td>
                      <td>{user.city}</td>
                      {/* <td>{user.province}</td> */}
                      <td>{user.country}</td>
                      <td>
                        <Button variant="outlined" sx={{ mx: 1 }} onClick={handleEdit}>Edit</Button>
                        <Button variant="outlined" color="error">
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )
        }
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