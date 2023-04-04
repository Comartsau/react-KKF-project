import { Font } from "@react-pdf/renderer";

// นำเข้าไฟล์ฟอนต์ .ttf หรือ .otf
Font.register({
    family: 'Sarabun',
    src: require('./Sarabun-Regular.ttf'),
  });

  // ถ้าคุณต้องการนำเข้ารูปแบบตัวหนา, ตัวเอียง หรือรูปแบบอื่น ๆ ของ Sarabun คุณสามารถทำเช่นเดียวกัน
Font.register({
    family: 'Sarabun-Bold',
    src: require('./Sarabun-Bold.ttf'),
  });