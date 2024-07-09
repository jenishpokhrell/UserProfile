import Button from '@mui/material/Button';
import { IUsers } from '../types/global.typing'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface HomePageProps {
  users: IUsers[];
  setUsers: React.Dispatch<React.SetStateAction<IUsers[]>>;
}

const Home: React.FC<HomePageProps> = ({ users, setUsers }) => {

  const redirect = useNavigate();

  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, [setUsers]);

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
    </div>
  )
}

export default Home