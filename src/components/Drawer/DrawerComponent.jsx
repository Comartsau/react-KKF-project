import React, { useState } from 'react'
import { Drawer,List, ListItemButton, ListItemIcon, ListItemText,IconButton } from '@mui/material'
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate} from "react-router-dom"

function DrawerComponent({handleClose , handleOpen}) {
    const [openDrawer,setOpenDrawer] = useState(false)
    const PAGES = [
                    { title:"Hot job" ,path: "hotjob" },
                    { title:"Search job", path: "searchjob" },
                    { title:"Internship", path: "internship" },
                    { title:"Open role", path: "openrole" },
                    { title:"Logout", path: "logout"}
                ]
    const navigate = useNavigate()

  return (
    <>
    <Drawer open={openDrawer} onClose={()=>setOpenDrawer(false)}>
        <List>
                    {
                        PAGES.map((e,index)=>
                            (
                            <ListItemButton onClick={()=>setOpenDrawer(false)} key={index}>
                                <ListItemIcon>
                                    <ListItemText  onClick={()=> navigate(`${e.path}`)}>{e.title} </ListItemText>
                                </ListItemIcon>
                            </ListItemButton>
                        ))
                    }
                    
                    <ListItemButton onClick={()=>setOpenDrawer(false)}>
                        <ListItemIcon>
                            <ListItemText onClick={handleOpen} >Login </ListItemText>
                        </ListItemIcon>
                    </ListItemButton>
        </List>
    </Drawer>
    <IconButton sx={{color:"white", marginLeft:"auto"}} onClick={()=> setOpenDrawer(!openDrawer)}>
        <AiOutlineMenu />
    </IconButton>
    </>
  )
}

export default DrawerComponent