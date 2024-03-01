import fetcher from "./fetcher";
import axiosClient from "./axiosClient";

// apiSignin
export const signin = async (payload) => {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/DangNhap", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

// apiSignup
export const signup = async (payload) => {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/DangKy", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

// apiGetUserInfo
export const apiGetUserList = async () => {
  const { data } = await fetcher.get("/QuanLyNguoiDung/LayDanhSachNguoiDung", {
    params: {
      maNhom: "GP08",
    },
  });
  return data;
};

// apiDeleteUser
export const apiDeleteUser = async (taiKhoan) => {
  const { data } = await fetcher.delete(
    `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
  );
  return data;
};

// apiAddUser
export const apiAddUser = async (userData) => {
  const { data } = await fetcher.post(
    "/QuanLyNguoiDung/ThemNguoiDung",
    userData
  );
  return data;
};

// apiUpdateUser
export const apiUpdateUser = async (userData) => {
  const { data } = await fetcher.post(
    "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
    userData
  );
  return data;
};

// apiGetUserDetail
export const apiGetUserDetail = async (taiKhoan) => {
  const { data } = await fetcher.post(
    `/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`
  );
  return data;
};
