import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { useEffect, useState} from 'react';
import { getProducts , deleteProduct } from '../service/api';
import { Link } from 'react-router-dom';
import axios from 'axios'

function ProductComponent() {
    const [product,setProduct] = useState([])

    console.log(product)

    let data = '';

    let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://192.168.1.96:8000/product',
    headers: { },
    data : data
    };

    useEffect(() => {
        // getProductDetails()

      axios.request(config)
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

       
      },[])

      const getProductDetails = async () => {
        let response = await getProducts()
        console.log(response)
        setProduct(response.data)
       }
     
       const deleteProductData = async (id) => {
         await deleteProduct(id)
         getProductDetails()
       }
     
     
       const formatNumber=(num)=> {
         return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
     }
    




  return (
    <div className='flex justify-center ' style={{marginTop:"80px"}}>

    <Table>
      <TableHead >
        <TableRow style={{background:"#3F51B5" }}>
          <TableCell align="center" style={{color:"#fff", fontSize:"16px", borderRightWidth: 1 }}>Id</TableCell>
          <TableCell align="center" style={{color:"#fff", fontSize:"16px", borderRightWidth: 1 }}>Image</TableCell>
          <TableCell align="center" style={{color:"#fff", fontSize:"16px", borderRightWidth: 1 }}>Name</TableCell>
          <TableCell align="center" style={{color:"#fff", fontSize:"16px", borderRightWidth: 1 }}>Detail</TableCell>
          <TableCell align="center" style={{color:"#fff", fontSize:"16px", borderRightWidth: 1 }}>Price</TableCell>
          <TableCell align="center" style={{color:"#fff", fontSize:"16px", borderRightWidth: 1 }}>Stock</TableCell>
          <TableCell align="center" style={{color:"#fff", fontSize:"16px", borderRightWidth: 1 }}>Add to Cart</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
          {
            product.map((product)=> {
                console.log(product)
              return (
                <TableRow>
                  <TableCell align="center" style={{borderRightWidth: 1 }}>{product.id}</TableCell>
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
                    <Button 
                        variant='contained' 
                        sx={{margin:"10px"}} 
                        // component = {Link} to={`/edit/${product.id}`} 
                    >
                      +
                    </Button>
                    <Button 
                        variant='contained'
                        sx={{margin:"10px" , 
                        background:"#d32f2f" , 
                        "&:active":{ background:"#b71c1c"} ,
                        "&:hover":{background:"#b71c1c"}
                     }} 
                    //  onClick={()=>deleteProductData(product.id)}
                      >
                      -
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })
          }
      </TableBody>
    </Table>

    </div>
  )
}

export default ProductComponent