import React, { SetStateAction } from 'react'
import { FormControl, TextField, InputLabel, Select, MenuItem, FormHelperText, CircularProgress, Button, Input, SelectChangeEvent } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { ICountry, IUsers } from "../types/global.typing";
import Swal from "sweetalert2";

interface UserForm {
  onSubmit: (user: IUsers) => void;
  users: IUsers[];
  setUsers: React.Dispatch<SetStateAction<IUsers[]>>;
}

const AddUser: React.FC<UserForm> = ({ onSubmit, users, setUsers }) => {
  const [user, setUser] = useState<IUsers>({
    imageUrl: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    birthDate: '',
    city: '',
    district: '',
    province: '',
    country: 'Nepal',
  });
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('Nepal');
  const [loading, setLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const redirect = useNavigate()


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get<ICountry[]>('https://restcountries.com/v3.1/all')
        const sortedCountries = response.data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common));
        setCountries(sortedCountries);
        setLoading(false)
      } catch (error) {
        console.log('Error fetching countries: ', error)
        setLoading(false)
      }
    }
    fetchCountries();

    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, [setUsers])

  const handleChange = (event: SelectChangeEvent<string>) => {
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
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    if(user){
      setUser({
        ...user,
        [event.target.name]: event.target.value
      })
    }
  };

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
        setUser({ ...user, imageUrl: reader.result as string })
      };
      reader.readAsDataURL(file);
    }
  }

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (user.firstName === '' || user.lastName === '' || user.email === '' || user.phoneNo === '') {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to enter required values.",
      });
      return;
    }
    const emailExists = users.some(u => u.email === user.email)
    if (emailExists) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The email already exists",
      });
      return;
    }
    const newUsers = [...users, user];
    setUsers(newUsers);
    localStorage.setItem('users', JSON.stringify(newUsers))
    onSubmit(user);
    setUser({
      imageUrl: '', firstName: '', lastName: '', email: '', phoneNo: '', birthDate: '', city: '', district: '', province: '', country: selectedCountry,
    })
    redirect('/');
    Swal.fire({
      position: "center",
      icon: "success",
      title: "User Created successfully",
      showConfirmButton: false,
      timer: 3000
    });
  }
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
                    onChange={handleSelectChange}
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
          <div className='md:ml-28 md:mt-10 mt-14 mb-16 ml-48'>
          <Button      
            sx={{ width: 150, p:1.5}}
            variant="outlined"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUser