import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../../../apis/movieAPI";
import {
  Grid,
  Container,
  Box,
  Typography,
  Rating,
  Modal,
  colors,
} from "@mui/material";
import dayjs from "dayjs";

import { ButtonMovie } from "../../../components/ButtonMovie";
import ReactPlayer from "react-player";

export default function MovieProfile({ movieId }) {
  const [trailer, setTrailer] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(5);

  const handleClose = () => setOpen(false);

  const handleOpen = (movieTrailer) => {
    if (!movieTrailer) {
      alert("link xãy ra lỗi!");
    }
    setOpen(true);
    setTrailer(movieTrailer);
  };

  const { data: movieProfile = [] } = useQuery({
    queryKey: ["movieProfile", movieId],
    queryFn: () => getMovieDetails(movieId),
  });
  console.log(movieProfile);
  const time = dayjs(movieProfile.ngayKhoiChieu).format("DD.MM.YYYY");
  return (
    <>
      <Container>
        <Grid>
          <Grid item xs={6}>
            <img
              src={movieProfile.hinhAnh}
              height={800}
              width="100%"
              alt={movieProfile.tenPhim}
              style={{ borderRadius: "10px" }}
            />
          </Grid>
          <Grid item xs={6}>
            <h4 style={{ color: "white", paddingTop: "10px" }}>{time}</h4>
            <h3 style={{ color: "white" }}>{movieProfile.tenPhim}</h3>
            <ButtonMovie
              height="35px"
              onClick={() => {
                handleOpen(movieProfile.trailer);
              }}
            >
              Xem Trailer
            </ButtonMovie>
            <Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <Typography component="legend">Đánh Giá</Typography>
              <Rating
                defaultValue={5}
                name="simple-controlled"
                value={value}
                onChange={(evt, newValue) => {
                  setValue(newValue);
                }}
                readOnly={true}
              ></Rating>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ backgroundColor: "#0000001d" }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "transparent",
          }}
        >
          <ReactPlayer
            url={trailer}
            width="60vw"
            height="60vh"
            controls={true}
          />
        </Box>
      </Modal>
    </>
  );
}
