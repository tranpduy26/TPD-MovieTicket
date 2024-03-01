import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { getMovies, moviePerPage } from "../../../apis/movieAPI";

import getVideoId from "./videoUltils";
import { Swiper, SwiperSlide } from "swiper/react";
import Slider from "react-slick";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import {
  Box,
  Grid,
  Button,
  Container,
  Dialog,
  DialogContent,
  Pagination,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import style from "./showingStyle.module.css";

export default function Showing() {
  // const { data = [], isLoading } = useQuery({
  //   queryKey: ["movies"],
  //   queryFn: getMovies,
  // });

  const itemsPerpage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const { data: moviePage = [] } = useQuery({
    queryKey: ["moviesPage", currentPage, itemsPerpage],
    queryFn: () => moviePerPage(currentPage, itemsPerpage),
  });

  const { items, totalCount, totalPages } = moviePage;
  console.log("moviePage:", moviePage);
  // Slick setting
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: itemsPerpage,
    slidesToScroll: itemsPerpage,
  };
  const handleChangePage = (evt, newPage) => {
    setCurrentPage(newPage);
  };

  const [urlTrailers, setUrlTrailers] = useState({});
  const navigate = useNavigate();
  return (
    <div id="showing">
      <div style={{ margin: "50px auto" }}>
        <Container maxWidth="md" style={{ margin: "50px auto" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              x
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {items?.map((movie) => (
                <Grid
                  item
                  xs={2}
                  sm={4}
                  md={4}
                  key={movie.maPhim}
                  className={style.hoverShowing}
                >
                  <div>
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Grid
                        item
                        className={style.showingImg}
                        style={{
                          backgroundImage: `url(${movie.hinhAnh} )`,
                        }}
                      >
                        <div className={style.showingOverlay}>
                          <div
                            style={{
                              height: "314px",
                              lineHeight: "314px",
                            }}
                          >
                            <Button
                              onClick={() => {
                                const videoId = getVideoId(movie.trailer);
                                const newUrlTrailers = {
                                  ...urlTrailers,
                                  [movie.maPhim]: `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&widgetid=11`,
                                };
                                setUrlTrailers(newUrlTrailers);
                              }}
                            >
                              <PlayCircleOutlineIcon
                                fontSize="large"
                                className={style.iconPlay}
                              />
                            </Button>
                          </div>
                        </div>
                      </Grid>
                      <Grid
                        item
                        style={{ position: "relative", display: "block" }}
                      >
                        <div>
                          <div className={style.titleShowing}>
                            <span className={style.squareC18}>C18</span>{" "}
                            {movie.tenPhim}
                          </div>
                          <div>
                            <p className={style.descShowing}>{movie.moTa}</p>
                          </div>
                        </div>
                        <div>
                          <a
                            onClick={() => navigate(`/movies/${movie.maPhim}`)}
                            className={style.butMuaVe}
                            href=""
                          >
                            MUA VÉ
                          </a>
                        </div>
                      </Grid>
                    </Grid>
                  </div>

                  <Dialog
                    open={Boolean(urlTrailers[movie.maPhim])}
                    onClose={() =>
                      setUrlTrailers({
                        ...urlTrailers,
                        [movie.maPhim]: null,
                      })
                    }
                    maxWidth="lg"
                    style={{ height: "auto" }}
                  >
                    {urlTrailers[movie.maPhim] && (
                      <DialogContent
                        style={{
                          width: "940px",
                          height: "529px",
                          padding: "0px",
                        }}
                      >
                        <iframe
                          id={`my-iframe-id-${movie.maPhim}`}
                          width="100%"
                          height="100%"
                          src={urlTrailers[movie.maPhim]}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer;autoplay;clipboard-write; encrypted-media; gyroscope; picture-in-picture; muted"
                          allowFullScreen
                        ></iframe>
                      </DialogContent>
                    )}
                  </Dialog>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Pagination
            style={{ display: "flex", justifyContent: "center" }}
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
          />
        </Container>
      </div>
    </div>
  );
}
