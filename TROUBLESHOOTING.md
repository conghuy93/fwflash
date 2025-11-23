# 🔧 Troubleshooting GitHub Pages Deployment

## Vấn đề: Timeout khi deploy

Nếu bạn gặp lỗi timeout khi deploy, thử các giải pháp sau:

### Giải pháp 1: Tắt GitHub Actions, dùng Jekyll build

1. Vào **Settings** > **Pages**
2. Trong phần **Build and deployment**:
   - Chọn **Source**: `Deploy from a branch`
   - **Branch**: `main`
   - **Folder**: `/docs` (hoặc `/ (root)`)
3. **KHÔNG** chọn "GitHub Actions"
4. Save

### Giải pháp 2: Xóa workflow file tạm thời

Nếu GitHub Actions gây conflict:

```bash
cd web_flasher_github
git rm .github/workflows/deploy.yml
git commit -m "Remove GitHub Actions workflow"
git push
```

Sau đó dùng Jekyll build thông thường.

### Giải pháp 3: Chỉ deploy từ docs folder

1. Đảm bảo tất cả file trong `docs/` folder
2. Settings > Pages > Source: `/docs`
3. Xóa file `.github/workflows/deploy.yml` nếu có

### Giải pháp 4: Kiểm tra file size

Đảm bảo không có file quá lớn (> 1MB):
- index.html: ~25KB ✅
- esptool-web.js: ~4.5KB ✅
- Tất cả file đều nhỏ ✅

### Giải pháp 5: Đợi và retry

Đôi khi GitHub Pages bị quá tải. Đợi 10-15 phút rồi:
1. Vào tab **Actions**
2. Cancel deployment đang chạy (nếu có)
3. Push lại một commit nhỏ để trigger lại

## Kiểm tra trạng thái

1. Vào: https://github.com/conghuy93/fwflash/settings/pages
2. Xem phần **Custom domain** - nếu có lỗi sẽ hiển thị ở đây
3. Kiểm tra tab **Actions** để xem log chi tiết

## Lưu ý

- File `.nojekyll` đã có để tắt Jekyll
- File `_config.yml` đã có để cấu hình
- Cả root và docs folder đều có file

