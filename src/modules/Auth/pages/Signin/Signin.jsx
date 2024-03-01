import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useMutation } from "@tanstack/react-query";
import { signin } from "../../../../apis/userAPI";
import { useNavigate, Navigate, useSearchParams } from "react-router-dom";
import { useUserContext } from "../../../../contexts/UserContext/UserContext";
import style from "../signin.module.css";
import {
  Container,
  TextField,
  Box,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";

const signinSchema = object({
  taiKhoan: string().required("Tài khoản không được để trống"),
  matKhau: string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Mật khẩu ít nhất 8 kí tự, 1 kí tự hoa, 1 kí tự thường và 1 số"
    ),
});
export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const { currentUser, handleSignin: onSigninSuccess } = useUserContext();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    resolver: yupResolver(signinSchema),
    mode: "onTouched",
  });

  const {
    mutate: handleSigin,
    isLoading,
    error,
  } = useMutation({
    mutationFn: (payload) => signin(payload),
    onSuccess: (data) => {
      onSigninSuccess(data);
    },
  });

  const onSubmit = (values) => {
    handleSigin(values);
  };
  // currentUser khác null => user đã đăng nhập => điều hướng về Home
  if (currentUser) {
    const redirectTo = searchParams.get("redirectTo");
    return <Navigate to={redirectTo || "/"} replace />;
  }
  // if (currentUser.maLoaiNguoiDung !== "QuanTri") {
  //   return <Navigate to="/404" />;
  // }
  return (
    <div className={style.background_signin}>
      <Container maxWidth="xs" className={style.modal_sign}>
        <div className={style.modalIn}>
          <PersonIcon fontSize="large" color="error" />
          <h4>Đăng nhập</h4>
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
              </div>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={isLoading}
                color="error"
              >
                Đăng nhập
              </Button>
              {error && <p>{error}</p>}
              <div style={{ textAlign: "right" }}>
                <a href="/sign-up">Bạn chưa có tài khoản ?</a>
              </div>
            </form>
          </Box>
        </div>
      </Container>
    </div>
  );
}
