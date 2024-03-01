import React from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <Container>
        <img
          src="./img/animation_lnncfyxb_small.gif"
          alt="404"
          width="100%"
          height="500px"
        />
      </Container>
    </div>
  );
}
