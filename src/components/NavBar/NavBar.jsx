import { AppBar, Toolbar, Typography,Tabs,Tab,Button,useMediaQuery,useTheme, Box,TextField,FormControl,InputLabel,InputAdornment,IconButton, } from "@mui/material"
import { useState } from "react"
import DrawerComponent from "../Drawer/DrawerComponent"
import { useNavigate} from "react-router-dom"
import LoginForm from '../../components/LonigForm'

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



function NavBar() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [value,setValue] = useState(0)

  const PAGES = [
                  { title:"Hot job" ,path: "hotjob" },
                  { title:"Search job", path: "searchjob" },
                  { title:"Internship", path: "internship" },
                  { title:"Open role", path: "openrole" },

                ]

  const navigate = useNavigate()

  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down('md'))


  return (
    <>
    <AppBar>
      <Toolbar >
        { isMatch ? (
            <>
            <Typography sx={{fontSize:"1.5rem" , paddingLeft:"10%"}}>MyApp</Typography>
            <DrawerComponent handleOpen={handleOpen}   handleClose={handleClose}  />
            </>
        ): (
          <>
          <Typography>MyApp</Typography>
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
        <Button 
          variant="contained" 
          sx={{marginLeft:"auto"}}
          // onClick={handleLoginModalOpen} 
          onClick={handleOpen}
          >
            Login
          </Button>
        <Button 
          variant="contained" 
          sx={{marginLeft:"10px"}}
          onClick={()=> navigate('/register')}
        >
          Register
        </Button>
        
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
          <LoginForm   />
        </Box>
      </Modal>
    </>

  )
}

export default NavBar