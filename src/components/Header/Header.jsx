import React from "react";
import { useUserContext } from "../../contexts/UserContext/UserContext";
import { AppBar, Toolbar, Typography, Button, Grid } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import style from "./headerStyle.module.css";

export default function Header() {
  const { currentUser, handleSignout } = useUserContext();
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div id="home">
      <AppBar position="fixed" color="white">
        <Toolbar>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="h6">
                {/* <img
                  src="../../../public/img/animation_lmvydl73_small.gif"
                  alt="Logo"
                  height="40"
                  width="40"
                /> */}
                <a href="/">
                  <img
                    src="./img/logohome.png"
                    alt=""
                    width="50px"
                    height="50px"
                  />
                </a>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Button onClick={() => handleScroll("home")} color="inherit">
                Trang Chủ
              </Button>
              <Button onClick={() => handleScroll("showing")} color="inherit">
                Lịch Chiếu
              </Button>
              <Button onClick={() => handleScroll("cinema")} color="inherit">
                Cụm Rạp
              </Button>
              <Button onClick={() => handleScroll("footer")} color="inherit">
                Ứng Dụng
              </Button>
            </Grid>
            <Grid item xs={4}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <span className={style.header_signin}>
                  {currentUser ? (
                    <div>
                      <span>
                        <a href="">
                          <AccountBoxIcon />
                          {currentUser.hoTen}
                        </a>{" "}
                        |
                        <a href="/log-in-admin">
                          <AdminPanelSettingsIcon />
                          Quản trị
                        </a>
                        |
                        <a href="/" onClick={handleSignout}>
                          <LogoutIcon />
                          Đăng xuất
                        </a>
                      </span>
                    </div>
                  ) : (
                    <>
                      {" "}
                      <a href="/sign-in">
                        <AccountCircleOutlinedIcon sx={{ marginRight: 1 }} />
                        Đăng nhập
                      </a>
                      |
                      <a href="/sign-up">
                        <AccountCircleOutlinedIcon sx={{ marginRight: 1 }} />
                        Đăng kí
                      </a>
                    </>
                  )}
                </span>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
