import React, { useState } from 'react'
import { Drawer,List, ListItemButton, ListItemIcon, ListItemText,IconButton,Toolbar,Divider, Typography } from '@mui/material'
import { AiOutlineMenu,AiOutlineFileSearch } from "react-icons/ai";
import { FaHotjar ,FaCashRegister } from "react-icons/fa";
import { GiArchiveResearch } from "react-icons/gi";
import { BiLogIn } from "react-icons/bi";
import { BsPersonVcard } from "react-icons/bs";


import { useNavigate} from "react-router-dom"
import './DrawerComponent.css'


function DrawerComponent({handleClose , handleOpen, isLoggedIn, setIsLoggedIn,check}) {
    const [openDrawer,setOpenDrawer] = useState(false)



    

                const PAGES = check === '1' ? 
                [
                    { title:"Admin Home" ,   path: "adminhome" ,icon: FaHotjar },
                    { title:"Create Product", path: "/Createproduct" ,icon: FaHotjar },
            
                ] 
                : 
                [
                    { title:"Hot job" ,path: "hotjob",icon: FaHotjar },
                    { title:"Search job", path: "searchjob" ,icon: AiOutlineFileSearch },
                    { title:"Internship", path: "internship" ,icon: BsPersonVcard },
                    { title:"Open role", path: "openrole" ,icon: GiArchiveResearch  },
                ]
    const navigate = useNavigate()


    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("check");
        setIsLoggedIn(false)
        navigate("/");
      };
    

  return (
    <>
    <Drawer open={openDrawer} onClose={()=>setOpenDrawer(false)}>

        <Typography sx={{
            textAlign:"center", 
            marginTop:"1rem" , 
            marginBottom:"1rem",
            '&:hover': {
                cursor:"pointer"
            } 
            }}
            onClick={()=>{ navigate('/product') , setOpenDrawer(false)}}
            >
                Home
        </Typography>
        <Divider />
        <List>
                    {
                        PAGES.map((e,index)=>
                            (
                            <ListItemButton onClick={()=>setOpenDrawer(false)} key={index}>
                                <ListItemIcon>
                                   {<e.icon />}
                                </ListItemIcon>
                                <ListItemIcon>
                                    <ListItemText   onClick={()=> navigate(`${e.path}`)}>{e.title} </ListItemText>
                                </ListItemIcon>
                            </ListItemButton>
                        ))
                    }
                    
                    <ListItemButton onClick={()=>setOpenDrawer(false)}>
                        <ListItemIcon>
                            <FaCashRegister/>
                        </ListItemIcon>
                        <ListItemIcon>
                            <ListItemText onClick={()=> navigate('/register')} >Register </ListItemText>
                        </ListItemIcon>
                    </ListItemButton>
                    <ListItemButton onClick={()=>setOpenDrawer(false)}>
                        <ListItemIcon>
                            <BiLogIn/>
                        </ListItemIcon>
                        <ListItemIcon>
                            {isLoggedIn ? 
                            <ListItemText onClick={logout} >Logout </ListItemText>
                            :
                            <ListItemText onClick={handleOpen} >Login </ListItemText>
                        }
                        </ListItemIcon>
                    </ListItemButton>
        <Divider />
        </List>
    </Drawer>
    <IconButton sx={{color:"white", marginLeft:"auto"}} onClick={()=> setOpenDrawer(!openDrawer)}>
        <AiOutlineMenu />
    </IconButton>
    </>
  )
}

export default DrawerComponent