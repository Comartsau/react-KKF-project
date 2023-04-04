import { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Button,
} from "@mui/material";
import { getProducts, sendStockData } from "../../service/api";
import Container from "@mui/material/Container";

function AddStock() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  // const [selectedProductData, setSelectedProductData] = useState({});
  const [additionalData, setAdditionalData] = useState({});
  const [selectedProductsList, setSelectedProductsList] = useState([]);
  const [event, setevent] = useState();

  const fetchData = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleQuantityChange = (event, product) => {
    const { value } = event.target;
    setevent(value);
    const updatedQuantity = parseInt(value);
    const updatedProduct = {
      ...product,
      updatedQuantity: updatedQuantity,
      updatedAt: formattedDate,
      product_total_price: product.product_price * updatedQuantity,
    };
    setSelectedProductsList((prevList) => {
      const prevProductIndex = prevList.findIndex(
        (item) => item.id === product.id
      );
      if (prevProductIndex >= 0) {
        prevList[prevProductIndex] = updatedProduct;
      } else {
        prevList.push(updatedProduct);
      }
      // คำนวณราคารวมใหม่
      prevList[prevProductIndex].product_total_price = calculateTotalPrice(
        prevList[prevProductIndex]
      );
      return prevList;
    });
  };

  // เพิ่มฟังก์ชันคำนวณราคารวม
  const calculateTotalPrice = (product) => {
    let totalPrice;
    if (product.updatedQuantity) {
      totalPrice = product.product_price * product.updatedQuantity;
    } else {
      totalPrice = product.product_price * product.product_quantity;
    }
    return isNaN(totalPrice) ? 0 : parseFloat(totalPrice).toFixed(2);
  };

  const handleSelectChange = (event) => {

    // ค้นหาข้อมูลใน products เทียบกับค่า ID ที่เลือกจาก select
    setSelectedProduct(event.target.value);
    const foundProduct = products.find(
      (product) => product.id === event.target.value
    );
    // setSelectedProductData(foundProduct);

    setSelectedProductsList((prevList) => {
      const prevProductIndex = prevList.findIndex(
        (item) => item.id === foundProduct.id
      );
      if (prevProductIndex >= 0) {
        prevList[prevProductIndex] = foundProduct;
        return prevList;
      }
      return [...prevList, foundProduct];
    });
  };

  // const handleAdditionalDataChange = (event) => {
  //   const { name, value } = event.target;
  //   setAdditionalData({ ...additionalData, [name]: value });
  // };

  const now = new Date();
  const options = { dateStyle: "short", timeStyle: "short" };
  const formattedDate = now.toLocaleString("th-TH", options);
  // console.log(formattedDate); // 27/03/2566, 15:30

  useEffect(() => {
    setSelectedProductsList((prevList) =>
      prevList.map((product) => ({
        ...product,
        product_total_price: calculateTotalPrice(product),
      }))
    );
  }, [event]);


  const handleAddDataClick = async () => {
    console.log('ข้อมูลที่เลือกได้ =',selectedProductsList)
    try {
      // เลือกเอาเฉพาะข้อมูลที่ต้องการจะส่งไปยัง API
      const selectedData = selectedProductsList.map(({ id, updatedQuantity, updatedAt, product_total_price, product_name }) => ({
        
        product_id: id,
        product_name: product_name,
        quantity: updatedQuantity,
        create_at: updatedAt,
        total_price_data: product_total_price,
      }));
      const data = {
        products: selectedData,
        // additionalData: {
        //   name: additionalData.name,
        //   note: additionalData.note,
        // },
      };
      await sendStockData(data); // เรียกใช้ฟังก์ชัน sendStockData เพื่อส่งข้อมูลไปยัง API
      setSelectedProductsList([]);
      setAdditionalData({});
      // alert("เพิ่มข้อมูลสำเร็จ!");
    } catch (error) {
      console.error(error);
      alert("เพิ่มข้อมูลไม่สำเร็จ!");
    }
  };

  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };


  return (
    <Container maxWidth="lg">
      <FormControl sx={{ m: 1, minWidth: 200, marginTop: "80px" }}>
        <InputLabel id="select-label">สินค้าทั้งหมด</InputLabel>
        <Select
          labelId="select-label"
          value={selectedProduct}
          onChange={handleSelectChange}
        >
          {products.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.product_name}  
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ชื่อสินค้า</TableCell>
              <TableCell align="right">รายละเอียด</TableCell>
              <TableCell align="right">ราคา</TableCell>
              <TableCell align="right">จำนวนสินค้า</TableCell>
              <TableCell align="right">ราคารวม</TableCell>
              <TableCell align="right">วันเวลาที่ปรับปรุง</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedProductsList.map((product) => (
              <TableRow key={product.id}>
                <TableCell component="th" scope="row">
                  {product.product_name}
                </TableCell>
                <TableCell align="right">{product.product_detail}</TableCell>
                <TableCell align="right">{formatNumber(product.product_price)}</TableCell>
                <TableCell align="right">
                  <TextField
                    type="number"
                    value={product.updatedQuantity || 0}
                    onChange={(event) => handleQuantityChange(event, product)}
                    style={{ width: "80px", height: "50px" }}
                    inputProps={{ min: "0", step: "1" }}
                  />
                </TableCell>
                <TableCell align="right">
                {formatNumber(calculateTotalPrice(product)) }
                </TableCell>

                <TableCell align="right">{formattedDate || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        fullWidth
        onClick={handleAddDataClick}
        sx={{ marginTop: "20px" }}
      >
        เพิ่มข้อมูล
      </Button>
    </Container>
  );
}

export default AddStock;
