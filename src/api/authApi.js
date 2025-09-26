// src/api/authApi.js
export const loginApi = async (credentials) => {
  // backendga post yuborish (hozir dummy)
  localStorage.setItem("isAuthenticated", "true");
  return { success: true };
};

export const logoutApi = async () => {
  localStorage.setItem("isAuthenticated", false);
  return { success: true };
};

export const checkAuthApi = async () => {
  const saved = localStorage.getItem("isAuthenticated");
  return { isAuthenticated: saved === "true" };
};
