# ⚙️ Cấu hình GitHub Pages (QUAN TRỌNG)

## Bước 1: Vào Settings
Truy cập: https://github.com/conghuy93/fwflash/settings/pages

## Bước 2: Cấu hình Source
1. Trong phần **Build and deployment**:
   - **Source**: Chọn `Deploy from a branch` 
   - **KHÔNG** chọn "GitHub Actions"
   
2. Chọn:
   - **Branch**: `main`
   - **Folder**: `/docs` ← **QUAN TRỌNG: Chọn docs folder**
   
3. Click **Save**

## Bước 3: Đợi deploy
- Đợi 2-5 phút
- GitHub Pages sẽ build từ thư mục `/docs`
- File `.nojekyll` trong docs sẽ tắt Jekyll processing

## Bước 4: Kiểm tra
Truy cập: https://conghuy93.github.io/fwflash/

## Lưu ý
- ✅ GitHub Actions workflow đã được xóa
- ✅ File `.nojekyll` đã có trong docs folder
- ✅ Tất cả file cần thiết đã có trong docs:
  - index.html
  - esptool-wrapper.js
  - esptool-web.js (backup)

## Nếu vẫn lỗi
1. Cancel deployment đang chạy trong tab Actions
2. Xóa cache: Settings > Pages > Clear cache (nếu có)
3. Đợi 10 phút rồi thử lại

