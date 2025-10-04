# Role & Permission for E-commerce API

| Endpoint                | Method | Admin | User | Seller | Mô tả quyền                |
|-------------------------|--------|-------|------|--------|----------------------------|
| /api/products           | GET    | ✅    | ✅   | ✅     | Xem danh sách sản phẩm     |
| /api/products           | POST   | ✅    | ❌   | ❌     | Thêm sản phẩm              |
| /api/products/:id       | PUT    | ✅    | ❌   | ❌     | Sửa sản phẩm               |
| /api/products/:id       | DELETE | ✅    | ❌   | ❌     | Xóa sản phẩm               |
| /api/categories         | GET    | ✅    | ✅   | ✅     | Xem danh mục               |
| /api/categories         | POST   | ✅    | ❌   | ❌     | Thêm danh mục              |
| /api/users/:id          | GET    | ✅    | ✅   | ❌     | Admin xem mọi user, user chỉ xem chính mình |
| /api/users/:id          | PUT    | ✅    | ✅   | ❌     | Admin sửa mọi user, user chỉ sửa chính mình |
| /api/users/:id          | DELETE | ✅    | ❌   | ❌     | Chỉ admin xóa user         |
| /api/sellers            | GET    | ✅    | ✅   | ✅     | Xem danh sách seller       |
| /api/sellers            | POST   | ✅    | ❌   | ❌     | Thêm seller                |