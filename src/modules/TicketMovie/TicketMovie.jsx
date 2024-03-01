import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import TicketProvider from "../../contexts/TicketContext/TicketContext";
import { getTicketMovieBox } from "../../apis/ticketAPI";
import { Box, Container, Grid, Typography } from "@mui/material";
import Loading from "../../components/Loading/Loading";
import MovieSeatlist from "./MovieSeatList/MovieSeatList";
import Ticket from "./Ticket/Ticket";

export default function TicketMovie() {
  const { showtimeId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["listBoxMovie"],
    queryFn: () => getTicketMovieBox(showtimeId),
    enabled: !!showtimeId,
  });

  if (isLoading) {
    return <Loading />;
  }

  const infoCinema = data?.thongTinPhim || [];
  const imageCinema = data?.thongTinPhim.hinhAnh || [];
  console.log(data);

  return (
    <TicketProvider>
      <Box
        sx={{
          backgroundImage: `url(${imageCinema})`,
          position: "relative",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          "&::after": {
            backgroundColor: "#000",
            display: "block",
            content: "''",
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
          },
        }}
      >
        <Container
          sx={{ paddingTop: "64px", zIndex: "99", position: "relative" }}
        >
          <Grid
            container
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
            alignItems={"center"}
            sx={{ backgroundColor: "#262626" }}
            p={0}
          >
            <Grid
              item
              xs={12}
              display={"flex"}
              justifyContent={"center"}
              flexDirection={"column"}
              alignItems={"center"}
              pt={2}
            >
              <Box
                sx={{ backgroundColor: "white", width: "30vw", height: "10px" }}
              ></Box>
              <Typography color={"white"}>Display</Typography>
            </Grid>
            <Grid
              item
              display={"flex"}
              flexDirection={"column"}
              xs={12}
              overflow={"hidden"}
              maxWidth={"100%"}
            >
              <MovieSeatlist showtimeId={showtimeId} />
            </Grid>
            <Grid item xs={12} maxWidth="100%">
              <Ticket infoCinema={infoCinema} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </TicketProvider>
  );
}
