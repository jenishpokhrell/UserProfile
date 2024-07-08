import m5 from '../assets/m5.jpg'
import { IUsers } from '../types/global.typing';

interface UsersListProps {
  users: IUsers[];
}

const UsersList: React.FC<UsersListProps> = ({ users }) => {
  return (
    <div>
      <div className='m-10'>
        <h1 className=' text-center text-4xl font-bold'>All Users</h1>
      </div>
      {users.length === 0 ? (<h1 className='text-center text-4xl font-bold mt-32'>No Users</h1>) : (

        <div>
          {users.map((user, index) => (
            <div key={index} className=' w-3/4 flex items-center rounded-tr-3xl relative left-44 my-10 shadow-2xl'>
              <div className='w-2/4'>
                {user.imageUrl && <img src={user.imageUrl} style={{ width: '100%', height: 'auto', padding: '30px' }} />}
              </div>
              <div className=' px-10 text-2xl'>
                <h1 className='text-3xl font-bold'>{user.firstName} {user.lastName}</h1>
                <p><span>Email:</span> {user.email}</p>
                <p><span>Contact no.:</span> {user.phoneNo}</p>
                <h3 className='text-2xl font-bold'>Address</h3>
                <p> <span>City:</span> {user.city}</p>
                <p><span>State:</span> {user.district}</p>
                <p><span>Province:</span> {user.province}</p>
                <p><span>Country:</span> {user.country}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UsersList



{/* <h1 className='text-3xl font-bold'>{user.firstName} {user.lastName}</h1>
<p><span>Email:</span> {user.email}</p>
<p><span>Contact no.:</span> {user.phoneNo}</p>
<h3 className='text-2xl font-bold'>Address</h3>
<p> <span>City:</span> {user.city}</p>
<p><span>State:</span> {user.district}</p>
<p><span>Province:</span> {user.province}</p>
<p><span>Country:</span> {user.country}</p> */}


{/* <h1 className='text-3xl font-bold'>Jessica Parker</h1>
              <p><span>Email:</span>jessica1@gmail.com</p>
              <p><span>Contact no.:</span>9876334211</p>
              <h3 className='text-2xl font-bold'>Address</h3>
              <p> <span>City:</span> Gwarko</p>
              <p><span>State:</span> Lalitpur</p>
              <p><span>Province:</span> 3</p>
              <p><span>Country:</span>Nepal</p> 
                              <img src={m5} alt="" style={{ width: '100%', height: 'auto', padding: '30px' }} />
*/}