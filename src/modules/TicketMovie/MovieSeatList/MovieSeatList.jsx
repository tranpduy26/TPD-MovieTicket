import React from "react";
import { getTicketMovieBox } from "../../../apis/ticketAPI";
import { useQuery } from "@tanstack/react-query";
import { GridContainer, NoteSeat } from "./styledMovieList";
import { MapInteractionCSS } from "react-map-interaction";
import { useTicketContext } from "../../../contexts/TicketContext/TicketContext";
import MovieSeatItem from "./MovieSeatItem/MovieSeatItem";
import Loading from "../../../components/Loading";
import { Box, Typography } from "@mui/material";

export default function MovieSeatList({ showtimeId }) {
  const noteSeat = [
    { bg: "#404040", statusSet: "Đã đặt" },
    { bg: "#eb2f96", statusSet: "Ghế bạn chọn" },
    { bg: "#f5222d", statusSet: "Ghế vip" },
    { bg: "#722ed1", statusSet: "Ghế thường" },
  ];
  const { selectedSeats, totalPrice, handleSelect } = useTicketContext();
  const { data, isLoading } = useQuery({
    queryKey: ["listBoxMovie", showtimeId],
    queryFn: () => getTicketMovieBox(showtimeId),
    enabled: !!showtimeId,
  });

  const listSeat = data?.danhSachGhe || [];

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <MapInteractionCSS>
        <GridContainer>
          {listSeat.map((item) => {
            const isSelected = selectedSeats.find(
              (chair) => chair.maGhe === item.maGhe
            );
            return (
              <MovieSeatItem
                seat={item}
                key={item.maGhe}
                handleSelect={handleSelect}
                isSelected={!!isSelected}
                isLoading={isLoading}
              />
            );
          })}
        </GridContainer>
      </MapInteractionCSS>
      <Box
        display={"grid"}
        color={"white"}
        sx={{ gridTemplateColumns: "repeat(2,auto)" }}
      >
        {noteSeat.map((item, index) => {
          return (
            <NoteSeat key={index}>
              <Box
                width={"16px"}
                height={"16px"}
                bgcolor={item.bg}
                borderRadius={1}
                mr={1}
              ></Box>
              <Typography variant="caption" fontSize={15} display="block">
                {item.statusSet}
              </Typography>
            </NoteSeat>
          );
        })}
      </Box>
    </>
  );
}
