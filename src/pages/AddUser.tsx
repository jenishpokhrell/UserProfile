import React from 'react'
import { FormControl, TextField, InputLabel, Select, MenuItem, FormHelperText, Menu, CircularProgress, Button, Input } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { IUsers } from "../types/global.typing";
import Swal from "sweetalert2";

interface UserForm {
  onSubmit: (user: IUsers) => void;
}

const AddUser:React.FC<UserForm> = ({onSubmit}) => {
  const [user, setUser] = useState<IUsers>({
    imageUrl: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    birthDate: '',
    city: '',
    district: '',
    province: '1',
    country: 'Nepal',
  });

  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('Nepal');
  const [loading, setLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false)
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const redirect = useNavigate()


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
  }, [])

  const handleChange = (event) => {
    const selected = event.target.value;
    setSelectedCountry(selected);
    setIsDisabled(selected !== 'Nepal');
  }

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file)
      const imageUrl = (URL.createObjectURL(file))
      setImageUrl(imageUrl);
      setUser({...user, imageUrl})
    }
  }

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }
  const handleSubmit = (event: React.FormEvent) => {
    if (user.firstName === '' || user.lastName === '' || user.email === '' || user.phoneNo === '') {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to enter required values.",
      });
      return;
    }
    event.preventDefault();
    onSubmit(user);
    setUser({
      imageUrl: '', firstName: '', lastName: '', email: '', phoneNo: '', birthDate: '', city: '', district: '', province: '1', country: '',
    })
    redirect('/');
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "User Created successfully",
      showConfirmButton: false,
      timer: 3000
    });
  }
  return (
    <div>
      <div className='text-center text-3xl font-bold m-10'>
        <h1>Add User</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className=" ml-40">
            <TextField
              margin="normal"
              sx={{ m: 2 }}
              id="outlined-basic"
              label="First Name"
              name="firstName"
              variant="outlined"
              value={user?.firstName}
              onChange={changeHandler} required />
            <TextField
              margin="normal"
              sx={{ m: 2 }}
              id="outlined-basic"
              label="Last Name"
              name="lastName"
              variant="outlined"
              value={user?.lastName}
              onChange={changeHandler} required />
            <TextField
              margin="normal"
              sx={{ m: 2 }}
              id="outlined-basic"
              label="Email"
              name="email"
              variant="outlined"
              value={user?.email}
              onChange={changeHandler} required />
            <TextField
              margin="normal"
              sx={{ m: 2 }}
              id="outlined-basic"
              label="Phone no."
              name="phoneNo"
              variant="outlined"
              value={user?.phoneNo}
              onChange={changeHandler} required />
            <TextField
              margin="normal"
              sx={{ m: 2 }}
              id="outlined-basic"
              label="DOB"
              name="birthDate"
              variant="outlined"
              value={user?.birthDate}
              onChange={changeHandler} required />
          </div>
          <div className=" flex ml-40">
            <div>
              <p className=" ml-4 text-2xl font-semibold ">Address</p>
              <TextField
                margin="normal"
                sx={{ m: 2 }}
                id="outlined-basic"
                label="City"
                name="city"
                variant="outlined"
                value={user?.city}
                onChange={changeHandler} required />
              <TextField
                margin="normal"
                sx={{ m: 2 }}
                id="outlined-basic"
                label="District/State"
                name="district"
                variant="outlined"
                value={user?.district}
                onChange={changeHandler} required />
            </div>
            <div className=" flex justify-center items-center">
              <FormControl sx={{ mt: 6, ml: 2, width: 330 }} disabled={isDisabled} required>
                <InputLabel> Province </InputLabel>
                <Select
                  name='province'
                  value={user.province}
                  label="Option"
                  onChange={changeHandler}
                >
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value='2'>2</MenuItem>
                  <MenuItem value='3'>3</MenuItem>
                  <MenuItem value='4'>4</MenuItem>
                  <MenuItem value='5'>5</MenuItem>
                  <MenuItem value='6'>6</MenuItem>
                  <MenuItem value='7'>7</MenuItem>
                </Select>
                <FormHelperText
                  sx={{ fontSize: 15, fontWeight: 'bold' }}>*Only for people residing in Nepal</FormHelperText>
              </FormControl>
              <FormControl sx={{ mt: 6, ml: 5, width: 330 }} required>
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
          <div className="ml-44 mt-10">
            <p className=" text-2xl font-semibold mb-4">Your Image</p>
            <Input
              type="file"
              inputProps={{ accept: 'image/png' }}
              onChange={handleImage}
              sx={{ width: 250, border: "none" }}
            />
            {imageUrl && <img src={imageUrl} alt='img'  style={{ maxWidth: '0%', height: 'auto'}} />}
          </div>
          <Button
            sx={{ width: 150, p: 1.5, ml:22, mt:7 }}
            variant="outlined"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}

export default AddUser