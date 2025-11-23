# Hướng dẫn Deploy lên GitHub Pages

## Bước 1: Khởi tạo Git Repository

```bash
cd web_flasher_github
git init
git add .
git commit -m "Initial commit: ESP32 Web Flasher"
```

## Bước 2: Kết nối với GitHub Repository

```bash
git remote add origin https://github.com/conghuy93/fwflash.git
git branch -M main
git push -u origin main
```

## Bước 3: Kích hoạt GitHub Pages

1. Vào repository trên GitHub: https://github.com/conghuy93/fwflash
2. Click vào tab **Settings**
3. Cuộn xuống phần **Pages** (ở sidebar bên trái)
4. Trong phần **Source**, chọn:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**

## Bước 4: Đợi Deploy

GitHub Pages sẽ tự động deploy trong vài phút. Bạn có thể xem tiến trình trong tab **Actions**.

## Bước 5: Truy cập Website

Sau khi deploy xong, truy cập:
**https://conghuy93.github.io/fwflash/**

## Lưu ý

- Đảm bảo repository là **Public** để GitHub Pages hoạt động miễn phí
- Nếu dùng **Private repository**, cần GitHub Pro/Team
- File `index.html` phải ở thư mục gốc của repository

## Cập nhật Code

Khi có thay đổi, chỉ cần:

```bash
git add .
git commit -m "Update: mô tả thay đổi"
git push
```

GitHub Pages sẽ tự động deploy lại!

