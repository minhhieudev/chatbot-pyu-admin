/**
 * Predefined toast messages for common actions
 * Quản lý tập trung tất cả các thông báo toast trong ứng dụng
 */

// Predefined toast messages for common actions
export const toastMessages = {
  // Auth
  loginSuccess: "Đăng nhập thành công!",
  loginError: "Đăng nhập thất bại",
  logoutSuccess: "Đăng xuất thành công!",
  registerSuccess: "Đăng ký thành công!",
  registerError: "Đăng ký thất bại. Vui lòng thử lại.",

  // CRUD - Orders
  orderCreated: "Tạo đơn hàng thành công!",
  orderUpdated: "Cập nhật đơn hàng thành công!",
  orderDeleted: "Xóa đơn hàng thành công!",
  orderCreateError: "Không thể tạo đơn hàng. Vui lòng thử lại",
  orderUpdateError: "Không thể cập nhật đơn hàng. Vui lòng thử lại",
  orderDeleteError: "Không thể xóa đơn hàng. Vui lòng thử lại",
  ordersFetchError: "Không thể tải danh sách đơn hàng. Vui lòng thử lại",

  // CRUD - Users
  userCreated: "Tạo người dùng thành công!",
  userUpdated: "Cập nhật người dùng thành công!",
  userDeleted: "Xóa người dùng thành công!",
  userCreateError: "Không thể tạo người dùng. Vui lòng thử lại",
  userUpdateError: "Không thể cập nhật người dùng. Vui lòng thử lại",
  userDeleteError: "Không thể xóa người dùng. Vui lòng thử lại",
  usersFetchError: "Không thể tải danh sách người dùng. Vui lòng thử lại",

  // CRUD - Projects
  projectCreated: "Tạo dự án thành công!",
  projectUpdated: "Cập nhật dự án thành công!",
  projectDeleted: "Xóa dự án thành công!",
  projectCreateError: "Không thể tạo dự án. Vui lòng thử lại",
  projectUpdateError: "Không thể cập nhật dự án. Vui lòng thử lại",
  projectDeleteError: "Không thể xóa dự án. Vui lòng thử lại",
  projectsFetchError: "Không thể tải danh sách dự án. Vui lòng thử lại",

  // API Keys
  apiKeyCreated: "API Key đã được tạo thành công!",
  apiKeyUpdated: "API Key đã được cập nhật!",
  apiKeyDeleted: "API Key đã được xóa!",
  apiKeyRegenerated: "API Key đã được tạo lại!",

  // Billing
  paymentSuccess: "Thanh toán thành công!",
  billingUpdated: "Thông tin thanh toán đã được cập nhật!",

  // Usage
  usageTracked: "Usage đã được ghi nhận!",
  limitUpdated: "Giới hạn sử dụng đã được cập nhật!",

  // Generic
  saved: "Đã lưu thành công!",
  deleted: "Đã xóa thành công!",
  updated: "Đã cập nhật thành công!",
  created: "Đã tạo thành công!",
  error: "Có lỗi xảy ra!",
  networkError: "Lỗi kết nối mạng!",
  unauthorized: "Bạn không có quyền thực hiện thao tác này",
  notFound: "Không tìm thấy dữ liệu",
  serverError: "Lỗi máy chủ. Vui lòng thử lại sau",
};

/**
 * Legacy function to get success message (backwards compatible)
 * @deprecated Use toastMessages directly or getMessageFromResponse
 */
export const getSuccessMessage = (action, resource) => {
  const key = `${resource}${action.charAt(0).toUpperCase() + action.slice(1)}`;

  return toastMessages[key] || toastMessages[action] || toastMessages.saved;
};

/**
 * Legacy function to get error message (backwards compatible)
 * @deprecated Use toastMessages directly or getMessageFromResponse
 */
export const getErrorMessage = (action, resource, error = null) => {
  // Đơn giản: BE có message thì lấy, không thì dùng config
  // Format: error?.response?.data?.message || toastMessages.orderCreateError
  const resourceSingular = resource.endsWith("s")
    ? resource.slice(0, -1)
    : resource;
  const errorKey = `${resourceSingular}${action.charAt(0).toUpperCase() + action.slice(1)}Error`;

  return (
    error?.response?.data?.message ||
    error?.message ||
    toastMessages[errorKey] ||
    toastMessages.error
  );
};

/**
 * Extract message from API response
 * Đơn giản: kiểm tra BE có message thì lấy, không thì null
 */
export const getMessageFromResponse = (response) => {
  if (!response) return null;

  // String
  if (typeof response === "string") return response;

  // Standard format: { success: true, message: "...", data: {...} }
  // Hoặc: { success: false, message: "...", error: {...} }
  if (response.message) return response.message;

  // Axios error format: { response: { data: { message: "..." } } }
  if (response.response?.data?.message) return response.response.data.message;

  return null;
};

/**
 * Get message from BE response or fallback to predefined message
 */
export const getMessage = (responseOrError, fallbackKey) => {
  // Try to get from response/error first
  const messageFromResponse = getMessageFromResponse(responseOrError);

  if (messageFromResponse) {
    return messageFromResponse;
  }

  // Fallback to predefined message
  if (fallbackKey && toastMessages[fallbackKey]) {
    return toastMessages[fallbackKey];
  }

  // Last resort
  return toastMessages.error;
};
