import React from 'react'
import { getProduct, updateProduct } from '../../service/api' // นำเข้าฟังก์ชันจาก api.js
import { Button, FormControl, FormGroup,TextField, Typography } from '@mui/material'
import { useState,useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
// import { useHistory } from 'react-router-dom';

const initialValues = {
  product_name: "" ,
  product_detail: "",
  product_image: "",
  product_price: "",
  product_stock: ""
}
  
function EditProduct({id ,handleCloseModal }) {

  const [product,setProduct] = useState(initialValues)
  const [productImage, setProductImage] = useState(null);
  // const {id} = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      const response = await getProduct(id, token);
      setProduct(response);
    };
    fetchData();
  }, [id, token]);

  // const history = useHistory();

  const onValueChange = (e) => {
    console.log(e.name, e.value);
    setProduct({ ...product, [e.name]: e.value });
  };

  const onFileChange = (e) => {
    setProductImage(e.target.files[0])
  }


  const editProduct = async () => {
    try {
      await updateProduct(id, product, productImage, token);
      setProduct(initialValues);
      setProductImage(null);
      handleCloseModal();
      navigate('/adminhome');
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    handleCloseModal();
    navigate('/adminhome'); 
    window.location.reload();
  };

  return (
    <div style={{ display:"flex" , justifyContent:"center" , marginTop:"80px"}} >
    <FormGroup > 
      <Typography variant='h5'>Edit Product </Typography>
      <FormControl >
      <TextField
          id="outlined-multiline-flexible"
          label="Name"
          multiline
          maxRows={4}
          sx={{width:"400px",marginTop:"10px"}}
          onChange={(e)=> onValueChange(e.target) } 
          name="product_name" 
          value={product.product_name}
      
        />
      </FormControl>
      <FormControl >
      <TextField
          id="outlined-multiline-flexible"
          label="Detail"
          multiline
          maxRows={4}
          sx={{width:"400px",marginTop:"10px"}}
          onChange={(e)=> onValueChange(e.target) } 
          name="product_detail" 
          value={product.product_detail}
      
        />
      </FormControl>
      <FormControl >
      <TextField
          id="outlined-multiline-flexible"
          // label="Picture"
          type="file"
          accept="image/*"
          maxRows={4}
          sx={{width:"400px",marginTop:"10px"}}
          onChange={(e)=> onFileChange } 

        />
      </FormControl>
      <FormControl >
      <TextField
        //  id="outlined-number"
         type="number"
         InputProps={{
           inputProps: { min: 0 }
         }}
          label="Price"
          maxRows={4}
          sx={{width:"400px",marginTop:"10px"}}
          onChange={(e)=> onValueChange(e.target) } 
          name="product_price"
          value={product.product_price}
        />
      </FormControl>
      <FormControl >
      <TextField
          id="outlined-multiline-flexible"
          label="Stock"
          maxRows={4}
          sx={{width:"400px",marginTop:"10px"}}
          onChange={(e)=>  onValueChange(e.target) } 
          name="product_stock"
          value={product.product_stock}
        />
      </FormControl>
      <Button variant='contained' sx={{marginTop:"10px"}} onClick={() => editProduct()}>Edit</Button>
    </FormGroup>
    </div>
  )
}

export default EditProduct