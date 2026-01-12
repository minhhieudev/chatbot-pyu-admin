import { toast } from "sonner";

const baseOptions = {
  duration: 3500,
};

export const showSuccess = (message, options = {}) =>
  toast.success(message, { ...baseOptions, ...options });

export const showError = (message, options = {}) =>
  toast.error(message, { ...baseOptions, ...options });

export const showInfo = (message, options = {}) =>
  toast(message, {
    ...baseOptions,
    icon: "i",
    ...options,
  });

export const showWarning = (message, options = {}) =>
  toast(message, { ...baseOptions, icon: "!", ...options });

export const showLoading = (message) => toast.loading(message);

export const showPromise = (promise, { loading, success, error }) =>
  toast.promise(promise, {
    loading,
    success: (data) => typeof success === 'function' ? success(data) : success,
    error: (err) => typeof error === 'function' ? error(err) : error,
    ...baseOptions,
  });

export const showSuccessToast = showSuccess;
export const showErrorToast = showError;
export const showInfoToast = showInfo;
export const showWarningToast = showWarning;
export const showLoadingToast = showLoading;
export const showPromiseToast = showPromise;
