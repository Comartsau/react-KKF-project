import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Typography ,Box, Card, CardContent, TextField, Button } from "@mui/material";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



function ProfileComponent({setIsLoggedIn , isLoggedIn}) {

  
  const navigate = useNavigate()
    const MySwal = withReactContent(Swal)
    const [inputs, setInputs] = useState({});

    // ตรวจสอบ password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, and one number
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

    useEffect(()=>{

      const token = localStorage.getItem("token");
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Token " +token);
      myHeaders.append("Content-Type", 'application/json');

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
        console.log(token)

        fetch("http://192.168.1.96:8000/profile", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "ok") {
            console.log(result)
          } else if (result.status === "forbidden") {
            MySwal.fire({
              html: <i>{result.message}</i>,
              icon: 'error'
            }).then((value) => {
              navigate('/product')
              
            })
          }
          console.log(result);
          setInputs(result)
      })
      .catch((error) => console.log("error", error));


    },[])

    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("check");
      navigate("/");
      setIsLoggedIn(false)
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);

        // if (!inputs.email || !inputs.password || !inputs.confpwd || !inputs.first_name || !inputs.last_name || !inputs.tel) {
        if (!inputs.email || !inputs.password || !inputs.first_name || !inputs.last_name || !inputs.tel) {
          MySwal.fire({
            // html: <i>Please fill in all fields</i>,
            html: <i>กรุณากรอกข้อมูลให้ครบ</i>,
            icon: 'warning'
          });
          return;
        }
        // ตวจสอบ password must be at least 8 characters
        if (!isPasswordValid(inputs.password)) {
          MySwal.fire({
            // html: <i>Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, and one number.</i>,
            html: <i>รหัสผ่านต้องมีความยาวอย่างน้อย 8 อักษร มีอักษรตัวพิมพ์เล็กอย่างน้อยหนึ่งตัว ตัวพิมพ์ใหญ่หนึ่งตัว และตัวเลขหนึ่งตัว</i>,
            icon: 'warning'
          })
          return;
        }
        // ตรวจสอบ password ต้องเหมือนกัน
        if (inputs.password !== inputs.confpwd) {
          MySwal.fire({
            // html: <i>Password and Confirm Password must be the same.</i>,
            html: <i>รหัสผ่านและยืนยันรหัสผ่านต้องเหมือนกัน</i>,
            icon: 'warning'
          });
          return;
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "email": inputs.email,
          "password": inputs.password,
          "first_name": inputs.first_name,
          "last_name": inputs.last_name,
          "tel": inputs.tel
        })

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
          
        fetch("http://192.168.1.96:8000/test", requestOptions)
          .then(response => response.json())
          .then(result => {
            if (result.status === 'ok') {
                MySwal.fire({
                    html: <i>{result.message}</i>,
                    icon: 'success'
                }).then((value) => {
                    navigate('/product')
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
    <Box sx={{marginTop:"2rem"}}>
    <Grid container justifyContent="center" spacing={1} style={{margin:"auto"}} >
      <Grid item xs={12} ms={6} md={6} >
      <Card sx={{marginTop:"3rem"  }}>
      <CardContent >
      <Typography  
        variant="h5" 
        marginBottom="1rem"
        // marginTop="2rem"
        // align="center"
        // textAlign="center"  
        >
          คุณ : {inputs.first_name}
        </Typography>
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
          name="password"
          type="password"
          value={inputs.password || ""} 
          onChange={handleChange}
          // fullWidth
          style={{ width: '50%' }}
          margin="dense"
          
          />
         <TextField 
          label="Confirm Password :"
          variant="outlined"
          name="confpwd"
          type="password"
          value={inputs.confpwd || ""} 
          onChange={handleChange}
          // fullWidth
          style={{ width: '50%' }}
          margin="dense"
          /> 
          <TextField 
          label="First Name :"
          variant="outlined"
          name="first_name"
          type="text"
          value={inputs.first_name || ""} 
          onChange={handleChange}
          style={{ width: '50%' }}
          // fullWidth
          margin="dense"
        />
        <TextField 
          label="Last Name :"
          variant="outlined"
          name="last_name"
          type="text"
          value={inputs.last_name || ""} 
          onChange={handleChange}
          style={{ width: '50%' }}
          // fullWidth
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
        <Button variant="contained" color="primary" fullWidth onClick={()=>logout()} sx={{ marginTop: "10px" }}>LogOut</Button>
    </form>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
</Box>
  )
}

export default ProfileComponent