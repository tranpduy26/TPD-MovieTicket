import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { getMovieShowTimes } from "../../../apis/cinemaAPI";
import dayjs from "dayjs";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import { ButtonCinema, Item, NameCinema } from "./styled_Showitem";
import { ButtonMovie } from "../../../components/ButtonMovie";
import { useNavigate } from "react-router-dom";

export default function ShowTimes({ movieId }) {
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [showtimesAvailable, setShowtimesAvailable] = useState(true);

  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["movieShowtimes", movieId],
    queryFn: () => getMovieShowTimes(movieId),
    enabled: !!movieId,
  });
  console.log(data);
  const cinemaSystems = data?.heThongRapChieu || [];
  const handleGetCinemaSystem = (cinemaSystemId) => {
    const found = cinemaSystems.find(
      (item) => item.maHeThongRap === cinemaSystemId
    );

    setCinemas(found.cumRapChieu);
    setSelectedCinema(cinemaSystemId);
  };

  useEffect(() => {
    if (cinemaSystems.length > 0) {
      setCinemas(cinemaSystems[0].cumRapChieu);
      setSelectedCinema(cinemaSystems[0].maHeThongRap);
    } else if (cinemaSystems.length === 0) {
      if (!isLoading) {
        setShowtimesAvailable(false);
      }
    }
  }, [cinemaSystems]);

  return (
    <Container sx={{ paddingBottom: "25px" }}>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-star"
        spacing={1}
        sx={{
          borderRadius: "10px",
          backgroundColor: "white",
          padding: "20px",
        }}
      >
        {/* Render hệ thống rạp */}
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={1}
          divider={<Divider orientation="vertical" flexItem />}
          borderRight={1}
          borderColor="rgba(238,238,238,0.88)"
          padding={2}
        >
          {cinemaSystems.map((cinemaSystem) => {
            const isSelected = cinemaSystem.maHeThongRap === selectedCinema;
            return (
              <Item
                key={cinemaSystem.maHeThongRap}
                backgroundColor={isSelected ? "#e82900a6" : "white"}
              >
                <img
                  src={cinemaSystem.logo}
                  alt=""
                  width={50}
                  height={50}
                  onClick={() =>
                    handleGetCinemaSystem(cinemaSystem.maHeThongRap)
                  }
                />
              </Item>
            );
          })}
        </Stack>

        <Stack paddingLeft={4}>
          {/* Render ra danh sách rạp */}

          {showtimesAvailable ? (
            cinemas.map((cinema) => {
              return (
                <div key={cinema.maCumRap}>
                  <NameCinema>{cinema.tenCumRap}</NameCinema>
                  {/* Render lịch chiếu phim */}
                  {cinema.lichChieuPhim.map((showtime) => {
                    const time = dayjs(showtime.ngayChieuGioChieu).format(
                      "DD-MM-YYYY ~ HH:mm"
                    );

                    // onClick={() => navigate(`/tickets/${showtime.maLichChieu}`)}
                    return (
                      <ButtonCinema
                        key={showtime.maRap}
                        onClick={() => {
                          navigate(`/tickets/${showtime.maLichChieu}`);
                        }}
                      >
                        {time}
                      </ButtonCinema>
                    );
                  })}
                </div>
              );
            })
          ) : (
            <Box
              padding={10}
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography>Không có lịch chiếu phim</Typography>
              <ButtonMovie
                height="40px"
                width="auto"
                margin="10px 0 0 0 "
                onClick={() => {
                  navigate("/");
                }}
              >
                Trở lại chọn phim khác
              </ButtonMovie>
            </Box>
          )}
        </Stack>
      </Stack>
    </Container>
  );
}
