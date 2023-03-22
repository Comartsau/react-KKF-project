import React, { useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // สร้างเอกสาร PDF ใหม่
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();

      // ตั้งค่าฟอนต์และขนาดตัวอักษร
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontSize = 20;

      // เพิ่มข้อมูลลงในเอกสาร PDF
      page.drawText(`Name: ${formData.name}`, {
        x: 50,
        y: height - 50,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });
      page.drawText(`Email: ${formData.email}`, {
        x: 50,
        y: height - 100,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });
      page.drawText(`Phone: ${formData.phone}`, {
        x: 50,
        y: height - 150,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });

      // แปลงเอกสาร PDF เป็นไบต์แอร์เรย์
      const pdfBytes = await pdfDoc.save();

      // ดาวน์โหลดไฟล์ PDF จากไบต์แอร์เรย์
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'form.pdf';
      a.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
        Phone:
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
