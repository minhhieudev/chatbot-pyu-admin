// Export utilities for Excel and PDF

export const exportToExcel = (data, filename = "export") => {
  if (!data || data.length === 0) {
    alert("Không có dữ liệu để xuất");

    return;
  }

  // Convert data to CSV format
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          let cell = row[header];

          // Handle nested objects
          if (typeof cell === "object" && cell !== null) {
            cell = JSON.stringify(cell);
          }
          // Escape commas and quotes
          if (typeof cell === "string") {
            cell = cell.replace(/"/g, '""');
            if (
              cell.includes(",") ||
              cell.includes('"') ||
              cell.includes("\n")
            ) {
              cell = `"${cell}"`;
            }
          }

          return cell;
        })
        .join(","),
    ),
  ].join("\n");

  // Add BOM for UTF-8 Excel compatibility
  const BOM = "\uFEFF";
  const blob = new Blob([BOM + csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `${filename}_${new Date().toISOString().slice(0, 10)}.csv`,
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = (data, title = "Báo cáo", filename = "report") => {
  // For now, just show alert - would need a PDF library like jsPDF
  alert(
    "Chức năng xuất PDF đang được phát triển. Vui lòng sử dụng xuất Excel.",
  );

  // TODO: Implement with jsPDF when needed
  // const doc = new jsPDF();
  // doc.text(title, 10, 10);
  // ...
};

// Format data for export
export const formatCustomersForExport = (customers) => {
  return customers.map((customer) => ({
    "Mã KH": customer.code,
    "Tên khách hàng": customer.name,
    "Loại KH":
      customer.type === "enterprise"
        ? "Doanh nghiệp"
        : customer.type === "business"
          ? "Hộ KD"
          : "Cá nhân",
    "Người liên hệ": customer.contact,
    "Số điện thoại": customer.phone,
    Email: customer.email,
    "Địa chỉ": customer.address,
    "NV phụ trách": customer.salesPerson,
    "Tổng đơn hàng": customer.totalOrders,
    "Doanh số": customer.totalRevenue,
    "Công nợ": customer.debt,
    "Trạng thái":
      customer.status === "active" ? "Hoạt động" : "Ngưng hoạt động",
  }));
};

export const formatStaffForExport = (staff) => {
  return staff.map((s) => ({
    "Mã NV": s.code,
    "Tên nhân viên": s.name,
    "Vai trò": s.role,
    "Bộ phận": s.department,
    "Số điện thoại": s.phone,
    Email: s.email,
    "Số đơn xử lý": s.totalOrders,
    "Hoa hồng": s.commission,
    "Trạng thái": s.status === "active" ? "Đang làm việc" : "Nghỉ việc",
  }));
};

export const formatOrdersForExport = (orders) => {
  return orders.map((order) => ({
    "Mã AWB": order.awb,
    "REF Code": order.refCode,
    "Khách hàng": order.carrier?.name || "",
    "Người gửi": order.sender?.company || "",
    "Người nhận": order.receiver?.company || "",
    "Địa chỉ nhận": order.receiver?.address || "",
    "Trạng thái": order.statusLabel,
    "Ngày tạo": order.createdAt,
  }));
};

export const formatCommissionForExport = (commissionData) => {
  return commissionData.map((data) => ({
    "Mã NV": data.code,
    "Tên nhân viên": data.name,
    "Vai trò": data.role,
    "Bộ phận": data.department,
    "Số đơn": data.ordersCompleted,
    "Hoa hồng": data.commission,
    "Chi tiết": data.details,
  }));
};
