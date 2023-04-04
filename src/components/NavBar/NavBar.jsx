import { AppBar, Toolbar, Typography,Tabs,Tab,Button,useMediaQuery,useTheme, Box } from "@mui/material"
import { useState, useEffect} from "react"
import DrawerComponent from "../Drawer/DrawerComponent"
import { useNavigate} from "react-router-dom"
import LoginForm from '../../components/LonigForm'
import { BsPersonFillGear } from "react-icons/bs";
import './NavBar.css'

import * as React from 'react';

import Modal from '@mui/material/Modal';


import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';






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

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );




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
        { title:"ข้อมูลสินค้า" ,   path: "adminhome" },
        { title:"นำเข้าสินค้า", path: "/addstock" },

    ] 
    : 
    [
        { title:"Product" ,path: "product" },
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

          <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button style={{color:"white"}} onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
          
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