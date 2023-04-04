import React from "react";
import { Document, Page, Text, View, StyleSheet,Font} from "@react-pdf/renderer";
import  SarabunRegular from './fonts/Sarabun-Regular.ttf'
import thaiBahtText from "thai-baht-text";
import { fontSize } from "@mui/system";



Font.register({
  family: "Sarabun",
  src: SarabunRegular,
});


const styles = StyleSheet.create({

  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 20,
    fontFamily:'Sarabun',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#cccccc",
    padding: 5,
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  tableColumn1: {
    width: "60%",
  },
  tableColumn2: {
    width: "20%",
    textAlign: "center",
  },
  tableColumn3: {
    width: "20%",
    textAlign: "right",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },


  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginTop: 10,
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  itemRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 5,
  },

  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 12,
  },


});

const Receipt = () => {
  
  const userlogin = "a"
  const total = 1000
  const discount = 500
  const vat= 7
  const amountvat = parseFloat(((total*(vat/100)) ).toFixed(2));
  const cartItems = [
    {  
      id:1,
      product_name:"a",
      product_detail:"3/4/66 19:03",
      product_price:111,
      product_stock:9687,
      product_image:"/media/image/SNAG-0000.jpg",
      quantity:1
    },
    {  
      id:2,
      product_name:"b",
      product_detail:"3/4/66 19:03",
      product_price:222,
      product_stock:35532,
      product_image:"/media/image/SNAG-0000.jpg",
      quantity:1
    },
  ]


  // ใส่ตัวคั่น และกำหนดทศนิยมไม่เกิน 2 ตำแหน่ง
  function formatNumber(number) {
    return new Intl.NumberFormat('th-TH', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(number);
  }

  const itemsPerPage = 6; // ตัวอย่างนี้กำหนดให้แสดงรายการสินค้า 10 รายการต่อหน้า
  const totalPages = Math.ceil(cartItems.length / itemsPerPage);

    return (
      <Document>
        {Array.from({ length: totalPages }, (_, pageIndex) =>(
        <Page size="A4" style={styles.page} key={pageIndex}>
          <View style={styles.section}>
            <Text style={{...styles.header}}>ใบเสร็จรับเงิน</Text>

            <View style={styles.infoRow}>
            <Text>ผู้ใช้: {userlogin}</Text>
            <Text style={{textAlign:"right"}}>วันที่สั่งซื้อ: </Text>
            </View>
            <Text style={{textAlign:"right"}}>เลขที่บิล: </Text>
            
            {/* เส้นคั้น header */}
            <View style={styles.separator} />

            {/* หัวตาราง */}
            <View style={styles.tableHeader}>
            <Text style={styles.tableColumn1}> ชื่อสินค้า </Text>
            <Text style={styles.tableColumn2}> จำนวน </Text>
            <Text style={styles.tableColumn3}> รวม </Text>
            </View>


         {/* รายละเอียดสินค้า */}
         {cartItems
              .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
              .map((item, index) => (
                <View style={styles.tableRow} key={index}>
                  <Text style={styles.tableColumn1}>{item.product_name}</Text>
                  <Text style={styles.tableColumn2}>{item.quantity}</Text>
                  <Text style={styles.tableColumn3}>
                    {formatNumber(item.product_price * item.quantity)} บาท
                  </Text>
                </View>
              ))}

             {/* เส้นคั้น content */}
             <View style={styles.separator} />
            
            {/* ส่วนสรุปรายการท้ายเอกสาร */}
            {pageIndex + 1 === totalPages && (
              <View>
              <View style={styles.itemRight}>
                <Text> ส่วนลด = {discount} บาท</Text>
              </View>
              <View style={styles.itemRight}>
                <Text> ภาษีมูลค่าเพิ่ม {vat} % = {amountvat}  บาท</Text>
              </View>
              <View style={styles.item}>
                <Text style={{fontSize:"14"}}>{thaiBahtText(total)}</Text>
                {/* <Text>ยอดรวม</Text> */}
                <Text> ยอดรวม = {formatNumber(total)} บาท</Text>
              </View>
              </View>
            )}
          </View>

              {/* footer */}
            <View style={styles.footer}>
              <Text>
                หน้า {pageIndex + 1} จาก {totalPages}
              </Text>
            </View>


        </Page>
        
        ))}
        </Document>
    )
  };
  
  export default Receipt;
