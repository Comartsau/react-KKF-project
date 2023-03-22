import axios from 'axios';

const API_URL = 'http://192.168.1.96:8000';
const getToken = () => {
    return localStorage.getItem('token');
  };


// getProducts สำหรับการดึงข้อมูลมาแสดง

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/product`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// เพิ่ม รายการ

export const createProduct = async (product, productImage, token) => {
    try {
      const token = getToken();
      const formData = new FormData();
      formData.append("product_name", product.product_name);
      formData.append("product_detail", product.product_detail);
      formData.append("product_price", product.product_price);
      formData.append("product_stock", product.product_stock);
  
      if (productImage) {
        formData.append("product_image", productImage);
      }
  
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${API_URL}/product`,
        headers: { "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`,
        },
        data: formData,
      };
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };


// ลบรายการ


export const deleteProduct = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/productdel/${id}`, {
      headers: { 'Authorization': `Token ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


// แก้ไขรายการ  getProduct  สำหรับการ edit หรือ update

export const getProduct = async (id, token) => {
    try {
      const response = await axios.get(`${API_URL}/product/${id}`, {
        headers: { 'Authorization': `Token ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  

//   export const updateProduct = async (id, product, token) => {
//     try {
//       const response = await axios.put(`${API_URL}/productedit/${id}`, product, {
//         headers: { 'Authorization': `Token ${token}`, 'Content-Type': 'application/json' },
//       });
//       return response.data;
//     } catch (error) {
//       console.error(error);
//     }
//   };


// ส่งเป็นไฟล์ image ให้  api server
export const updateProduct = async (id, product, productImage, token) => {
    try {
      const token = getToken();
      console.log(`Token ${token}`)
      const formData = new FormData();
      formData.append("product_name", product.product_name);
      formData.append("product_detail", product.product_detail);
      formData.append("product_price", product.product_price);
      formData.append("product_stock", product.product_stock);
  
      if (productImage) {
        formData.append("product_image", productImage);
      }
  
      const config = {
        method: "put",
        url: `${API_URL}/productedit/${id}`,
        maxBodyLength: Infinity,
        // headers: { "Content-Type": "multipart/form-data",
        headers: { "Content-Type": 'application/json',
        Authorization: `Token ${token}`,
        },
        data: formData,
      };
      const response = await axios.put(`${API_URL}/productedit/${id}`, config);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };