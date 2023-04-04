import React from 'react'
import { getProduct, updateProduct } from '../../service/api'; // นำเข้าฟังก์ชันจาก api.js
import { Button, FormControl, FormGroup,TextField, Typography } from '@mui/material'
import { useState,useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'

const initialValues = {
  product_name: "" ,
  product_detail: "",
  product_image: "",
  product_price: "",
  product_stock: ""
}
  
function EditProduct() {

  const [product,setProduct] = useState(initialValues)
  const [productImage, setProductImage] = useState(null);
  const {id} = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem("token");


  useEffect(() => {
    const fetchData = async () => {
      const data = await getProduct(id, token);
      setProduct(data);
    };
    fetchData();
  }, [id, token]);

  const onValueChange = (e) => {
    // console.log(e.name, e.value);
    setProduct({ ...product, [e.name]: e.value });
  };

  const onFileChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('test'+id);

    // ตรวจสอบให้ใส่รูปภาพ ห้ามไม่ใส่

    // if (!productImage) {
    //   alert('Please upload an image file.');
    //   return;
    // }

    // const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    // if (!validImageTypes.includes(productImage.type)) {
    //   alert('Please upload a valid image file (JPEG, PNG, or GIF).');
    //   return;
    // }

    const formData = new FormData();
    formData.append('product_name', product.product_name);
    formData.append('product_detail', product.product_detail);
    formData.append('product_price', product.product_price);
    formData.append('product_stock', product.product_stock);
    formData.append('product_image', productImage);

    try {
      await updateProduct(id, formData, token);
      setProduct(initialValues);
      // navigate('/adminhome');
    } catch (error) {
      console.error(error);
    }
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
          label="Picture"
          type="file"
          accept="image/*"
          maxRows={4}
          sx={{width:"400px",marginTop:"10px"}}
          onChange={onFileChange}

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
      <Button variant='contained' sx={{marginTop:"10px"}} onClick={onSubmit}>Edit</Button>
    </FormGroup>
    </div>
  )
}

export default EditProduct