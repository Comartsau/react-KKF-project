import * as React from 'react';

import { Button, FormControl, FormGroup,TextField, Typography } from '@mui/material'
import { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { createProduct } from '../../service/api';


async function resizeImage(file, maxWidth, maxHeight) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        resolve(new File([blob], file.name, { type: file.type, lastModified: new Date() }));
      }, file.type);
    };
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
  });
}


const initialValues = {
    product_name: "" ,
    product_detail: "",
    product_image: "",
    product_price: "",
    product_stock: ""
  }

function CreateProduct({handleCloseModal1}) {
    
    const [product,setProduct] = useState(initialValues) 
    const [productImage, setProductImage] = useState(null);
    
    const navigate = useNavigate()


    const onValueChange = (e) => {
      setProduct({...product,[e.name]:e.value})
    }

    const addProductDetail = async () => {
      // ตรวจสอบว่า productImage เป็น null หรือไม่
      if (!productImage) {
        alert("Please upload an image file.");
        return;
      }
    
      // ตรวจสอบว่าไฟล์ที่อัปโหลดเป็นรูปภาพ
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validImageTypes.includes(productImage.type)) {
        alert("Please upload a valid image file (JPEG, PNG, or GIF).");
        return;
      }

      const resizedImage = await resizeImage(productImage, 400, 400); // ตัวอย่างขนาดภาพ 800x800


      // เรียกผ่าน api.js
      const response = await createProduct(product, resizedImage);
       console.log(response);


      // เรียกใช้งานโดยตรงไม่ผ่าน api.js
      
      // const formData = new FormData();
      // formData.append("product_name", product.product_name);
      // formData.append("product_detail", product.product_detail);
      // formData.append("product_price", product.product_price);
      // formData.append("product_stock", product.product_stock);
      // formData.append("product_image", productImage); 
  
    // const config = {
    //   method: "post",
    //   maxBodyLength: Infinity,
    //   url: "http://192.168.1.96:8000/product",
    //   headers: { "Content-Type": "multipart/form-data" },
    //   data: formData,
    // };

    //     await axios.request(config)
    //     .then((response) => {
    //       console.log(response.data);
    //       setProduct(response.data);
    //       setProductImage(null);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
      
    setProduct(initialValues); // เปลี่ยนให้เป็น initialValues แทน
    handleCloseModal1();
    navigate('/adminhome');
    window.location.reload();
}

  return (
    <div style={{ display:"flex" , justifyContent:"center" }}>
    <FormGroup>
      <Typography variant='h5'>Create Product </Typography>
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
          id="outlined-start-adornment"
          type="file"
          accept="image/*" 
          maxRows={4}
          sx={{width:"400px",marginTop:"10px"}}
          onChange={(e)=> setProductImage(e.target.files[0]) } 
        />
      </FormControl>
      <FormControl >
      <TextField
          id="outlined-multiline-flexible"
          label="Price"
          type="number"
          maxRows={4}
          sx={{width:"400px",marginTop:"10px"}}
          onChange={(e)=> onValueChange(e.target) } 
          name="product_price"
          value={product.product_price}
        />
      </FormControl>
      {/* <FormControl >
      <TextField
          id="outlined-multiline-flexible"
          type="number"
          label="Stock"
          maxRows={4}
          sx={{width:"400px",marginTop:"10px"}}
          onChange={(e)=>  onValueChange(e.target) } 
          name="product_stock"
          value={product.product_stock}
        />
      </FormControl> */}
      <Button variant='contained' sx={{marginTop:"10px"}} onClick={()=>addProductDetail()}>Add Product</Button>
    </FormGroup>
    </div>
  )
}
export default CreateProduct