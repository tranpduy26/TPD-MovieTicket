import React from "react";
import { Container, Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import data from "./data.json";
import logos from "./logo.json";
import style from "./footerStyle.module.css";
export default function Footer() {
  return (
    <div id="footer">
      <div className={style.bgFooter}>
        <Container maxWidth="md">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <p className={style.titleFooter}>Ứng dụng tiện lợi dành cho</p>
              <p className={style.titleFooter}>người yêu điện ảnh</p>
              <p className={style.titleFooter1}>
                Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp
                và đổi quà hấp dẫn.
              </p>
              <div>
                <button className={style.btnFooter}>
                  App miễn phí - Tải về ngay!
                </button>
              </div>

              <p style={{ color: "white", marginTop: "20px" }}>
                TIX có hai phiên bản{" "}
                <a href="https://apps.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197">
                  Iphone
                </a>{" "}
                &{" "}
                <a href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123">
                  Android
                </a>
              </p>
            </Grid>

            <Grid item xs={12} md={6} className={style.posPhone}>
              <div>
                <img
                  className={style.imgPhone}
                  src="./img/phonebg.png"
                  alt="Phone"
                />
                <div className={style.phoneSwiper}>
                  <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                      delay: 1500,
                      disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                  >
                    {data.map((slide) => (
                      <SwiperSlide>
                        <div key={slide.id} className={style.swiperItem}>
                          <img
                            width="100%"
                            height="100%"
                            src={slide.url}
                            alt={slide.name}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className={style.footerBot}>
        <Container maxWidth="md">
          <Grid container>
            <Grid item xs={12} sm={4} lg={4}>
              <div>
                <h5 className={style.footerTitle}>Tix</h5>
                <Grid container>
                  <Grid item xs={6}>
                    <a className={style.footerLink} href="">
                      FAQ
                    </a>
                  </Grid>
                  <Grid item xs={6}>
                    <a className={style.footerLink} href="">
                      Thỏa thuận sử dụng
                    </a>
                  </Grid>
                  <Grid item xs={6}>
                    <a className={style.footerLink} href="">
                      Brand Guidelines
                    </a>
                  </Grid>
                  <Grid item xs={6}>
                    <a className={style.footerLink} href="">
                      {" "}
                      Chính sách bảo mật
                    </a>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={4}>
              <h5 className={style.footerTitle}>Đối tác</h5>
              <Grid container rowSpacing={3}>
                {logos.map((item) => (
                  <Grid item xs={3}>
                    <div key={item.id}>
                      <a className={style.hoverA} href="#">
                        <img
                          className={style.logoFooter}
                          src={item.url}
                          alt={item.name}
                        />
                      </a>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container>
                <Grid item xs={6}>
                  <h5 className={style.footerTitle}>Mobile App</h5>
                  <Grid container>
                    <Grid item xs={6}>
                      <a href="#">
                        <img
                          className={style.logoFooter}
                          src="./img/apple-logo.png"
                          alt=""
                        />
                      </a>
                    </Grid>
                    <Grid item xs={6}>
                      <a href="#">
                        <img
                          className={style.logoFooter}
                          src="./img/android-logo.png"
                          alt=""
                        />
                      </a>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <h5 className={style.footerTitle}>Social</h5>
                  <Grid container>
                    <Grid item xs={6}>
                      <a href="#">
                        <img
                          className={style.logoFooter}
                          src="./img/facebook-logo.png"
                          alt=""
                        />
                      </a>
                    </Grid>
                    <Grid item xs={6}>
                      <a href="#">
                        <img
                          className={style.logoFooter}
                          src="./img/download.png"
                          alt=""
                        />
                      </a>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <hr style={{ color: "white" }} />
          <Grid container>
            <Grid item xs={12} sm={3} lg={2}>
              <img src="./img/download.jpeg" alt="" width="100px" />
            </Grid>
            <Grid item xs={12} sm={6} lg={8}>
              <h6 style={{ marginBottom: "20px" }}>
                TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION
              </h6>
              <h7>
                Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ
                Chí Minh, Việt Nam.
              </h7>
              <h7>Giấy chứng nhận đăng ký kinh doanh số: 0101659783,</h7>
              <h7>
                đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế
                hoạch và đầu tư Thành phố Hồ Chí Minh cấp.
              </h7>
              <h7>Số Điện Thoại (Hotline): 1900 545 436</h7>
            </Grid>
            <Grid item xs={12} sm={3} lg={2}>
              <img
                src="./img/daThongBao-logo.cb85045e.png"
                alt=""
                width="100px"
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}
