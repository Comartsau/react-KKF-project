import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Typography ,Box, Card, CardContent, TextField, Button } from "@mui/material";


import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
function RegisterComponent() {

  const navigate = useNavigate()
    const MySwal = withReactContent(Swal)

    const [inputs, setInputs] = useState({});

    // ตรวจสอบ password must be at least 8 characters
    const minLength = 8;
    const isMinLength = (str) => str.length >= minLength;
    const hasLowerCase = (str) => /[a-z]/.test(str);
    const hasUpperCase = (str) => /[A-Z]/.test(str);
    const hasNumber = (str) => /\d/.test(str);
    const isPasswordValid = (password) => {
      if (!isMinLength(password)) {
        return false;
      }
      if (!hasLowerCase(password)) {
        return false;
      }
      if (!hasUpperCase(password)) {
        return false;
      }
      if (!hasNumber(password)) {
        return false;
      }
      return true;
    };


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);

        if (!inputs.email || !inputs.pwd || !inputs.confpwd || !inputs.fname || !inputs.lname || !inputs.tel) {
          MySwal.fire({
            html: <i>Please fill in all fields</i>,
            icon: 'warning'
          });
          return;
        }
        // ตวจสอบ password must be at least 8 characters
        if (!isPasswordValid(inputs.pwd)) {
          MySwal.fire({
            html: <i>Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, and one number.</i>,
            icon: 'warning'
          })
          return;
        }
        // ตรวจสอบ password ต้องเหมือนกัน
        if (inputs.pwd !== inputs.confpwd) {
          MySwal.fire({
            html: <i>Password and Confirm Password must be the same.</i>,
            icon: 'warning'
          });
          return;
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "email": inputs.email,
          "pwd": inputs.pwd,
          "confpwd": inputs.confpwd,
          "fname": inputs.fname,
          "lname": inputs.lname,
          "tel": inputs.tel
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("https://www.melivecode.com/api/users/create", requestOptions)
          .then(response => response.json())
          .then(result => {
            if (result.status === 'ok') {
                MySwal.fire({
                    html: <i>{result.message}</i>,
                    icon: 'success'
                }).then((value) => {
                    navigate('/')
                })
            } else {
                MySwal.fire({
                    html: <i>{result.message}</i>,
                    icon: 'error'
                })
            }
        })
          .catch(error => console.log('error', error));
      }





  return (
    <Box sx={{marginTop:"3rem"}}>
    <Grid container justifyContent="center" spacing={1} style={{margin:"auto"}} >
      <Grid item xs={12} ms={6} md={4} >
      <Card sx={{marginTop:"10px"  }} >
      <CardContent>
      <Typography  variant="h4" align="center"  >Register</Typography>
    <form onSubmit={handleSubmit}>
        <TextField 
          label="Email :"
          variant="outlined"
          name="email"
          type="email"
          value={inputs.email || ""} 
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
         <TextField 
          label="Password :"
          variant="outlined"
          name="pwd"
          type="password"
          value={inputs.pwd || ""} 
          onChange={handleChange}
          fullWidth
          margin="dense"
          />
         <TextField 
          label="Confirm Password :"
          variant="outlined"
          name="confpwd"
          type="password"
          value={inputs.confpwd || ""} 
          onChange={handleChange}
          fullWidth
          margin="dense"
          />
        <TextField 
          label="First Name :"
          variant="outlined"
          name="fname"
          type="text"
          value={inputs.fname || ""} 
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField 
          label="Last Name :"
          variant="outlined"
          name="lname"
          type="text"
          value={inputs.lname || ""} 
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
       
        <TextField 
          label="Telephone Number :"
          variant="outlined"
          name="tel"
          type="text"
          value={inputs.tel || ""} 
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <Button variant="contained" color="primary" fullWidth type="submit" sx={{ marginTop: "20px" }}>Login</Button>
    </form>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
</Box>
  )
}

export default RegisterComponent