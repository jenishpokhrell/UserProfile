import { FormControl, TextField, InputLabel, Select, MenuItem, FormHelperText, Menu, CircularProgress } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react"

const Form = () => {

    const [option, setOption] = useState();
    const [countries, setCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState('Nepal');
    const [loading, setLoading] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false)

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

    return (
        <div>
            <div className=" ml-40">
                <TextField margin="normal" sx={{ m: 2 }} id="outlined-basic" label="First Name" variant="outlined" />
                <TextField margin="normal" sx={{ m: 2 }} id="outlined-basic" label="Second Name" variant="outlined" />
                <TextField margin="normal" sx={{ m: 2 }} id="outlined-basic" label="Email" variant="outlined" />
                <TextField margin="normal" sx={{ m: 2 }} id="outlined-basic" label="Phone no." variant="outlined" />
                <TextField margin="normal" sx={{ m: 2 }} id="outlined-basic" label="DOB" variant="outlined" />
            </div>
            <div className=" flex ml-40">
                <div>
                    <p className=" ml-4 text-2xl font-semibold ">Address</p>
                    <TextField margin="normal" sx={{ m: 2 }} id="outlined-basic" label="City" variant="outlined" />
                    <TextField margin="normal" sx={{ m: 2 }} id="outlined-basic" label="District" variant="outlined" />
                </div>
                <div className=" flex justify-center items-center">
                    <FormControl sx={{ mt: 6, ml: 2, width: 330 }} disabled={isDisabled}>
                        <InputLabel> Province </InputLabel>
                        <Select
                            value={option}
                            label="Option"
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                        </Select>
                        <FormHelperText sx={{ fontSize: 15, fontWeight: 'bold' }}>*Only for people residing in Nepal</FormHelperText>
                    </FormControl>
                    <FormControl sx={{ mt: 6, ml: 5, width: 330 }}>
                        <InputLabel> Country </InputLabel>
                        {loading ? (
                            <CircularProgress />) : (
                            <Select
                                sx={{ overflow: scroll }}
                                value={selectedCountry}
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
    );
};

export default Form