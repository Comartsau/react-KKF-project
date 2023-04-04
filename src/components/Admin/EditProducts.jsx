import React from "react";
import { getProduct, updateProduct } from "../../service/api"; // นำเข้าฟังก์ชันจาก api.js
import {
  Button,
  FormControl,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

async function resizeImage(file, maxWidth, maxHeight) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
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
        resolve(
          new File([blob], file.name, {
            type: file.type,
            lastModified: new Date(),
          })
        );
      }, file.type);
    };
    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };
  });
}

const initialValues = {
  product_name: "",
  product_detail: "",
  product_image: "",
  product_price: "",
  product_stock: "",
};

function EditProduct({ id, handleCloseModal }) {
  const [product, setProduct] = useState(initialValues);
  const [productImage, setProductImage] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(true);

  const fetchData = async () => {
    const response = await getProduct(id, token);
    console.log(response)
    setProduct(response);
  };

  useEffect(() => {
    
    fetchData();
  }, [id, token]);

  const onValueChange = (e) => {
    console.log(e.name, e.value);
    setProduct({ ...product, [e.name]: e.value });
  };

  const editProduct = async () => {
    try {
      if (productImage) {
        const resizedImage = await resizeImage(productImage, 1000, 1000); // ตัวอย่างขนาดภาพ 800x800
        await updateProduct(id, product, resizedImage, token);
      } else{
        await updateProduct(id, product, productImage, token);
      }
      console.log(productImage);
      setProduct(initialValues);

      setProductImage(null);
      handleCloseModal();
      navigate("/adminhome");

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
  //   // setOpen(false);
  //   // handleCloseModal();
  //   // navigate("/adminhome");
  //   // window.location.reload();
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "80px" }}
    >
      <FormGroup>
        <Typography variant="h5">Edit Product </Typography>
        <FormControl>
          <TextField
            id="outlined-multiline-flexible"
            label="Name"
            multiline
            maxRows={4}
            sx={{ width: "400px", marginTop: "10px" }}
            onChange={(e) => onValueChange(e.target)}
            name="product_name"
            value={product.product_name}
          />
        </FormControl>
        <FormControl>
          <TextField
            id="outlined-multiline-flexible"
            label="Detail"
            multiline
            maxRows={4}
            sx={{ width: "400px", marginTop: "10px" }}
            onChange={(e) => onValueChange(e.target)}
            name="product_detail"
            value={product.product_detail}
          />
        </FormControl>
        <FormControl>
          <TextField
            id="outlined-multiline-flexible"
            // label="Picture"
            type="file"
            accept="image/*"
            maxRows={4}
            sx={{ width: "400px", marginTop: "10px" }}
            onChange={(e) => {
              setProductImage(e.target.files[0]);
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            //  id="outlined-number"
            type="number"
            InputProps={{
              inputProps: { min: 0 },
            }}
            label="Price"
            maxRows={4}
            sx={{ width: "400px", marginTop: "10px" }}
            onChange={(e) => onValueChange(e.target)}
            name="product_price"
            value={product.product_price}
          />
        </FormControl>
        {/* <FormControl>
          <TextField
            // id="outlined-multiline-flexible"
            type="number"
            InputProps={{
              inputProps: { min: 0 },
            }}
            label="Stock"
            maxRows={4}
            sx={{ width: "400px", marginTop: "10px" }}
            onChange={(e) => onValueChange(e.target)}
            name="product_stock"
            value={product.product_stock}
          />
        </FormControl> */}
        <Button
          variant="contained"
          sx={{ marginTop: "10px" }}
          onClick={() => editProduct()}
        >
          Edit
        </Button>
      </FormGroup>
    </div>
  );
}

export default EditProduct;
