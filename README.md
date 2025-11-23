# ESP32 Web Flasher - Flash Online

Giao diện web để flash ESP32 trực tiếp từ trình duyệt, không cần cài đặt phần mềm!

## 🌐 Demo Online

Truy cập: [https://conghuy93.github.io/fwflash/](https://conghuy93.github.io/fwflash/)

## ✨ Tính năng

- 🚀 **Flash trực tiếp từ trình duyệt** - Không cần cài đặt
- 🎨 **Giao diện đẹp và hiện đại** - Thiết kế gradient, responsive
- ⚡ **Flash firmware nhanh chóng** - Hỗ trợ nhiều tùy chọn cấu hình
- 🔌 **Web Serial API** - Kết nối trực tiếp với ESP32 qua USB
- 📱 **Responsive** - Hoạt động tốt trên mọi thiết bị

## 📋 Yêu cầu

- **Trình duyệt**: Chrome, Edge, Opera hoặc các trình duyệt Chromium
- **Kết nối**: HTTPS hoặc localhost (Web Serial API yêu cầu)
- **ESP32**: Đã kết nối qua USB Serial

## 🚀 Cách sử dụng

1. **Kết nối ESP32** vào máy tính qua USB
2. **Mở trang web** trên trình duyệt hỗ trợ Web Serial API
3. **Click "Kết nối Serial"** và chọn cổng COM của ESP32
4. **Chọn file firmware** (.bin) cần flash
5. **Cấu hình** các thông số flash (mode, size, frequency, address)
6. **Click "Flash Firmware"** và đợi quá trình hoàn tất

## ⚙️ Cấu hình Flash

- **Flash Mode**: QIO, QOUT, DIO, DOUT
- **Flash Size**: 256KB đến 16MB
- **Flash Frequency**: 20MHz đến 80MHz
- **Địa chỉ Flash**: Địa chỉ hex (ví dụ: 0x1000)

## 🔧 Deploy lên GitHub Pages

1. Fork hoặc clone repository này
2. Push code lên GitHub
3. Vào Settings > Pages
4. Chọn branch `main` và folder `/ (root)`
5. Save và đợi vài phút để GitHub Pages deploy

## 📝 Lưu ý

- Web Serial API chỉ hoạt động trên Chrome/Edge/Opera
- Cần kết nối HTTPS hoặc localhost
- Đảm bảo ESP32 đã được kết nối và driver đã cài đặt
- File firmware phải là file .bin hợp lệ

## 🐛 Troubleshooting

### Không thấy nút "Kết nối Serial"
- Kiểm tra trình duyệt có hỗ trợ Web Serial API không
- Đảm bảo đang truy cập qua HTTPS hoặc localhost

### Không kết nối được ESP32
- Kiểm tra driver USB Serial đã cài đặt chưa
- Thử reset ESP32 (nhấn nút RESET)
- Kiểm tra cáp USB

### Lỗi khi flash
- Kiểm tra file firmware có hợp lệ không
- Kiểm tra địa chỉ flash có đúng không
- Thử xóa flash trước khi flash mới

## 📄 License

GPL-2.0-or-later

## 🙏 Credits

Dựa trên [esptool](https://github.com/espressif/esptool) của Espressif Systems

