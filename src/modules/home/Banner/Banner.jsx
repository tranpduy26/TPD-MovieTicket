import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBanner, getMovies } from "../../../apis/movieAPI";
import { getMovieShowTime } from "../../../apis/cinemaAPI";
import {
  FormControl,
  MenuItem,
  InputLabel,
  Grid,
  Select,
  Container,
  Button,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import getVideoId from "../Showing/videoUltils";
import dayjs from "dayjs";
import style from "./bannerStyle.module.css";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";

export default function Banner() {
  const [codeTimeCinema, setCodeTimeCinema] = useState("");

  const navigate = useNavigate();

  const {
    data: banners = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ["banners"], queryFn: getBanner });

  const { data: movies = [] } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });

  const [selectedMovie, setSelectedMovie] = useState("");
  const { data: movieShowTimes } = useQuery({
    queryKey: ["movieShowTime", selectedMovie],
    queryFn: () => getMovieShowTime(selectedMovie),
    enabled: !!selectedMovie,
  });

  const cinemaSystem = movieShowTimes?.heThongRapChieu || [];
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState("");
  // Validate check input
  const [isMovieSelected, setIsMovieSelected] = useState(false);
  const [isCinemaSelected, setIsCinemaSelected] = useState(false);
  const [isShowtimeSelected, setIsShowtimeSelected] = useState(false);

  const handleChangeMovie = (event) => {
    setSelectedMovie(event.target.value);
    setSelectedCinema("");
    setSelectedShowtime("");
    setIsMovieSelected(true);
    setIsCinemaSelected(false);
    setIsShowtimeSelected(false);
  };

  const handleChangeCinema = (event) => {
    setSelectedCinema(event.target.value);
    setSelectedShowtime("");
    setIsCinemaSelected(true);
    setIsShowtimeSelected(false);
  };

  const handleChangeShowtime = (event) => {
    setSelectedShowtime(event.target.value);
    setIsShowtimeSelected(true);
  };

  if (isLoading) {
    return (
      <div>
        <img
          src="./img/animation_lmvydl73_small.gif"
          alt=""
          width="100%"
          height="100%"
        />
      </div>
    );
  }

  return (
    <div className={style.banner}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {banners?.map((banner) => (
          <div className={style.banner1} key={banner.maBanner}>
            <SwiperSlide>
              <div
                className={style.bgBanner}
                style={{ backgroundImage: `url(${banner.hinhAnh})` }}
              >
                <div
                  style={{
                    height: "600px",
                    lineHeight: "600px",
                  }}
                >
                  <Button>
                    <PlayCircleOutlineIcon
                      fontSize="large"
                      className={style.iconPlay}
                    />
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          </div>
        ))}
      </Swiper>

      <Container maxWidth="md" className={style.formSelect}>
        <Grid container className={style.formSelect1}>
          <Grid item xs={4}>
            <div className={style.dropDown}>
              <FormControl className={style.dropDown1} variant="standard">
                <InputLabel className={style.dropDown2}>Phim</InputLabel>
                <Select
                  value={selectedMovie}
                  onChange={handleChangeMovie}
                  label="Phim"
                >
                  {movies
                    .filter((movie) => movie.dangChieu === true)
                    .map((movie) => (
                      <MenuItem key={movie.maPhim} value={movie.maPhim}>
                        {movie.tenPhim}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className={style.dropDown}>
              <FormControl className={style.dropDown1} variant="standard">
                <InputLabel className={style.dropDown2}>Rạp</InputLabel>
                <Select
                  value={selectedCinema}
                  onChange={handleChangeCinema}
                  label="Rạp"
                >
                  {selectedMovie &&
                    cinemaSystem.map((cinema) =>
                      cinema.cumRapChieu ? (
                        cinema.cumRapChieu.map((rap) => (
                          <MenuItem key={rap.maCumRap} value={rap.maCumRap}>
                            <p>
                              {rap.tenCumRap} - {rap.diaChi}
                            </p>
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>
                          <p>Phim chưa có lịch chiếu</p>
                        </MenuItem>
                      )
                    )}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className={style.dropDown}>
              <FormControl className={style.dropDown1} variant="standard">
                <InputLabel className={style.dropDown2}>Ngày & Giờ</InputLabel>
                <Select
                  value={selectedShowtime}
                  onChange={handleChangeShowtime}
                  label="Ngày và Giờ"
                >
                  {selectedCinema &&
                    cinemaSystem.map((heThongRap) =>
                      heThongRap.cumRapChieu.map((cumRap) =>
                        cumRap.lichChieuPhim ? (
                          cumRap.lichChieuPhim.map((lichChieu) => {
                            const time = dayjs(
                              lichChieu.ngayChieuGioChieu
                            ).format("DD-MM-YYYY ~ HH:mm");
                            return (
                              <MenuItem
                                key={lichChieu.maLichChieu}
                                value={lichChieu.maLichChieu}
                                onClick={() => {
                                  setCodeTimeCinema(lichChieu.maLichChieu);
                                }}
                              >
                                <p>{time}</p>
                              </MenuItem>
                            );
                          })
                        ) : (
                          <MenuItem disabled>
                            <p>Rạp chưa có lịch chiếu</p>
                          </MenuItem>
                        )
                      )
                    )}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={2}>
            <FormControl className={style.dropDown1}>
              <Button
                variant="contained"
                className={style.btnForm}
                onClick={() => {
                  if (
                    !isMovieSelected ||
                    !isCinemaSelected ||
                    !isShowtimeSelected
                  ) {
                    alert("Vui lòng chọn đầy đủ thông tin.");
                    return;
                  }
                  navigate(`/tickets/${codeTimeCinema}`);
                }}
              >
                Mua vé ngay
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
