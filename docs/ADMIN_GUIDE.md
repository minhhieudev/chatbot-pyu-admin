# 🔐 Hướng dẫn Quản trị - SSE Express System

## Mục lục
1. [Tổng quan hệ thống](#tổng-quan-hệ-thống)
2. [Phân quyền & Bảo mật](#phân-quyền--bảo-mật)
3. [Quản lý Người dùng](#quản-lý-người-dùng)
4. [Quy trình nghiệp vụ](#quy-trình-nghiệp-vụ)
5. [Giám sát & Báo cáo](#giám-sát--báo-cáo)
6. [Backup & Khôi phục](#backup--khôi-phục)
7. [Xử lý sự cố](#xử-lý-sự-cố)

---

## Tổng quan hệ thống

### Kiến trúc hệ thống

```
┌─────────────────────────────────────────────┐
│           Frontend (Next.js)                │
│  - Web App (Responsive)                     │
│  - Public Tracking Page                     │
└──────────────┬──────────────────────────────┘
               │
               ↓
┌──────────────────────────────────────────────┐
│         Backend API (FastAPI/Laravel)        │
│  - Authentication & Authorization            │
│  - Business Logic                            │
│  - Commission Calculation                    │
└──────────────┬───────────────────────────────┘
               │
               ↓
┌──────────────────────────────────────────────┐
│           Database (MySQL/PostgreSQL)        │
│  - Customer Data                             │
│  - Order Management                          │
│  - Transaction History                       │
└──────────────────────────────────────────────┘
```

### Tech Stack

**Frontend:**
- Next.js 15.3.1 (React 18.3.1)
- HeroUI Components
- TailwindCSS 4.1.11
- Zustand (State Management)
- React Query (Data Fetching)

**Planned Backend:**
- FastAPI (Python) hoặc Laravel (PHP)
- MySQL/PostgreSQL
- JWT Authentication
- RESTful API

---

## Phân quyền & Bảo mật

### Hệ thống vai trò (RBAC)

#### **1. Chủ sở hữu (Owner) - Hiển Nhân**

**Quyền hạn:**
- ✅ Toàn quyền hệ thống (Full Access)
- ✅ Xóa dữ liệu
- ✅ Sửa dữ liệu
- ✅ Phê duyệt quyền truy cập
- ✅ Thêm/xóa Admin
- ✅ Xem tất cả báo cáo tài chính
- ✅ Cấu hình hệ thống

**Trách nhiệm:**
- Phê duyệt mọi thay đổi quan trọng
- Xác nhận đăng nhập cấp quản lý qua email/SMS
- Giám sát toàn bộ hoạt động

#### **2. Admin - Mỹ Vân**

**Quyền hạn:**
- ✅ Xem toàn bộ hệ thống
- ✅ Sử dụng tất cả chức năng
- ❌ KHÔNG được xóa dữ liệu
- ❌ KHÔNG được sửa dữ liệu quan trọng

**Trách nhiệm:**
- Hỗ trợ vận hành hàng ngày
- Giám sát quy trình
- Báo cáo cho Owner

#### **3. NV Kinh doanh (Sales)**

**Quyền hạn:**
- ✅ Xem thông tin khách hàng của mình
- ✅ Tạo đơn hàng
- ✅ Nhập giá bán
- ✅ Tạo link báo giá
- ❌ KHÔNG xem giá vốn
- ❌ KHÔNG biết đối tác vận chuyển

**Phạm vi:**
- Chỉ xem dữ liệu khách hàng được phân công
- Không xem dữ liệu Sales khác

#### **4. NV Pickup**

**Quyền hạn:**
- ✅ Xem danh sách nhiệm vụ Pickup
- ✅ Xem tên & địa chỉ khách hàng
- ✅ Cập nhật trạng thái nhận hàng
- ❌ KHÔNG xem cước phí
- ❌ KHÔNG xem thông tin chi tiết khách hàng

**Phạm vi:**
- Chỉ xem nhiệm vụ được phân công
- Không xem nhiệm vụ NV khác

#### **5. NV Khai thác (Warehouse)**

**Quyền hạn:**
- ✅ Xem danh sách hàng cần đóng gói
- ✅ Cập nhật trọng lượng, kích thước
- ✅ Upload hình ảnh kiện hàng
- ❌ KHÔNG xem cước phí
- ❌ KHÔNG xem chi tiết khách hàng

**Phạm vi:**
- Chỉ xem hàng đã được Pickup về kho
- Không xem giá trị đơn hàng

#### **6. NV Chứng từ / Điều hành**

**Quyền hạn:**
- ✅ Xem thông tin gửi - nhận
- ✅ Gắn Bill hãng vận chuyển
- ✅ Gửi link tracking
- ❌ KHÔNG xem cước bán
- ❌ KHÔNG xem lợi nhuận

**Phạm vi:**
- Xem đơn hàng đã thanh toán
- Không xem giá bán cho khách

#### **7. IT Quản trị**

**Quyền hạn:**
- ✅ Quản lý kỹ thuật hệ thống
- ✅ Xem log hệ thống
- ✅ Cấu hình tích hợp
- ✅ Backup & Restore
- ❌ KHÔNG xem thông tin tài chính
- ❌ KHÔNG xem thông tin khách hàng nhạy cảm

**Trách nhiệm:**
- Bảo trì hệ thống
- Xử lý lỗi kỹ thuật
- Tích hợp API

### Ma trận phân quyền

| Chức năng | Owner | Admin | Sales | Pickup | Warehouse | Documentation | IT |
|-----------|-------|-------|-------|--------|-----------|---------------|-----|
| Dashboard | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Quản lý Khách hàng | ✅ | ✅ | ✅ (own) | ❌ | ❌ | ❌ | ❌ |
| Quản lý Đơn hàng | ✅ | ✅ | ✅ | ✅ (task) | ✅ (task) | ✅ | ❌ |
| Quản lý Vận đơn | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| Quản lý Nhân viên | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Báo cáo Hoa hồng | ✅ | ✅ | ✅ (own) | ✅ (own) | ✅ (own) | ✅ (own) | ✅ (own) |
| Quản lý Công nợ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Xem giá vốn | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Xóa dữ liệu | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

### Quy trình bảo mật

#### **Đăng nhập**
1. Email + Password (hashed với bcrypt)
2. JWT Token (expire 24h)
3. Refresh Token (expire 7 days)

#### **Xác thực 2 yếu tố (2FA) - cho Admin**
1. Đăng nhập thông thường
2. Gửi OTP qua email chủ sở hữu
3. Gửi SMS qua số điện thoại chủ sở hữu
4. Owner phê duyệt
5. Cấp quyền truy cập

#### **Session Management**
- Auto logout sau 30 phút không hoạt động
- Không cho phép đăng nhập đồng thời trên nhiều thiết bị
- Log tất cả hoạt động đăng nhập

#### **Audit Log**
Ghi nhận mọi thao tác:
- User ID
- Action (create/update/delete)
- Resource (customers/orders/staff)
- Timestamp
- IP Address
- User Agent

---

## Quản lý Người dùng

### Thêm người dùng mới

#### **Bước 1: Tạo tài khoản**
```sql
-- Ví dụ SQL (thực tế sẽ qua giao diện)
INSERT INTO users (email, name, role, department, status)
VALUES ('newstaff@sse.vn', 'Nguyễn Văn A', 'sales', 'Kinh doanh', 'pending_approval');
```

#### **Bước 2: Owner phê duyệt**
1. Hệ thống gửi email/SMS cho Owner
2. Owner đăng nhập và phê duyệt
3. Hệ thống gửi email chứa link kích hoạt cho user mới

#### **Bước 3: User kích hoạt**
1. User click link trong email
2. Đặt mật khẩu
3. Đăng nhập lần đầu

### Vô hiệu hóa tài khoản

**Khi nhân viên nghỉ việc:**
1. Đăng nhập với quyền Owner/Admin
2. Vào "Quản lý Nhân viên"
3. Tìm nhân viên cần vô hiệu hóa
4. Chọn "Sửa" → Đổi trạng thái thành "Inactive"
5. Tài khoản sẽ không đăng nhập được

**Không nên xóa tài khoản** vì:
- Cần giữ lịch sử hoa hồng
- Cần giữ audit log
- Cần cho báo cáo sau này

### Reset mật khẩu

#### **User quên mật khẩu:**
1. Click "Quên mật khẩu" ở trang login
2. Nhập email
3. Hệ thống gửi OTP qua email
4. Nhập OTP và đặt mật khẩu mới

#### **Admin reset cho user:**
1. Owner/Admin vào "Quản lý Nhân viên"
2. Chọn nhân viên
3. Click "Reset mật khẩu"
4. Hệ thống gửi link reset cho user

---

## Quy trình nghiệp vụ

### Quy trình 6 bước chi tiết

#### **Bước 1: Sales tiếp nhận (STEP 1)**

**Nhiệm vụ:**
1. Khách hàng liên hệ (phone/email/zalo)
2. Sales nhập thông tin vào hệ thống:
   - Tên công ty/cá nhân
   - Người liên hệ
   - Địa chỉ
   - Email, điện thoại
3. Hệ thống tự động tạo **Mã K/H** (VD: KH0001)
4. Sales chuyển thông tin sang Điều hành

**Phân quyền:**
- Sales chỉ xem khách hàng của mình
- Admin/Owner xem tất cả

**Hoa hồng:** Chưa tính (tính ở bước 5)

#### **Bước 2: Pickup nhận hàng (STEP 2)**

**Nhiệm vụ:**
1. Điều hành phân công Pickup theo khu vực
2. Pickup xem danh sách nhiệm vụ trên app/web
3. Đi nhận hàng tại địa chỉ khách
4. Check hàng hóa
5. Cập nhật trạng thái: "Đã nhận về kho"

**Phân quyền:**
- Pickup CHỈ xem:
  - Tên khách hàng
  - Địa chỉ nhận hàng
  - Số điện thoại liên hệ
- KHÔNG xem:
  - Giá trị đơn hàng
  - Cước phí
  - Thông tin nhạy cảm khác

**Hoa hồng:** 5.000đ/đơn (tính khi hoàn tất)

#### **Bước 3: Khai thác đóng gói (STEP 3)**

**Nhiệm vụ:**
1. Nhận hàng từ Pickup
2. Kiểm đếm số lượng kiện
3. Đóng gói chuyên nghiệp
4. Cân trọng lượng (kg)
5. Đo kích thước (L x W x H cm)
6. Chụp hình kiện hàng (3-5 ảnh)
7. Upload lên hệ thống
8. Cập nhật trạng thái: "Đã đóng gói"

**Phân quyền:**
- Khai thác CHỈ xem:
  - Tên khách hàng (không đầy đủ)
  - Mã đơn hàng
- KHÔNG xem:
  - Giá trị
  - Cước phí
  - Địa chỉ người nhận

**Hoa hồng:**
- < 20kg: 10.000đ/đơn
- ≥ 21kg: 15.000đ/đơn
- Tính khi hoàn tất

**Validation:**
- Không cho phép Sales sửa trọng lượng/kích thước sau khi Khai thác nhập

#### **Bước 4: Sales nhập giá bán (STEP 4)**

**Nhiệm vụ:**
1. Sales xem thông tin từ Khai thác
2. Tra bảng giá theo:
   - Quốc gia đích
   - Trọng lượng
   - Dịch vụ (Express/Economy)
3. Tính cước bán (có thể thương lượng)
4. Chọn đối tác vận chuyển (DHL/FedEx/UPS)
5. Nhập giá bán vào hệ thống
6. Hệ thống tạo **Link báo giá**
7. Gửi link cho khách qua:
   - Email
   - SMS
   - Zalo/WhatsApp

**Phân quyền:**
- Sales KHÔNG xem:
  - Giá vốn
  - Tên đối tác vận chuyển (chỉ xem "Dịch vụ Express")

**Validation:**
- Không cho phép sửa trọng lượng/kích thước
- Chỉ nhập giá bán

#### **Bước 5: Khách thanh toán (STEP 5)**

**Nhiệm vụ:**
1. Khách nhận link báo giá
2. Xem chi tiết:
   - Trọng lượng
   - Kích thước
   - Hình ảnh kiện hàng
   - Cước phí
   - Thời gian dự kiến
3. Thanh toán qua:
   - Chuyển khoản
   - Tiền mặt
   - Credit card
4. Hệ thống xác nhận thanh toán
5. Cập nhật trạng thái: "Đã thanh toán"

**Ghi nhận doanh số:**
- Tự động ghi nhận cho Sales phụ trách
- Hiển thị trong báo cáo hoa hồng

**Email tự động:**
- Gửi xác nhận thanh toán cho khách
- CC cho Sales phụ trách
- Thông báo cho bộ phận Chứng từ

#### **Bước 6: Xử lý chứng từ (STEP 6)**

**Nhiệm vụ:**
1. Nhận thông báo có đơn mới
2. Tạo vận đơn với đối tác:
   - Đăng nhập portal DHL/FedEx/UPS
   - Tạo shipment
   - Lấy AWB/Tracking number
3. Gắn Bill hãng với Bill nội bộ:
   - Bill hãng (PDF từ DHL)
   - Bill nội bộ (PDF nội bộ SSE)
4. Gửi cho khách:
   - Email có đính kèm 2 bill
   - Link tracking
5. Cập nhật tracking định kỳ
6. Gửi notification khi có thay đổi

**Phân quyền:**
- Chứng từ CHỈ xem:
  - Thông tin gửi - nhận
  - Tracking status
- KHÔNG xem:
  - Cước bán cho khách
  - Lợi nhuận

**Hoa hồng:**
- 5.000đ/bộ chứng từ (CHỈ quốc tế)
- Thư từ, nội địa: KHÔNG tính

### SOP (Standard Operating Procedures)

#### **SOP 001: Xử lý đơn hàng chậm**

**Kịch bản:** Đơn hàng застрял ở một bước quá 24h

**Quy trình:**
1. Hệ thống tự động cảnh báo (màu đỏ)
2. Điều hành gọi điện cho nhân viên phụ trách
3. Yêu cầu giải trình
4. Nếu không xử lý trong 2h → Leo thang Admin
5. Admin can thiệp trực tiếp

#### **SOP 002: Khách hàng khiếu nại**

**Quy trình:**
1. Sales ghi nhận khiếu nại
2. Tạo ticket trong hệ thống
3. Phân loại:
   - **Cao** (hàng hư, mất): Báo Owner ngay
   - **Trung bình** (chậm): Xử lý trong ngày
   - **Thấp** (thắc mắc): Xử lý trong 24h
4. Follow up và close ticket

#### **SOP 003: Backup dữ liệu**

**Tần suất:**
- **Hàng ngày** (23:00): Full backup database
- **Mỗi 4h**: Incremental backup
- **Hàng tuần** (CN): Backup ra external storage

**Lưu trữ:**
- 30 bản gần nhất
- Sau 30 ngày → Archive sang cold storage

---

## Giám sát & Báo cáo

### Dashboard Admin

**KPI cần theo dõi:**
1. **Số đơn hàng**: Theo ngày/tuần/tháng
2. **Doanh thu**: Real-time
3. **Tỷ lệ hoàn tất**: % đơn hàng complete/total
4. **Thời gian xử lý TB**: Mỗi bước mất bao lâu
5. **Đơn chậm**: Số đơn quá 24h/48h
6. **Khiếu nại**: Số ticket open/closed

### Báo cáo định kỳ

#### **Báo cáo ngày (Daily Report)**
- Tổng đơn hàng
- Doanh thu
- Công nợ phát sinh
- Đơn chậm
- Gửi email 8:00 sáng hôm sau

#### **Báo cáo tuần (Weekly Report)**
- Tổng hợp cả tuần
- So sánh với tuần trước
- Top khách hàng
- Top nhân viên
- Gửi email Thứ 2 hàng tuần

#### **Báo cáo tháng (Monthly Report)**
- Tổng hợp cả tháng
- Hoa hồng từng bộ phận
- ROI
- Forecast tháng sau
- Gửi email ngày 1 hàng tháng

### Log & Audit Trail

**Nội dung ghi log:**
```json
{
  "timestamp": "2024-10-31T10:30:00Z",
  "user_id": "USR001",
  "user_name": "Trần Thị B",
  "action": "UPDATE",
  "resource": "customers",
  "resource_id": "KH001",
  "changes": {
    "phone": {
      "old": "0901234567",
      "new": "0912345678"
    }
  },
  "ip_address": "192.168.1.100",
  "user_agent": "Mozilla/5.0..."
}
```

**Lưu trữ:**
- Database: 3 tháng gần nhất
- Archive: 2 năm
- Sau 2 năm: Xóa (tuân thủ GDPR)

---

## Backup & Khôi phục

### Chiến lược Backup

#### **Backup Database**
```bash
# Hàng ngày 23:00
mysqldump -u root -p sse_database > backup_$(date +%Y%m%d).sql
gzip backup_$(date +%Y%m%d).sql

# Upload lên S3
aws s3 cp backup_$(date +%Y%m%d).sql.gz s3://sse-backups/
```

#### **Backup Files (uploads)**
```bash
# Backup thư mục uploads
tar -czf uploads_$(date +%Y%m%d).tar.gz /var/www/uploads/
aws s3 cp uploads_$(date +%Y%m%d).tar.gz s3://sse-backups/uploads/
```

### Khôi phục dữ liệu

#### **Khôi phục Database**
```bash
# Tải backup từ S3
aws s3 cp s3://sse-backups/backup_20241031.sql.gz .

# Giải nén
gunzip backup_20241031.sql.gz

# Khôi phục
mysql -u root -p sse_database < backup_20241031.sql
```

#### **Disaster Recovery Plan**

**RTO (Recovery Time Objective):** 4 giờ  
**RPO (Recovery Point Objective):** 4 giờ

**Kịch bản 1: Server down**
1. Chuyển traffic sang backup server
2. Thời gian: 15 phút
3. Dữ liệu mất: 0

**Kịch bản 2: Database corrupt**
1. Stop application
2. Restore từ backup gần nhất
3. Replay transaction logs
4. Thời gian: 2-4 giờ
5. Dữ liệu mất: tối đa 4 giờ

---

## Xử lý sự cố

### Sự cố thường gặp

#### **1. User không đăng nhập được**

**Triệu chứng:** Báo lỗi "Invalid credentials"

**Nguyên nhân:**
- Sai mật khẩu
- Tài khoản bị khóa
- Session expired

**Giải pháp:**
1. Kiểm tra caps lock
2. Reset mật khẩu
3. Kiểm tra status tài khoản trong database
4. Clear browser cache

#### **2. Hệ thống chậm**

**Triệu chứng:** Thời gian load trang > 5s

**Nguyên nhân:**
- Query database chậm
- Traffic cao
- Server quá tải

**Giải pháp:**
1. Check CPU/RAM usage
2. Analyze slow query log
3. Scale up server nếu cần
4. Enable caching

#### **3. Email không gửi được**

**Triệu chứng:** Khách không nhận email

**Nguyên nhân:**
- SMTP config sai
- Email vào spam
- Quota exceeded

**Giải pháp:**
1. Kiểm tra SMTP settings
2. Kiểm tra SPF/DKIM records
3. Kiểm tra email queue
4. Liên hệ email provider

### Contact Escalation

**Level 1 - Help Desk:**
- Email: support@sse.vn
- Response: 1 giờ

**Level 2 - IT Team:**
- Email: it@sse.vn
- Phone: (028) XXXX XXXX
- Response: 30 phút

**Level 3 - Owner:**
- Email: hiennhan@sse.vn
- Phone: 09XX XXX XXX
- Response: 15 phút

---

## Checklist Hàng ngày

**Buổi sáng (8:00):**
- [ ] Kiểm tra server status
- [ ] Xem dashboard tổng quan
- [ ] Kiểm tra backup đêm qua
- [ ] Đọc daily report
- [ ] Check đơn hàng chậm

**Buổi chiều (16:00):**
- [ ] Review tickets mới
- [ ] Follow up đơn hàng quan trọng
- [ ] Update trạng thái cho khách

**Cuối ngày (18:00):**
- [ ] Tổng kết công việc
- [ ] Schedule backup
- [ ] Review audit log
- [ ] Plan ngày mai

---

**Phiên bản**: 1.0.0  
**Cập nhật lần cuối**: 31/10/2024  
**© 2024 Saigon Speed Express. Tài liệu nội bộ - Mật!**

