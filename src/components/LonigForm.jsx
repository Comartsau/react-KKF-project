import { useState } from "react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate} from "react-router-dom"
import Grid from '@mui/material/Grid';
import { Typography ,Box, Card, CardContent, TextField, Button } from "@mui/material";


function LonigForm({}) {

    const navigate = useNavigate()

    const [inputs,setInputs] = useState({})
    const MySwal = withReactContent(Swal)
  
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
    let raw = JSON.stringify({
    // "username": inputs.username,
    "email": inputs.email,
    "password": inputs.password,
    "expiresIn": 600000
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  // fetch("https://www.melivecode.com/api/login", requestOptions)
  fetch("http://192.168.1.21:8000/login", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      if (result.status === "ok") {
        MySwal.fire({
          html: <i>{result.message}</i>,
          icon: 'success'
        }).then((value)=>{
          localStorage.setItem('token',result.accessToken)
          navigate("/profile")
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

      <Grid container justifyContent="center" spacing={1} style={{margin:"auto"}}  >
        <Grid item xs={12}>
          <Card  >
          <CardContent>
              <Typography  variant="h4" align="center"  >Login</Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Username"
                    variant="outlined"
                    name="email"
                    // name="username"
                    fullWidth
                    margin="dense"
                    // value={inputs.username || ""} 
                    value={inputs.email || ""} 
                    onChange={handleChange} 
                    />
                  <TextField
                    label="password"
                    variant="outlined"
                    name="password"
                    type="password"
                    fullWidth
                    margin="dense"
                    value={inputs.password || ""} 
                    onChange={handleChange} 
                    />
                    <Button variant="contained" color="primary" fullWidth type="submit" sx={{ marginTop: "20px" }}>Login</Button>
              </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>

  )
}

export default LonigForm