import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { signup } from "../../../../apis/userAPI";
import {
  Container,
  TextField,
  Box,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import style from "../signin.module.css";

const signupSchema = object({
  taiKhoan: string().required("Tài khoản không được để trống"),
  matKhau: string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Mật khẩu ít nhất 8 kí tự, 1 kí tự hoa, 1 kí tự thường và 1 số"
    ),
  email: string()
    .required("Email không được để trống")
    .email("Email không đúng định dạng"),
  hoTen: string().required("Họ Tên không được để trống"),
  soDt: string().required("Số điện thoại kh được để trống"),
});
export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
    },
    resolver: yupResolver(signupSchema),
  });
  const {
    mutate: handleSignup,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (payload) => signup(payload),
    onSuccess: () => {
      alert("Đăng kí thành công");
      navigate("/sign-in");
    },
  });
  const navigate = useNavigate();
  const onSubmit = (values) => {
    // Gọi API đăng kí
    handleSignup(values);
  };
  const onError = (values) => {
    console.log(values);
  };

  return (
    <div className={style.background_signin}>
      <Container maxWidth="xs" className={style.modal_sign}>
        <div className={style.modalIn}>
          <LockIcon fontSize="large" color="error" />
          <h4>Đăng kí</h4>
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={style.inputForm}>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="Tài khoản"
                    variant="outlined"
                    fullWidth
                    {...register("taiKhoan")}
                    error={!!errors.taiKhoan}
                    helperText={errors.taiKhoan?.message}
                  />
                </div>
                <div>
                  <TextField
                    {...register("matKhau")}
                    fullWidth
                    error={!!errors.matKhau}
                    helperText={errors.matKhau?.message}
                    variant="outlined"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handleChangePassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="Họ Tên"
                    variant="outlined"
                    fullWidth
                    {...register("hoTen")}
                    error={!!errors.hoTen}
                    helperText={errors.hoTen?.message}
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="Số điện thoại"
                    variant="outlined"
                    fullWidth
                    {...register("soDt")}
                    error={!!errors.soDt}
                    helperText={errors.soDt?.message}
                  />
                </div>
              </div>
              <Button
                variant="contained"
                fullWidth
                color="error"
                type="submit"
                disabled={isLoading}
              >
                Đăng kí
              </Button>
              {error && <p>{error}</p>}
            </form>
          </Box>
        </div>
      </Container>
    </div>
  );
}
