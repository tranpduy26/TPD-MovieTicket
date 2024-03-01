import React from "react";
import { LoadingStyle } from "./LoadingStyle";
import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <LoadingStyle>
      {/* <img
        src="animation_lmhh3llv_small.gif"
        alt="Loading"
        width={100}
        height={100}
      /> */}
      <CircularProgress />
    </LoadingStyle>
  );
}
