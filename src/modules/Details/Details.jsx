import React from "react";
import { useParams } from "react-router-dom";
import MovieProfile from "./MovieProfile/MovieProfile";
import { Box } from "@mui/material";
import ShowTimes from "./Showtimes/Showtimes";

export default function Details() {
  const { movieId } = useParams();

  return (
    <Box
      sx={{
        backgroundColor: "rgb(10, 32, 41)",
        minHeight: "80vh",
      }}
      pt={5}
    >
      <MovieProfile movieId={movieId} />
      <ShowTimes movieId={movieId} />
    </Box>
  );
}
