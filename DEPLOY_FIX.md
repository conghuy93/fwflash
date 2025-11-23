# 🔧 Fix GitHub Pages Deployment Timeout

## Vấn đề
GitHub Pages deployment bị timeout ở bước "purging_cdn" khi dùng GitHub Actions.

## Giải pháp

### Bước 1: Tắt GitHub Actions
1. Vào: https://github.com/conghuy93/fwflash/settings/pages
2. Trong phần **Build and deployment**:
   - Chọn **Source**: `Deploy from a branch` (KHÔNG chọn GitHub Actions)
   - **Branch**: `main`
   - **Folder**: `/docs` (hoặc `/ (root)`)
3. Click **Save**

### Bước 2: Đảm bảo file .nojekyll tồn tại
File `.nojekyll` đã có trong repo để tắt Jekyll processing.

### Bước 3: Kiểm tra cấu trúc
- File `index.html` phải ở thư mục được chọn (root hoặc docs)
- File `esptool-wrapper.js` phải cùng thư mục với `index.html`
- File `.nojekyll` phải có

### Bước 4: Đợi và kiểm tra
- Đợi 2-5 phút sau khi save
- Kiểm tra tab **Actions** - không nên có workflow chạy
- Truy cập: https://conghuy93.github.io/fwflash/

## Lưu ý
- GitHub Actions workflow đã được xóa
- Sử dụng Jekyll build thông thường (đã tắt bằng .nojekyll)
- Static files sẽ được serve trực tiếp

