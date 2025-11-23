# ✅ Kiểm tra Deployment

## Các bước kiểm tra

### 1. Kiểm tra GitHub Pages Settings
Vào: https://github.com/conghuy93/fwflash/settings/pages

**Phải cấu hình:**
- ✅ Source: `Deploy from a branch` (KHÔNG phải GitHub Actions)
- ✅ Branch: `main`
- ✅ Folder: `/docs`

### 2. Kiểm tra file trong docs folder
Các file sau PHẢI có trong `docs/`:
- ✅ `index.html` - File chính
- ✅ `esptool-wrapper.js` - Wrapper cho esptool-js
- ✅ `.nojekyll` - Tắt Jekyll processing

### 3. Kiểm tra website
Truy cập: https://conghuy93.github.io/fwflash/

**Nếu thấy:**
- ✅ Trang web hiển thị → Deploy thành công
- ❌ 404 Not Found → Chưa deploy hoặc cấu hình sai
- ❌ Trang trắng → Có lỗi JavaScript

### 4. Kiểm tra Console (F12)
Mở Console và kiểm tra:
- ❌ Lỗi 404 cho esptool-wrapper.js → File chưa được deploy
- ❌ Lỗi esptool-js → CDN có vấn đề
- ✅ Không có lỗi → OK

### 5. Kiểm tra Actions tab
Vào: https://github.com/conghuy93/fwflash/actions
- ❌ Không nên có workflow đang chạy (đã xóa)
- ✅ Nếu có, cancel nó

## Nếu chưa deploy

1. **Kiểm tra Settings > Pages:**
   - Đảm bảo đã chọn "Deploy from a branch"
   - Folder phải là `/docs`
   - Save lại

2. **Kiểm tra file:**
   ```bash
   cd web_flasher_github
   ls docs/
   ```
   Phải thấy: index.html, esptool-wrapper.js, .nojekyll

3. **Push lại nếu thiếu:**
   ```bash
   git add docs/
   git commit -m "Ensure all files in docs"
   git push
   ```

4. **Đợi 5-10 phút** sau khi push

## Troubleshooting

### Lỗi: File not found
- Kiểm tra file có trong docs/ không
- Đảm bảo đã push lên GitHub
- Kiểm tra tên file chính xác (case-sensitive)

### Lỗi: Timeout
- Đã xóa GitHub Actions workflow
- Dùng Jekyll build thông thường
- File .nojekyll đã có

### Lỗi: esptool-js not found
- Kiểm tra CDN: https://unpkg.com/esptool-js@1.0.0/dist/esptool.js
- Có thể cần thay đổi version hoặc dùng local file

