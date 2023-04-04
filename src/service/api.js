import axios from 'axios';

const API_URL = 'http://26.125.18.207:8000';
export const APIURL = 'http://26.125.18.207:8000';
const getToken = () => {
    return localStorage.getItem('token');
  };

  export const getUser = async () => {
    try {
      let data = '';
   
      const token = getToken();
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${API_URL}/profile`,
        headers: { "Content-Type": "application/json",
                    Authorization: `Token ${token}`
                },
        data: data,
      };
      const response = await axios.request(config);
      return response.data;
      
    } catch (error) {
      console.error(error);
    }
  }

// getProducts สำหรับการดึงข้อมูลมาแสดง

export const getProducts = async ( ) => {
  try {
    let data = '';
    const token = getToken();
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${API_URL}/product`,
      headers: { "Content-Type": "application/json",
                  Authorization: `Token ${token}`
              },
      data: data,
    };
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


// getStock สำหรับการดึงข้อมูลมาแสดงที่ ProductComponwnt เพื่อขายสินค้า

export const getStock = async ( ) => {
  try {
    let data = '';
    const token = getToken();
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${API_URL}/stockshow`,
      headers: { "Content-Type": "application/json",
                  Authorization: `Token ${token}`
              },
      data: data,
    };
    const response = await axios.request(config);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// เพิ่ม รายการสินค้า

export const createProduct = async (product, resizedImage) => {
    try {
      const token = getToken();
      const formData = new FormData();
      formData.append("product_name", product.product_name);
      formData.append("product_detail", product.product_detail);
      formData.append("product_price", product.product_price);
      formData.append("product_stock", product.product_stock);
  
      if (resizedImage) {
        formData.append("product_image", resizedImage);
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
    const token = getToken();
    const response = await axios.delete(`${API_URL}/productdel/${id}`, {
      headers: { "Content-Type": "application/json",
                  Authorization: `Token ${token}` 
                },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


// แก้ไขรายการ  getProduct  สำหรับการ edit หรือ update

export const getProduct = async (id, token) => {
    try {
      const token = getToken();
      const response = await axios.get(`${API_URL}/product/${id}`, {
        headers: { 'Authorization': `Token ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  

// ส่งเป็นไฟล์ image ให้  api server
export const updateProduct = async (id, product, resizedImage, token) => {
    try {
      const token = getToken();
      console.log(`Token ${token}`)
      console.log(`id ${id}`)
      console.log(`product ${resizedImage}`)

      const formData = new FormData();
      formData.append("product_name", product.product_name);
      formData.append("product_detail", product.product_detail);
      formData.append("product_price", product.product_price);
      formData.append("product_stock", product.product_stock);

      if (resizedImage) {
        formData.append("product_image", resizedImage);
      }
  
      const config = {
        method: "put",
        url: `${API_URL}/productedit/${id}`,
        headers: { "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`,
      },
        data: formData
      };
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };


  // ส่งข้อมูล ให้ backend หลังกดยืนยันการสั่งซื้อ

  export const updateProductStock = async (productId, newStock) => {
    // console.log(productId , newStock)

    let data = JSON.stringify({
      productId,
      newStock
    });
    // console.log(data)
    const token = getToken();
    
    // ใช้ API_URL ที่คุณกำหนดไว้แล้วแทนที่ใช้เส้นทางสัมพันธ์
    const response = await fetch(`${API_URL}/updatestock/${productId}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`,
      },
      // body: JSON.stringify({ newStock,productId })
      body: data
    });
  
    if (!response.ok) {
      throw new Error(`Failed to update product stock: ${response.statusText}`);
    }
  
    return await response.json();
  };


// เพิ่มนำเข้าสินค้า
export const sendStockData = async (data) => {
  console.log('ข้อมูลที่จะส่งไปที่ backend =' ,data); 
  try {
    const token = getToken();
    const config = {
      method: "post",
      url: `${API_URL}/add-stock`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      data: data,
    };
    const response = await axios.request(config);
    return console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
};

// ส่งออกใบเสร็จ 


export const sendReceipt = async (oraderData) => {
  // console.log(oraderData.items)


    let data = JSON.stringify({
      "customer_name": oraderData.customer_name,
      "total": oraderData.total,
      "discount":oraderData.discount,
      "vat":oraderData.vat,
      "items":oraderData.items
      // "items":[
      //   {
      //     "product_id":1,
      //     "quantity":1000,
      //     "sum":100
      //   },
      //   {
      //     "product_id":2,
      //     "quantity":2000,
      //     "sum":200
      //   }
      // ]
    })
  console.log(data)




  // const token = getToken();
const response = await fetch(`${API_URL}/myview`, {
  method: "post",
  headers: {
    "Content-Type": "application/json",
    // "Authorization": `Token ${token}`,
  },
  body: data

});

// if (!response.ok) {
//   throw new Error(`Failed to update product stock: ${response.statusText}`);
// }

return await response.json();
};


  