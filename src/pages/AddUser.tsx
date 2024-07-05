import React from 'react'
import Navbar from '../components/Navbar'
import Form from '../components/Form'

const AddUser = () => {
  return (
    <div>
        <Navbar/>
        <div className='text-center text-3xl font-bold m-10'>
            <h1>Add User</h1>
        </div>
        <Form/>
    </div>
  )
}

export default AddUser