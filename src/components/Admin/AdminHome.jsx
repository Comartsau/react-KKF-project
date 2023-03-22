import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Container,
  Modal,
  Box,
} from '@mui/material';
import { useEffect, useState} from 'react';
import { getProducts,deleteProduct } from '../../service/api';
// import { Link } from 'react-router-dom';
import CreateProduct from './CreateProduct';
import EditProducts from './EditProducts';
import { useNavigate } from 'react-router-dom'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function AdminHome() {
    const [product,setProduct] = useState([])
    const navigate = useNavigate()
    
    // สร้างสถานะสำหรับเปิด/ปิด Modal ของ EditProduct
    const [editProductId, setEditProductId] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openModal1, setOpenModal1] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);


    const handleOpenEditModal = (id) => {
      setEditProductId(id);
      setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setEditProductId(null);
        setOpenEditModal(false);
    };


    const handleOpenModal1 = () => {
      setOpenModal1(true);
    };
  
    const handleCloseModal1 = () => {
      setOpenModal1(false);
            
    };

    const handleOpenModal2 = (id) => {
      console.log("modal2" , id)
      setEditProductId(id);
      setOpenModal2(true);
    };

    const handleCloseModal2 = () => {
        setEditProductId(null);
        setOpenModal2(false);
    };

    useEffect(() => {
      if (editProductId !== null) {
          setOpenModal2(true);
      }
  }, [editProductId]);


      useEffect(() => {
        const fetchData = async () => {
          const data = await getProducts();
          setProduct(data);
        };
        fetchData();
      }, []);


      const deleteProductData = async (id) => {
        const token = localStorage.getItem("token");
        await deleteProduct(id, token);
        navigate('/adminhome');
        window.location.reload();
      };

       const formatNumber=(num)=> {
        if (num !== undefined) {
         return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
     }
     return
    }

  return (
    <div className='flex justify-center ' style={{marginTop:"80px"}}>
        <Container maxWidth="lg" >
        <Button onClick={handleOpenModal1}>Create Product</Button>

        <Modal
        open={openModal1}
        onClose={handleCloseModal1} 
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <CreateProduct  handleCloseModal1={handleCloseModal1} />
        </Box>
      </Modal>

     
    <Table >
      <TableHead >
        <TableRow style={{background:"#3F51B5" }}>
          <TableCell align="center" style={{color:"#fff", fontSize:"16px", borderRightWidth: 1 }}>Id</TableCell>
          <TableCell align="center" style={{color:"#fff", fontSize:"16px", borderRightWidth: 1 }}>Image</TableCell>
          <TableCell align="center" style={{color:"#fff", fontSize:"16px", borderRightWidth: 1 }}>Name</TableCell>
          <TableCell align="center" style={{color:"#fff", fontSize:"16px", borderRightWidth: 1 }}>Detail</TableCell>
          <TableCell align="center" style={{color:"#fff", fontSize:"16px", borderRightWidth: 1 }}>Price</TableCell>
          <TableCell align="center" style={{color:"#fff", fontSize:"16px", borderRightWidth: 1 }}>Stock</TableCell>
          <TableCell align="center" style={{color:"#fff", fontSize:"16px", borderRightWidth: 1 }}>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
          {
            product.map((product,index)=> {
                // console.log(product)
              return (
                <TableRow key={index}>
                  <TableCell align="center" style={{borderRightWidth: 1 }}>{index+1}</TableCell>
                  <TableCell align="center" style={{borderRightWidth: 1 }}>
                      <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <img src={product.product_image} style={{ maxWidth: "50px", maxHeight: "auto" }} />
                      </div>
                  </TableCell>
                  <TableCell align="center" style={{borderRightWidth: 1 }}>{product.product_name}</TableCell>
                  <TableCell 
                  align="center" 
                  sx={{padding:"5px",borderRightWidth: 1 }}
                  >{product.product_detail}</TableCell>
                  <TableCell align="center" style={{borderRightWidth: 1 }}>{formatNumber(product.product_price)}</TableCell>
                  <TableCell align="center" style={{borderRightWidth: 1 }}>{formatNumber(product.product_stock)}</TableCell>
                  <TableCell align="center" style={{borderRightWidth: 1 }}>
                    {/* <Button variant='contained'  sx={{margin:"10px"}} component = {Link} to={`/productedit/${product.id}`} >Edit</Button> */}
                    <Button 
                      variant='contained'  
                      sx={{margin:"10px"}} 
                      onClick={() => {
                        handleOpenModal2(product.id);}}
                      >
                        Edit
                      </Button>
                      <Modal
                          open={openModal2}
                          onClose={handleCloseModal2} 
                          aria-labelledby="edit-modal-title"
                          aria-describedby="edit-modal-description"
                        >
                          <Box sx={style}>
                            <EditProducts id={editProductId} handleCloseModal={handleCloseModal2} />
                          </Box>
                      </Modal>


                    <Button 
                    variant='contained'
                    sx={{margin:"10px" , 
                    background:"#d32f2f" , 
                    "&:active":{ background:"#b71c1c"} ,
                    "&:hover":{background:"#b71c1c"}
                     }} onClick={()=>deleteProductData(product.id)} >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })
          }
      </TableBody>
    </Table>
    </Container>
    </div>
  )
}

export default AdminHome