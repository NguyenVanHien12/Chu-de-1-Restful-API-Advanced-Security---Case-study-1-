# API Endpoint Permissions

## User Endpoints

| Endpoint             | Method | Roles Allowed      | Description                |
|----------------------|--------|--------------------|----------------------------|
| /api/register        | POST   | Public             | Đăng ký tài khoản mới      |
| /api/login           | POST   | Public             | Đăng nhập, nhận JWT        |

## Product Endpoints

| Endpoint             | Method | Roles Allowed      | Description                |
|----------------------|--------|--------------------|----------------------------|
| /api/products        | GET    | user, admin, seller| Xem danh sách sản phẩm     |
| /api/products/:id    | GET    | user, admin, seller| Xem chi tiết sản phẩm      |
| /api/products        | POST   | admin, seller      | Thêm sản phẩm mới          |
| /api/products/:id    | PUT    | admin, seller      | Sửa thông tin sản phẩm     |
| /api/products/:id    | DELETE | admin, seller      | Xóa sản phẩm               |

## Category Endpoints

| Endpoint             | Method | Roles Allowed      | Description                |
|----------------------|--------|--------------------|----------------------------|
| /api/categories      | GET    | user, admin, seller| Xem danh sách danh mục     |
| /api/categories      | POST   | admin              | Thêm danh mục mới          |
| /api/categories/:id  | PUT    | admin              | Sửa danh mục               |
| /api/categories/:id  | DELETE | admin              | Xóa danh mục               |

## Seller Endpoints

| Endpoint             | Method | Roles Allowed      | Description                |
|----------------------|--------|--------------------|----------------------------|
| /api/sellers         | GET    | admin              | Xem danh sách seller       |
| /api/sellers         | POST   | admin              | Thêm seller mới            |
| /api/sellers/:id     | PUT    | admin              | Sửa thông tin seller       |
| /api/sellers/:id     | DELETE | admin              | Xóa seller                 |