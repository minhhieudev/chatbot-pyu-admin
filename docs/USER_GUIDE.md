# 📖 Hướng dẫn Sử dụng - SSE Express System

## Mục lục
1. [Giới thiệu](#giới-thiệu)
2. [Đăng nhập](#đăng-nhập)
3. [Dashboard](#dashboard)
4. [Quản lý Đơn hàng](#quản-lý-đơn-hàng)
5. [Quản lý Khách hàng](#quản-lý-khách-hàng)
6. [Quản lý Nhân viên](#quản-lý-nhân-viên)
7. [Quy trình xử lý](#quy-trình-xử-lý)
8. [Tracking](#tracking)
9. [Báo cáo Hoa hồng](#báo-cáo-hoa-hồng)
10. [Quản lý Công nợ](#quản-lý-công-nợ)

---

## Giới thiệu

Hệ thống SSE Express là giải pháp quản lý vận đơn toàn diện cho dịch vụ giao nhận quốc tế và nội địa. Hệ thống hỗ trợ:

- ✅ Quy trình 6 bước minh bạch
- ✅ Tính hoa hồng tự động
- ✅ Phân quyền chi tiết theo vai trò
- ✅ Tracking thời gian thực
- ✅ Báo cáo đa chiều

---

## Đăng nhập

### Bước 1: Truy cập hệ thống

Mở trình duyệt và truy cập: `http://localhost:3000` (hoặc domain của công ty)

### Bước 2: Nhập thông tin đăng nhập

- **Email**: Địa chỉ email được cấp
- **Mật khẩu**: Mật khẩu cá nhân

### Bước 3: Đăng nhập nhanh (Demo)

Hệ thống cung cấp chức năng đăng nhập nhanh để demo:

| Vai trò | Email | Mật khẩu | Quyền hạn |
|---------|-------|----------|-----------|
| Chủ sở hữu | hiennhan@sse.vn | admin123 | Toàn quyền |
| Admin | myvan@sse.vn | admin123 | Xem & sử dụng tất cả |
| NV Kinh doanh | sales@sse.vn | demo123 | Quản lý khách hàng, đơn hàng |
| NV Pickup | pickup@sse.vn | demo123 | Nhận hàng tại khách |
| NV Khai thác | warehouse@sse.vn | demo123 | Đóng gói, kiểm đếm |
| NV Chứng từ | documentation@sse.vn | demo123 | Xử lý chứng từ |

### Bước 4: Đăng xuất

Nhấp vào avatar ở góc trên bên phải → chọn "Đăng xuất"

---

## Dashboard

### Tính năng chính

Dashboard hiển thị tổng quan về hoạt động kinh doanh:

#### **Chỉ số KPI chính (Hàng 1)**
- **Tổng đơn hàng**: Số lượng đơn hàng tháng này
- **Doanh thu**: Tổng doanh thu tháng này
- **Hoa hồng**: Tổng hoa hồng đã tính
- **Khách hàng**: Số khách hàng hoạt động

#### **Chỉ số phụ (Hàng 2)**
- **Chờ thanh toán**: Tổng giá trị đơn hàng chưa thanh toán
- **Nợ quá hạn**: Công nợ quá hạn cần thu hồi
- **Vận đơn quốc tế**: Số vận đơn xuất/nhập khẩu
- **Vận đơn nội địa**: Số vận đơn trong nước

#### **Biểu đồ Quy trình**
Hiển thị số lượng đơn hàng đang ở từng bước:
1. Sales tiếp nhận
2. Pickup nhận hàng
3. Khai thác đóng gói
4. Sales nhập giá
5. Thanh toán
6. Xử lý chứng từ

#### **Thống kê khác**
- Top ranking nhân viên
- Quốc gia sử dụng dịch vụ nhiều nhất
- Thông báo hệ thống

---

## Quản lý Đơn hàng

### Xem danh sách đơn hàng

**Đường dẫn**: Menu bên trái → "Đơn hàng"

#### **Bộ lọc trạng thái**
- Tất cả
- Ready
- Nhận hàng
- Ready to go
- Đang phát hàng
- Hủy
- Đang chuyển hoàn
- Sự cố
- Hoàn tất

#### **Tìm kiếm**
Nhập vào ô tìm kiếm:
- Mã AWB
- REF Code
- Tên khách hàng

### Thao tác với đơn hàng

#### **Xem chi tiết**
1. Tìm đơn hàng cần xem
2. Nhấp vào dòng đơn hàng hoặc nút "👁️" (Eye icon)
3. Xem thông tin đầy đủ trong popup

#### **Chọn nhiều đơn**
1. Tick checkbox ở cột đầu tiên
2. Hoặc tick checkbox ở header để chọn tất cả
3. Số đơn đã chọn hiển thị ở góc trên bên phải

#### **Quick Actions**
Các nút thao tác nhanh trên header:
- ➕ **Tạo đơn**: Tạo đơn hàng mới
- 🗑️ **Xóa**: Xóa đơn hàng đã chọn
- 💾 **Lưu**: Lưu thay đổi
- 📥 **Tải xuống**: Tải file đính kèm
- 💬 **Nhắn tin**: Gửi tin nhắn cho khách
- 👤 **Khách hàng**: Xem thông tin khách hàng
- 📋 **Danh sách**: Chuyển sang chế độ xem danh sách
- ↗️ **Xuất**: Xuất dữ liệu ra file

---

## Quản lý Khách hàng

### Xem danh sách khách hàng

**Đường dẫn**: Menu → "Khách hàng & Nhân sự" → "Khách hàng"

#### **Thống kê tổng quan**
- Tổng khách hàng
- Doanh nghiệp
- Hộ kinh doanh
- Cá nhân
- Đang hoạt động

### Thêm khách hàng mới

1. Nhấp nút **"Thêm khách hàng"** (góc trên bên phải)
2. Điền thông tin:

**Thông tin cơ bản:**
- Mã khách hàng (tự động)
- Loại khách hàng (Doanh nghiệp/Hộ KD/Cá nhân)
- Tên khách hàng *

**Thông tin liên hệ:**
- Người liên hệ *
- Số điện thoại * (10-11 số)
- Email * (định dạng hợp lệ)
- Địa chỉ *

**Thông tin bổ sung:**
- Nhân viên phụ trách
- Trạng thái (Hoạt động/Ngưng hoạt động)

3. Nhấp **"Thêm mới"**
4. Thông báo thành công hiển thị ở đầu trang

### Chỉnh sửa khách hàng

1. Tìm khách hàng cần sửa
2. Nhấp nút **✏️** (Edit) ở cột "Thao tác"
3. Cập nhật thông tin
4. Nhấp **"Cập nhật"**

### Xóa khách hàng

1. Tìm khách hàng cần xóa
2. Nhấp nút **🗑️** (Trash) ở cột "Thao tác"
3. Xác nhận xóa trong popup
4. Khách hàng sẽ bị xóa vĩnh viễn

⚠️ **Cảnh báo**: Không thể khôi phục sau khi xóa!

### Xem chi tiết khách hàng

1. Nhấp nút **👁️** (Eye) ở cột "Thao tác"
2. Popup hiển thị:
   - Thông tin cơ bản
   - Liên hệ
   - Thống kê giao dịch (Tổng đơn, Doanh số, Công nợ)

### Lọc nâng cao

1. Nhấp nút **"Lọc"**
2. Chọn các tiêu chí:
   - Loại khách hàng
   - Trạng thái
   - Ngày tạo (từ - đến)
   - Doanh số (min - max)
3. Nhấp **"Áp dụng"**

### Xuất dữ liệu

1. Lọc khách hàng cần xuất (nếu cần)
2. Nhấp nút **"Xuất Excel"**
3. File CSV sẽ được tải về với tên: `danh_sach_khach_hang_YYYY-MM-DD.csv`

---

## Quản lý Nhân viên

### Xem danh sách nhân viên

**Đường dẫn**: Menu → "Khách hàng & Nhân sự" → "Nhân viên"

#### **Vai trò trong hệ thống**

| Vai trò | Mô tả | Hoa hồng |
|---------|-------|----------|
| NV Kinh doanh | Tiếp nhận, báo giá | % Doanh số |
| NV Pickup | Nhận hàng tại khách | 5.000đ/đơn |
| NV Khai thác | Đóng gói, kiểm đếm | 10-15k/đơn |
| NV Chứng từ | Xử lý chứng từ | 5.000đ/bill QT |
| IT Quản trị | Quản lý kỹ thuật | 3k/1.5k/bill |
| Admin | Quản trị viên | - |
| Chủ sở hữu | Toàn quyền | - |

### Bộ lọc vai trò

- Tất cả
- Kinh doanh
- Pickup
- Khai thác
- Chứng từ

### Xem chi tiết nhân viên

1. Nhấp nút **👁️** (Eye)
2. Popup hiển thị:
   - Thông tin cơ bản
   - Liên hệ
   - Hiệu suất làm việc (Tổng đơn, Hoa hồng)
   - Quyền hạn

---

## Quy trình xử lý

### Sơ đồ 6 bước

**Đường dẫn**: Menu → "Tổng quan" → "Quy trình xử lý"

#### **Bước 1: Sales tiếp nhận**
- NVKD nhập thông tin khách hàng
- Hệ thống tạo Mã K/H
- Chuyển sang Điều hành

#### **Bước 2: Pickup nhận hàng**
- NV Pickup nhận nhiệm vụ
- Đi nhận hàng tại khách
- Cập nhật "Đã nhận về kho"
- **Hoa hồng**: 5.000đ/đơn

#### **Bước 3: Khai thác đóng gói**
- Đóng gói, kiểm đếm
- Chụp hình kiện hàng
- Cập nhật trọng lượng, kích thước
- **Hoa hồng**: 10k (<20kg) / 15k (≥21kg)

#### **Bước 4: Sales nhập giá**
- NVKD nhập giá bán
- Tạo link báo giá
- Gửi cho khách hàng

#### **Bước 5: Khách thanh toán**
- Khách thanh toán qua link
- Hệ thống tự động cập nhật
- **Doanh số** ghi nhận cho NVKD

#### **Bước 6: Xử lý chứng từ**
- Gắn Bill hãng vận chuyển
- Gửi link Bill cho khách
- **Hoa hồng**: 5.000đ/bill quốc tế

### Theo dõi đơn hàng

Mỗi đơn hàng hiển thị:
- Progress bar
- Thông tin từng bước
- Nhân viên phụ trách
- Thời gian hoàn thành
- Hoa hồng từng bước

### Bộ lọc theo bước

Nhấp vào các nút "Bước 1-7" để lọc đơn hàng đang ở bước đó.

---

## Tracking

### Tra cứu công khai

**Đường dẫn**: Menu → "Quản lý đơn hàng" → "Tracking"

hoặc truy cập trực tiếp: `/tracking`

#### **Không cần đăng nhập!**

### Cách sử dụng

1. Nhập mã tra cứu:
   - **AWB**: Mã vận đơn quốc tế (VD: AWB123456)
   - **REF Code**: Mã tham chiếu nội địa (VD: REF-2024-001)

2. Nhấp nút **"Tra cứu"**

3. Kết quả hiển thị:
   - Thông tin vận đơn (AWB, REF, Status)
   - Thông tin kiện hàng (Trọng lượng, Số kiện, Dịch vụ)
   - Thông tin người gửi
   - Thông tin người nhận
   - **Timeline** hành trình 8 bước

### Timeline hành trình

Mỗi bước hiển thị:
- ✅ **Hoàn thành** (màu xanh)
- 🔵 **Đang xử lý** (màu xanh dương, có vòng sáng)
- ⚪ **Chờ xử lý** (màu xám)

Thông tin mỗi bước:
- Tên bước
- Mô tả
- Nhân viên xử lý (nếu có)
- Thời gian
- Ghi chú

---

## Báo cáo Hoa hồng

### Xem báo cáo

**Đường dẫn**: Menu → "Tài chính" → "Báo cáo hoa hồng"

### Chọn kỳ báo cáo

- Tháng này
- Tháng trước
- Quý này
- Năm nay

### Tổng quan

**Thẻ tổng hợp:**
- Tổng hoa hồng (tất cả bộ phận)
- Hoa hồng Kinh doanh
- Hoa hồng Pickup
- Hoa hồng Khai thác
- Hoa hồng Chứng từ
- Hoa hồng IT

### Bảng chi tiết

Hiển thị cho từng nhân viên:
- Mã NV
- Tên nhân viên
- Bộ phận
- Vai trò
- Số đơn xử lý
- **Hoa hồng** (in đậm, màu xanh)
- Chi tiết tính

### Cơ chế hoa hồng

| Bộ phận | Cách tính | Ghi chú |
|---------|-----------|---------|
| Pickup | 5.000đ/đơn | Khi hoàn thành |
| Khai thác | 10k (<20kg) / 15k (≥21kg) | Theo trọng lượng |
| Sales | % Doanh số | Khi thanh toán |
| Chứng từ | 5.000đ/bill | Chỉ quốc tế |
| IT | 3k (QT) / 1.5k (NĐ) | Bảo trì |

### Bộ lọc

Nhấp các nút để lọc theo bộ phận:
- Tất cả
- Kinh doanh
- Pickup
- Khai thác
- Chứng từ

### Xuất báo cáo

Nhấp nút **"Xuất báo cáo"** để tải file Excel.

---

## Quản lý Công nợ

### Xem công nợ

**Đường dẫn**: Menu → "Tài chính" → "Quản lý công nợ"

### Thống kê

**4 chỉ số chính (màu gradient):**
- **Tổng doanh số** (xanh dương)
- **Đã thu** (xanh lá)
- **Công nợ** (vàng)
- **Quá hạn** (đỏ)

### Bộ lọc trạng thái

- Tất cả
- **Thanh toán tốt** (không nợ)
- **Có công nợ** (chưa thu hết)
- **Quá hạn** (cần ưu tiên thu hồi)

### Bảng chi tiết

Hiển thị từng khách hàng:
- Mã KH
- Tên khách hàng
- Tổng doanh số
- Đã thu (màu xanh)
- Công nợ (màu vàng/xám)
- Quá hạn (màu đỏ/xám)
- Lần thanh toán cuối
- Trạng thái

### Xem chi tiết công nợ

1. Nhấp nút **👁️** (Eye)
2. Popup hiển thị:
   - Tổng quan (4 chỉ số)
   - **Lịch sử đơn hàng** với từng đơn:
     - Mã AWB
     - Số tiền
     - Đã thanh toán
     - Hạn thanh toán
     - Ngày thanh toán
     - Trạng thái

### Ghi nhận thanh toán

1. Mở chi tiết khách hàng
2. Nhấp nút **"Ghi nhận thanh toán"**
3. Nhập thông tin thanh toán
4. Công nợ sẽ được cập nhật

---

## Tips & Tricks

### 💡 Mẹo sử dụng

1. **Tìm kiếm nhanh**: Sử dụng Ctrl+F trong trang để tìm nhanh
2. **Xuất dữ liệu**: Xuất Excel để phân tích offline
3. **Lọc nâng cao**: Kết hợp nhiều tiêu chí lọc để tìm chính xác
4. **Bulk actions**: Chọn nhiều để thao tác hàng loạt
5. **Keyboard shortcuts**: 
   - `Esc`: Đóng popup
   - `Enter`: Submit form
   - `Tab`: Di chuyển giữa các field

### ⚠️ Lưu ý

- Không chia sẻ mật khẩu với người khác
- Đăng xuất khi rời khỏi máy tính
- Kiểm tra kỹ trước khi xóa
- Backup dữ liệu định kỳ
- Liên hệ IT nếu gặp lỗi

### 📞 Hỗ trợ

- **Email**: support@sse.vn
- **Hotline**: (028) XXXX XXXX
- **Live Chat**: Góc dưới bên phải màn hình

---

**Phiên bản**: 1.0.0  
**Cập nhật lần cuối**: 31/10/2024  
**© 2024 Saigon Speed Express. All rights reserved.**

