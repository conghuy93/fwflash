# ⚠️ Quan trọng: Cấu hình GitHub Pages

## Vấn đề

Nếu bạn thấy lỗi về thư mục `/docs` không tồn tại, có nghĩa là GitHub Pages đang được cấu hình để build từ thư mục `docs` thay vì root.

## Giải pháp

### Bước 1: Kiểm tra cấu hình GitHub Pages

1. Vào repository: https://github.com/conghuy93/fwflash
2. Click **Settings** (tab trên cùng)
3. Cuộn xuống phần **Pages** (sidebar bên trái)
4. Trong phần **Source**, đảm bảo:
   - **Branch**: `main`
   - **Folder**: `/ (root)` ← **QUAN TRỌNG: Phải là root, không phải /docs**

### Bước 2: Nếu vẫn lỗi

Nếu vẫn thấy lỗi, có thể thử một trong các cách sau:

#### Cách 1: Tạo thư mục docs và di chuyển file vào đó

```bash
cd web_flasher_github
mkdir docs
cp index.html docs/
cp esptool-web.js docs/
cp README.md docs/
git add docs/
git commit -m "Move files to docs folder"
git push
```

Sau đó trong GitHub Pages Settings, chọn folder `/docs`

#### Cách 2: Sử dụng GitHub Actions (Đã có sẵn)

File `.github/workflows/deploy.yml` đã được tạo sẵn. GitHub Actions sẽ tự động deploy.

### Bước 3: Xóa cache và rebuild

1. Vào tab **Actions** trên GitHub
2. Xem workflow "Deploy to GitHub Pages"
3. Nếu có lỗi, click vào workflow và xem log
4. Có thể cần cancel và re-run workflow

## Lưu ý

- File `.nojekyll` đã được tạo để tắt Jekyll processing
- File `_config.yml` đã được tạo để cấu hình Jekyll
- Đảm bảo cấu hình GitHub Pages đúng (root folder, không phải /docs)

