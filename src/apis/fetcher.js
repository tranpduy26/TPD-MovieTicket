import axios from "axios";

// Setup axios instance
const fetcher = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2MyIsIkhldEhhblN0cmluZyI6IjA5LzA5LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcyNTg0MDAwMDAwMCIsIm5iZiI6MTY5Njg3MDgwMCwiZXhwIjoxNzI1OTg3NjAwfQ.eka9nnrY4RvjgyAAdJH7uruVGj0DfXCfIM8V8HRpIMI",
  },
});

//Request interceptors
fetcher.interceptors.request.use((request) => {
  //Kiểm tra xem user đã đăng nhập hay chưa để thêm token của user vào headers
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (user) {
    request.headers.Authorization = `Bearer ${user.accessToken}`;
  }

  return request;
});
//Response interceptors
fetcher.interceptors.response.use(
  (response) => {
    //Có thể thay đổi response trước khi trả về
    // return response.data.content;
    return response;
  },
  (error) => {
    //Kiểm tra nếu lỗi là 401 => token kh hợp lệ => đăng xuất
    if (error.response.status === 401) {
      localStorage.removeItem("currentUser");
      window.location.replace("/sign-in");
    }
    return Promise.reject(error);
  }
);
export default fetcher;
