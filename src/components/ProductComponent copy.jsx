import React, { useState, useEffect } from "react";
import {
  getStock,
  getProducts,
  APIURL,
  updateProductStock,
  getUser,
  sendReceipt
} from "../service/api";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./ProductComponent.css";
import { PDFViewer } from "@react-pdf/renderer";
import Receipt from "../Receipt";

function ProductComponent() {
  const [product, setProduct] = useState([]);
  const [userlogin, setUserLogin] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [vat, setVat] = useState(7);
  const [showReceipt, setShowReceipt] = useState(false);

  const fetchData = async () => {
    // const data = await getStock();
    // const userdata = await getUser();
    // console.log(data);
    // console.log(userdata);
    // const filteredData = data.map((item) => {
    //   console.log(item)
    //   return {
    //     product_name: "พัดลม",
    //     product_detail: "aaaaaaaaaaaa",
    //     product_price: 2500,
    //     product_stock: 15,
    //     product_image: "a.jpg",
    //     // product_name: item.product_name,
    //     // product_price: item.product_price,
    //     // product_stock: item.product_stock,
    //     // ... ข้อมูลอื่น ๆ ที่คุณต้องการ
    //   };
    // });
    // setProduct(filteredData);
    // setUserLogin(userdata.first_name);

    try {
      const [stockData,  ProductData, userData] = await Promise.all([getStock(), getProducts(), getUser()]);
      // console.log(stockData)
      const filteredData = stockData.map((item) => {
        // console.log(item)
        return {
          id: item.id,
          product_name: item.product_name,
          product_detail: item.create_at,
          product_price: item.productprice,
          product_stock: item.quantity,
          product_image: item.productimage,

          // ตัวอย่างการเพิ่มข้อมูล

          // product_name: item.product_name,
          // product_detail: item.product_detail,
          // product_price: item.product_price,
          // product_stock: item.product_stock,
          // product_image: item.product_image,
          // user_email: userData.email,
          // user_first_name: userData.first_name,
          // user_last_name: userData.last_name,
          // user_tel: userData.tel,
          // ข้อมูลอื่น ๆ ที่คุณต้องการ
        };
      });
      setUserLogin(userData.first_name);
      // console.log(filteredData)
      setProduct(filteredData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      alert("เกิดข้อผิดพลาดในการดึงข้อมูล กรุณาลองใหม่อีกครั้ง");
    }
  };
  

  useEffect(() => {
    fetchData()
  }, []);


  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  // คลิกที่ card เพื่อนำเข้าสินค้าเข้าตระกร้า
  const handleClickProduct = (product) => {
    handleAddToCart(product);
  };

  // เพิ่มสินค้า
  const handleAddToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      if (existingProduct.quantity < product.product_stock) {
        const updatedCart = cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setCartItems(updatedCart);
      } else {
        alert("คุณไม่สามารถเพิ่มสินค้าเกินจำนวนที่มีในสต็อก");
      }
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // ลดสินค้า
  const handleRemoveFromCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct && existingProduct.quantity > 1) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCartItems(updatedCart);
    } else {
      const updatedCart = cartItems.filter((item) => item.id !== product.id);
      setCartItems(updatedCart);
    }
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const calculateTotal = () => {
    return parseFloat(
      cartItems
        .reduce((total, item) => total + item.product_price * item.quantity, 0)
        .toFixed(2)
    );
  };

  const calculateDiscountedTotal = () => {
    const total = calculateTotal();
    const discountAmount = (total * discount) / 100;
    const discountedTotal = total - discountAmount;
    const vatAmount = (discountedTotal * vat) / 100;
    return parseFloat((discountedTotal + vatAmount).toFixed(2));
  };

  // ยืนยันคำสั่งซื้อสินค้าที่นี่
  const handleConfirmOrder = async () => {
    try {
      // ตัดสต็อกสินค้า
      const updateStockPromises = cartItems.map(async (item) => {
        const newStock = item.quantity;
        // const newStock = item.product_stock - item.quantity;
        return updateProductStock(item.id, newStock);
      });

      // รอ updateStockPromises ข้อมูลการตัด stock จาก api ให้ทำงานเรียบร้อย
      const stockUpdateResults = await Promise.all(updateStockPromises);

      // ตรวจสอบว่าทุกตัวอัปเดตสต็อกสำเร็จหรือไม่
      if (stockUpdateResults.every((result) => result.status === "success")) {
        alert("คำสั่งซื้อสินค้าของคุณถูกยืนยันแล้ว!");

        const orderItems = cartItems.map((item) =>{
          //console.log(item)
          return{
            product_id:item.id,
            quantity:Number(item.quantity),
            sum:Number(item.quantity)*Number(item.product_price)
          }
        })

        let productId;
          for (const item of cartItems) {
            productId = item.id;
          }

        // สร้าง object ข้อมูลการสั่งซื้อ
        const orderData = {
          "customer_name":userlogin,
          "items":orderItems,
          "discount":discount,
          "vat":vat,
          "total": calculateDiscountedTotal(),
        };
        // console.log(orderData)
        sendReceipt(orderData)

        // เก็บข้อมูลการสั่งซื้อลง localStorage
        // const currentTimestamp = new Date().toISOString();
        // localStorage.setItem(
        //   `order_${currentTimestamp}`,
        //   JSON.stringify(orderData)
        // );

      

        // อัปเดตสินค้าใน frontend
        updateProductsAfterOrderConfirmed();

        // หลังจากยืนยันคำสั่งซื้อสำเร็จแล้ว ให้แสดงใบเสร็จ
          setShowReceipt(true);


      } else {
        alert("เกิดข้อผิดพลาดในการตัดสต็อกสินค้า กรุณาลองใหม่อีกครั้ง");
      }
    } catch (error) {
      console.error("Failed to confirm order:", error);
      alert("เกิดข้อผิดพลาดในการยืนยันคำสั่งซื้อ กรุณาลองใหม่อีกครั้ง");
    }
  };

  const updateProductsAfterOrderConfirmed = () => {
    getProducts()
      .then((updatedProducts) => {
        // อัปเดต state ของรายการสินค้าใน frontend
        setProduct(updatedProducts);
      })
      .catch((error) => {
        console.error(
          "Failed to update products after order confirmed:",
          error
        );
        alert("เกิดข้อผิดพลาดในการอัปเดตรายการสินค้า กรุณาลองใหม่อีกครั้ง");
      });
  };

  const closeReceipt = () => {
    setShowReceipt(false);
    handleClearCart()
    window.location.reload();

  }

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ marginTop: "100px", marginLeft: "10px", paddingRight: "50px" }}
      >
        <Grid item xs={12} sm={6} md={8} sx={{ flex: "1 1 70%" }} key={product.id}>
          {/* <h4>สินค้าทั้งหมด</h4> */}
          <Grid container spacing={2}>
            {product
              .filter((product) => product.product_stock > 0)
              .map((product, index) => (
                <Grid
                  item
                  key={index}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  sx={{
                    display: "flex",
                    justifyContent: {
                      xs: "center",
                      sm: "flex-start",
                      md: "flex-start",
                      lg: "flex-start",
                    },
                    alignItems: "center",
                  }}
                >
                  <Card
                    className="product-card"
                    sx={{ maxWidth: 275 }}
                    onClick={() => handleClickProduct(product)}
                  >
                    <CardMedia
                      component="img"
                      className="product-image"
                      image={`${APIURL}${product.product_image}`}
                      alt={product.product_name}
                    />
                    <CardContent>
                      <Typography
                        align="justify"
                        gutterBottom
                        component="div"
                        variant="body2"
                      >
                        {product.product_name}
                      </Typography>
                      <Typography
                        align="justify"
                        variant="body2"
                        color="text.secondary"
                        style={{ fontSize: "14px" }}
                      >
                        รายละเอียดสินค้า: {product.product_detail}
                      </Typography>
                      <Typography
                        align="justify"
                        variant="body1"
                        color="text.primary"
                        style={{ fontSize: "14px" }}
                      >
                        ราคา: {formatNumber(product.product_price)} บาท
                      </Typography>
                      <Typography
                        align="justify"
                        variant="body1"
                        style={{ fontSize: "14px" }}
                      >
                        จำนวน: {product.product_stock} ชิ้น
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ flex: "1 1  30%" }}>
          {showReceipt ? (
            <div  style={{ position: "relative" }}>
            <PDFViewer width="100%" height="500px">
              <Receipt
              />
            </PDFViewer>
              {/* ปุ่มปิด PDFViewer */}
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => closeReceipt()}
              >
                ปิด
              </Button>
              </div>
          ) : (
            <div className="cart-details">
              <h6>ตะกร้าสินค้า</h6>
              
              <hr />

              <List>
                {cartItems.map((item,index) => {
                  // console.log(item)

                  return (
                    <div key={index}>
                      <ListItem
                        alignItems="center"
                        style={{ display: "flex", alignItems: "center" }}

                      >
                        <ListItemText
                          style={{ flex: 1 }}
                          primary={
                            <Typography
                              variant="body2"
                              style={{ fontSize: "14px" }}
                            >
                              {item.product_name}
                            </Typography>
                          }
                          secondary={`จำนวน: ${item.quantity} `}
                        />
                        <ListItemAvatar>
                          <IconButton
                            color="primary"
                            onClick={() => handleAddToCart(item)}
                          >
                            <AddIcon />
                          </IconButton>
                          <IconButton
                            color="secondary"
                            onClick={() => handleRemoveFromCart(item)}
                          >
                            <RemoveIcon />
                          </IconButton>
                        </ListItemAvatar>
                        <ListItemText
                          style={{ flex: 1 }}
                          sx={{ textAlign: "end" }}
                          primary={
                            <Typography
                              variant="body2"
                              style={{ fontSize: "14px" }}
                            >
                              รวม
                            </Typography>
                          }
                          secondary={`${formatNumber(
                            item.product_price * item.quantity
                          )} บาท`}
                        />
                      </ListItem>

                      <hr />
                    </div>
                  );
                })}
              </List>
              {cartItems.length > 0 && (
                <>
                  <div
                    className="cart-details"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "row",
                      alignItems: "flex-end",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleClearCart}
                    >
                      ล้างตะกร้า
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleConfirmOrder}
                    >
                      ยืนยันการสั่งซื้อ
                    </Button>
                  </div>
                  <h6 style={{ textAlign: "end", marginTop: "30px" }}>
                    ยอดรวม: {formatNumber(calculateTotal())} บาท
                  </h6>
                  <Grid
                    container
                    direction="column"
                    alignItems="flex-end"
                    spacing={2}
                    marginTop="5px"
                    marginBottom="20px"
                  >
                    <Grid item xs={3} sm={2}>
                      <TextField
                        label="ส่วนลด %"
                        type="number"
                        value={discount}
                        onChange={(e) => {
                          const newDiscount = parseFloat(e.target.value);
                          if (newDiscount >= 0 && newDiscount <= 100) {
                            setDiscount(newDiscount);
                          }
                        }}
                        inputProps={{
                          style: { textAlign: "right", fontSize: "12px" },
                        }}
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={3} sm={2}>
                      <TextField
                        label="VAT %"
                        type="number"
                        value={vat}
                        onChange={(e) => {
                          const newVat = parseFloat(e.target.value);
                          if (newVat >= 0 && newVat <= 100) {
                            setVat(newVat);
                          }
                        }}
                        inputProps={{
                          style: { textAlign: "right", fontSize: "12px" },
                        }}
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <h6
                    style={{
                      textAlign: "end",
                      marginTop: "10px",
                      paddingBottom: "5px",
                      borderBottom: "2px solid black",
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    ยอดหลังส่วนลด: {formatNumber(calculateDiscountedTotal())}{" "}
                    บาท
                  </h6>
                </>
              )}
            </div>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default ProductComponent;
