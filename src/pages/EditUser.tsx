import React from 'react'
import { FormControl, TextField, InputLabel, Select, MenuItem, FormHelperText, Menu, CircularProgress, Button, Input } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { IUsers } from '../types/global.typing';
import Swal from 'sweetalert2';

interface IEditUserProps{
  users: IUsers[];
  setUsers: React.Dispatch<React.SetStateAction<IUsers[]>>
}

const EditUser: React.FC<IEditUserProps> = ({users, setUsers}) => {

  const redirect = useNavigate()

  const {email} = useParams<{email : string}>();
  const [user, setUser] = useState<IUsers | null>(null);
  const [loading, setLoading] = useState(true)
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('Nepal');
  const [isDisabled, setIsDisabled] = useState(false)
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all')
        const sortedCountries = response.data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common));
        setCountries(sortedCountries);
        setLoading(false)
      } catch (error) {
        console.log('Error fetching countries: ', error)
        setLoading(false)
      }
    }
    fetchCountries()

    const currentUser = users.find(user => user.email === email)
    console.log("Current user found: ", currentUser)
    if(currentUser){
      setUser(currentUser);
      setSelectedCountry(currentUser.country);
      setImageUrl(currentUser.imageUrl);
    } 
  }, [email, users])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    if(user){
      const selected = event.target.value;
      setSelectedCountry(selected);
      setIsDisabled(selected !== 'Nepal');
      setUser({
        ...user,
        [event.target.name]: event.target.value
      })
    }
  }
  
  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        if(user){
          setUser({...user, imageUrl: reader.result as string})
        }
      };
      reader.readAsDataURL(file);
    }
  }

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(user){
      setUser({
        ...user,
        [event.target.name]: event.target.value
      })
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if(user && user.firstName === '' || user.lastName === '' || user.email === '' || user.phoneNo === ''){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to enter required values.",
      });
      return;
    }
    if(user){
      const updatedUsers = users.map(u => (u.email === user.email ? user : u))
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      redirect('/')
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'User Updated successfully',
        showConfirmButton: false,
        timer: 3000,
      });
  }
  }
  const handleBack = () => {
    redirect('/')
  }
  if (!user) return <div>Loading...</div>;

  return (
    <div className='md:w-full w-full'>
      <div className='text-center text-3xl font-bold m-10'>
        <h1>Add User</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className=" md:ml-24 sm:ml-20">
            <TextField
            className='md:w-1/6 w-3/4'
              margin="normal"
              sx={{ m: 2 }}
              id="outlined-basic"
              label="First Name"
              name="firstName"
              variant="outlined"
              value={user?.firstName}
              onChange={changeHandler} required />
            <TextField
            className='md:w-1/6 w-3/4'
              margin="normal"
              sx={{ m: 2 }}
              id="outlined-basic"
              label="Last Name"
              name="lastName"
              variant="outlined"
              value={user?.lastName}
              onChange={changeHandler} required />
            <TextField
            className='md:w-1/6 w-3/4'
              margin="normal"
              sx={{ m: 2 }}
              id="outlined-basic"
              label="Email"
              name="email"
              variant="outlined"
              value={user?.email}
              onChange={changeHandler} required />
            <TextField
            className='md:w-1/6 w-3/4'
              margin="normal"
              sx={{ m: 2 }}
              id="outlined-basic"
              label="Phone no."
              name="phoneNo"
              variant="outlined"
              value={user?.phoneNo}
              onChange={changeHandler} required />
            <TextField
            className='md:w-1/6 w-3/4'
              margin="normal"
              sx={{ m: 2 }}
              id="outlined-basic"
              label="DOB"
              placeholder='yyyy-mm-dd'
              name="birthDate"
              variant="outlined"
              value={user?.birthDate}
              onChange={changeHandler} required />
          </div>
          <div className=" md:flex md:ml-24 sm:ml-20">
            <div >
              <p className=" ml-4 text-2xl font-semibold ">Address</p>
              <TextField
              className='md:w-[240px] w-3/4'
                margin="normal"
                sx={{ m: 2 }}
                id="outlined-basic"
                label="City"
                name="city"
                variant="outlined"
                value={user?.city}
                onChange={changeHandler} required />
              <TextField
              className='md:w-[240px] sm:w-3/4'
                margin="normal"
                sx={{ m: 2 }}
                id="outlined-basic"
                label="District/State"
                name="district"
                variant="outlined"
                value={user?.district}
                onChange={changeHandler} required />
            </div>
            <div className=" md:flex md:justify-center md:items-center">
              <div className=' md:mt-12 md:ml-2 mt-5 ml-4'>
                <FormControl sx={{ width: 300}}  disabled={isDisabled} required>
                  <InputLabel> Province </InputLabel>
                  <Select
                    name='province'
                    value={user.province}
                    label="Option"
                    onChange={changeHandler}
                  >
                    <MenuItem value="">...</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value='2'>2</MenuItem>
                    <MenuItem value='3'>3</MenuItem>
                    <MenuItem value='4'>4</MenuItem>
                    <MenuItem value='5'>5</MenuItem>
                    <MenuItem value='6'>6</MenuItem>
                    <MenuItem value='7'>7</MenuItem>
                  </Select>
                  <FormHelperText
                    sx={{ fontSize: 15, fontWeight: 'bold', color: 'red', fontStyle: 'italic' }}>*Only for people residing in Nepal</FormHelperText>
                </FormControl>
              </div>
              <div className='md:mt-11 md:ml-7 mt-5 ml-4'>
                <FormControl sx={{ width: 300}} required>
                  <InputLabel> Country </InputLabel>
                  {loading ? (
                    <CircularProgress />) : (
                    <Select
                      sx={{ overflow: scroll }}
                      name='country'
                      value={user.country}
                      label="Country"
                      onChange={handleChange}
                    >
                      {countries.map((country) => (
                        <MenuItem key={country.cca3} value={country.name.common}>
                          {country.name.common}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  <FormHelperText>Select your country</FormHelperText>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="md:ml-28 md:mt-10 sm:mt-5 sm:ml-24">
            <p className=" text-2xl font-semibold mb-4">Your Image</p>
            <Input
              type="file"
              inputProps={{ accept: 'image/*' }}
              onChange={handleImage}
              sx={{ width: 250, border: "none" }}
            />
            {imageUrl && <img src={imageUrl} alt='img' style={{ maxWidth: '0%', height: 'auto' }} />}
          </div>
          <div className=' flex md:ml-28 md:mt-10 mt-14 mb-16 ml-24'>
          <Button      
            sx={{ width: 150, p:1.5}}
            variant="outlined"
            onClick={handleSubmit}
          >
            Save
          </Button>
          <Button      
            sx={{ width: 150, p:1.5, ml:3}}
            variant="outlined"
            onClick={handleSubmit}
          >
            Back
          </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUser