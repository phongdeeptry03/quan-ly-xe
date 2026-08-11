# Quản lý chuyến xe — Vercel + GitHub + Neon

Bản này dành cho 1 xe, giao diện mobile-first và lưu dữ liệu online bằng Neon Postgres thông qua API của Next.js trên Vercel.

## Biến môi trường trên Vercel

- `DATABASE_URL`: connection string Neon
- `APP_PASSWORD`: mật khẩu đăng nhập website
- `APP_SESSION_SECRET`: chuỗi bí mật dài, ví dụ 32+ ký tự ngẫu nhiên

Không commit các giá trị này vào GitHub.

## Database

Chạy `schema.sql` trong Neon SQL Editor.

## Deploy

1. Tạo GitHub repository, ví dụ `quan-ly-chuyen-xe`.
2. Push toàn bộ thư mục này lên repo.
3. Vào Vercel → Add New Project → Import GitHub repository.
4. Vercel tự nhận Next.js.
5. Thêm 3 Environment Variables ở trên.
6. Deploy.

Sau đó mỗi lần push lên `main`, Vercel tự build/deploy bản mới.
