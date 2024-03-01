import React, { forwardRef, useState } from "react";
import { Box, Snackbar } from "@mui/material";
import {
  BackgroundTicket,
  FormatBackground,
  MiniCardLi,
  MiniCardUl,
  TextTicket,
} from "../MovieSeatList/styledMovieList";
import { useTicketContext } from "../../../contexts/TicketContext/TicketContext";
import { ButtonMovie } from "../../../components/ButtonMovie";
import MuiAlert from "@mui/material/Alert";

export default function Ticket({ infoCinema }) {
  console.log(infoCinema);
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const { selectedSeats, totalPrice } = useTicketContext();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (evt, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <BackgroundTicket>
      <FormatBackground bg="url(https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/bg-top-seatmap.png) repeat-x top left transparent;" />
      <MiniCardUl>
        <MiniCardLi br="1px solid #cccc" p="0 10px 0 0">
          <Box display={"flex"} flexDirection={"column"}>
            <Box sx={{ width: "200px", height: "200px", marginTop: "16px" }}>
              <img
                src={infoCinema.hinhAnh}
                width="100%"
                height="100%"
                alt={infoCinema.tenPhim}
              />
            </Box>
            <TextTicket pt="8px" fs="25px" fw="bold">
              {infoCinema.tenPhim}
            </TextTicket>
          </Box>
        </MiniCardLi>
        <MiniCardLi p="0 10px" br="1px solid #cccc">
          <Box display={"flex"} flexDirection={"column"}>
            <TextTicket>{infoCinema.tenCumRap}</TextTicket>
            <TextTicket>{infoCinema.tenRap}</TextTicket>
            <TextTicket>{infoCinema.ngayChieu}</TextTicket>
            <TextTicket>{infoCinema.gioChieu}</TextTicket>
            <TextTicket>{infoCinema.diaChi}</TextTicket>
          </Box>
        </MiniCardLi>
        <MiniCardLi p="0 10px">
          <Box display={"flex"} flexDirection={"column"} position={"relative"}>
            <TextTicket>Tạm tính:</TextTicket>
            <TextTicket>{totalPrice} VNĐ</TextTicket>
            <TextTicket>Ghế bạn chọn:</TextTicket>
            <Box display={"flex"}>
              {selectedSeats.map((item, index) => {
                const separator =
                  index === selectedSeats.length - 1 ? " " : ", ";
                return (
                  <TextTicket key={item.stt}>
                    {item.tenGhe} {separator}{" "}
                  </TextTicket>
                );
              })}
            </Box>
            <ButtonMovie
              onClick={handleClick}
              height="40px"
              width="200px"
              position="absolute"
              bot="10px"
              left="0"
            >
              Đặt Vé
            </ButtonMovie>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Đặt vé thành công
              </Alert>
            </Snackbar>
          </Box>
        </MiniCardLi>
      </MiniCardUl>
      <FormatBackground bg="url(https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/bg-top-seatmap.png) repeat-x bottom left transparent;"></FormatBackground>
    </BackgroundTicket>
  );
}
