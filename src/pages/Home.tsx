import Button from '@mui/material/Button';
import { IUsers } from '../types/global.typing'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

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

  const handleEdit = (email: string) => {
    redirect(`/EditUser/${email}`)
  }

  const handleDelete = (email: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedUsers = users.filter(user => user.email !== email)
        setUsers(updatedUsers)
        localStorage.setItem('users', JSON.stringify(updatedUsers))
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
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
                        <Button variant="outlined" className='button' sx={{mx:2}} onClick={() => handleEdit(user.email)}>Edit</Button>
                        <Button variant="outlined" className='button' color="error" onClick={() => handleDelete(user.email)}>
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