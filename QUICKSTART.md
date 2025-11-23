# 🚀 Quick Start - Deploy lên GitHub Pages

## Cách nhanh nhất (Windows)

1. **Mở PowerShell** trong thư mục `web_flasher_github`
2. **Chạy script**:
   ```powershell
   .\push-to-github.bat
   ```

## Cách nhanh nhất (Linux/Mac)

1. **Mở Terminal** trong thư mục `web_flasher_github`
2. **Chạy script**:
   ```bash
   chmod +x push-to-github.sh
   ./push-to-github.sh
   ```

## Cách thủ công

```bash
cd web_flasher_github
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/conghuy93/fwflash.git
git push -u origin main
```

## Sau khi push xong

1. Vào: https://github.com/conghuy93/fwflash
2. **Settings** > **Pages**
3. Chọn **Source**: `main` branch, `/ (root)` folder
4. Click **Save**
5. Đợi vài phút
6. Truy cập: **https://conghuy93.github.io/fwflash/**

## ✅ Xong!

Website của bạn đã sẵn sàng để flash ESP32 online!

