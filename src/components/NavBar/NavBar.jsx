import { AppBar, Toolbar, Typography,Tabs,Tab,Button,useMediaQuery,useTheme, Box } from "@mui/material"
import { useState, useEffect} from "react"
import DrawerComponent from "../Drawer/DrawerComponent"
import { useNavigate} from "react-router-dom"
import LoginForm from '../../components/LonigForm'
import { BsPersonFillGear } from "react-icons/bs";
import './NavBar.css'

import * as React from 'react';

import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function NavBar({setIsLoggedIn , isLoggedIn}) {

  const [open, setOpen] = React.useState(false);
  const [check,setcheck] = useState('1')


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(() => {
    const token = localStorage.getItem("token");
    token ? setIsLoggedIn(true) : setIsLoggedIn(false)
    const statusCheck = localStorage.getItem("check");
    setcheck(statusCheck)

  },[isLoggedIn])


  const [value,setValue] = useState(0)

  const PAGES = check === '1' ? 
    [
        { title:"Admin Home" ,   path: "adminhome" },
        { title:"Create Product", path: "/createproduct" },

    ] 
    : 
    [
        { title:"Hot job" ,path: "hotjob" },
        { title:"Search job", path: "searchjob" },
        { title:"Internship", path: "internship" },
        { title:"Open role", path: "openrole" },
    ]



  // const  PAGES = [
  //                     { title:"Hot job" ,path: "hotjob" },
  //                     { title:"Search job", path: "searchjob" },
  //                     { title:"Internship", path: "internship" },
  //                     { title:"Open role", path: "openrole" },
    
  //                   ]


  const navigate = useNavigate()

  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down('md'))

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false)
    navigate("/");
  };


  return (
    <>
    <AppBar>
      
      <Toolbar >
        { isMatch ? (
            <>
              <Typography className="tohome" onClick={()=> navigate('/')} sx={{fontSize:"1.5rem" , paddingLeft:"10%"}}>MyApp1  </Typography>
              <DrawerComponent 
                  handleOpen={handleOpen}   
                  handleClose={handleClose} 
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  check={check}
              />
            </>
        ): (
          <>
          <Typography onClick={()=>navigate('/')}>MyApp2 </Typography>
          
          <Tabs 
          textColor="inherit" 
          value={value} 
          onChange={(e,value) => setValue(value) } 
          indicatorColor="secondary"
          sx={{marginLeft:"auto"}}
          >
            {
              PAGES.map((e,index) =>(
                <Tab key={index} label={e.title} onClick={()=> navigate(`${e.path}`)}  />
              ))
            }
        </Tabs>
        {isLoggedIn ? 
      
        <Button  
          sx={{
            backgroundColor: "rgb(42, 145, 241)", 
            color: "#fff", 
            '&:hover': {
              backgroundColor: "rgb(224, 229, 229)",
              color:'black' 
            },
            marginLeft:"auto",
            borderRadius: "50%",
            height: "48px",
            width: "48px",
            minWidth: 0,
            padding: 0,
            boxShadow: "none",
          }}
          variant="contained"
          shape="circle" 
          // onClick={handleLoginModalOpen} 
          onClick={()=> { setIsLoggedIn(true); navigate("/profile")}}
          >
            <BsPersonFillGear />
          </Button>
        :

        <Button 
          sx={{
            backgroundColor: "rgb(42, 145, 241)", 
            color: "#fff", 
            '&:hover': {
              backgroundColor: "rgb(224, 229, 229)",
              color:'black' 
            },
            marginLeft:"auto",
            
          }}
          variant="contained" 
          // onClick={handleLoginModalOpen} 
          onClick={handleOpen}
          >
            Login
          </Button>
      }
      { isLoggedIn ? 
        <></>
          :
        <Button 
          sx={{
            backgroundColor: "rgb(42, 145, 241)", 
            color: "#fff", 
            '&:hover': {
              backgroundColor: "rgb(224, 229, 229)",
              color:'black' 
            },
            marginLeft:"10px"
          }}
          variant="contained" 
          onClick={()=> navigate('/register')}
        >
          Register
        </Button>
      }
        
        </>
        )}
      </Toolbar>
            
    </AppBar>

    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <LoginForm setIsLoggedIn={setIsLoggedIn}  handleClose={handleClose}  />
        </Box>
      </Modal>
    </>

  )
}

export default NavBar