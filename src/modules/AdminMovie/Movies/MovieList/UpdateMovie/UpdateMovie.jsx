import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMovieDetails, updateMovie } from "../../../../../apis/movieAPI";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, mixed } from "yup";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Container, Grid, TextField, Button, Switch } from "@mui/material";

import { SnackbarProvider, useSnackbar } from "notistack";
import style from "../../AddMovie/addMovie.module.css";

const updateMovieSchema = object({
  tenPhim: string().required("Tên phim không được để trống"),
  biDanh: string().required("Bí danh không được để trống"),
  moTa: string().required("Mô tả không được để trống"),
  hinhAnh: mixed().test("required", "Hình ảnh không được để trống", (value) => {
    return value !== undefined;
  }),
  trailer: string().required("Trailer không được để trống"),
  ngayKhoiChieu: string().required("Ngày tháng năm không được để trống"),
  danhGia: string().required("Đánh giá không được để trống"),
});

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function UpdateMovie() {
  // Snackbar
  const { enqueueSnackbar } = useSnackbar();
  const handleSnackbar = (message, variant) => () => {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };

  const { movieId } = useParams();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      tenPhim: "",
      biDanh: "",
      moTa: "",
      hinhAnh: "",
      trailer: "",
      ngayKhoiChieu: "",
      sapChieu: "",
      dangChieu: "",
      hot: "",
      danhGia: "",
    },
    resolver: yupResolver(updateMovieSchema),
  });

  const navigate = useNavigate();

  const image = watch("hinhAnh");
  const [imgPreview, setImgPreview] = useState("");
  const blob = new Blob([image[0]]);
  useEffect(() => {
    if (image && image.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(blob);
    }
  }, [image]);

  const { data: movie } = useQuery(["movie", movieId], () =>
    getMovieDetails(movieId)
  );

  useEffect(() => {
    console.log(movie);
    // Đặt giá trị cho các trường từ dữ liệu phim đã có
    if (movie) {
      setImgPreview(movie.hinhAnh);
      setValue("hinhAnh", movie.hinhAnh);
      setValue("tenPhim", movie.tenPhim);
      setValue("biDanh", movie.biDanh);
      setValue("moTa", movie.moTa);
      setValue("trailer", movie.trailer);
      setValue("ngayKhoiChieu", movie.ngayKhoiChieu);
      setValue("sapChieu", movie.sapChieu);
      setValue("dangChieu", movie.dangChieu);
      setValue("hot", movie.hot);
      setValue("danhGia", movie.danhGia);
    }
  }, [movie]);

  useEffect(() => {
    if (movie) {
      if (movie.hinhAnh) {
        setValue("hinhAnh", {
          originFileObj: {
            name: "default.png",
            url: movie.hinhAnh,
          },
        });
      }
    }
  }, [movie]);

  const { mutate: onUpdate } = useMutation(
    (values) => {
      const formData = new FormData();
      formData.append("tenPhim", values.tenPhim);
      formData.append("biDanh", values.biDanh);
      formData.append("moTa", values.moTa);
      if (values.hinhAnh[0]) {
        formData.append("hinhAnh", values.hinhAnh[0]);
      }
      formData.append("trailer", values.trailer);
      formData.append("ngayKhoiChieu", values.ngayKhoiChieu);
      formData.append("sapChieu", values.sapChieu);
      formData.append("dangChieu", values.dangChieu);
      formData.append("hot", values.hot);
      formData.append("danhGia", values.danhGia);
      formData.append("maNhom", "GP08");
      formData.append("maPhim", movieId);

      return updateMovie(formData);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(["movie", movieId]);
        queryClient.invalidateQueries("movie-list");
      },
      onSuccess: () => {
        handleSnackbar("Cập nhật phim thành công!", "success")();
        navigate("/admin/movie-list");
      },
      onError: () => {
        handleSnackbar("Cập nhật phim thất bại!", "error")();
      },
    }
  );

  return (
    <div className={style.container}>
      <Container style={{ margin: "20px 0" }}>
        <h1 style={{ textAlign: "center" }}>Update Movie</h1>
        <Grid container>
          <Grid item xs={6}>
            {imgPreview && (
              <div style={{ margin: "150px" }}>
                <img src={imgPreview} width="100%" height="100%" />
              </div>
            )}
          </Grid>
          <Grid item xs={6}>
            <form
              onSubmit={handleSubmit(onUpdate)}
              className={style.formSubmit}
            >
              <div>
                <input
                  placeholder="Hình Ảnh"
                  type="file"
                  {...register("hinhAnh")}
                />
                {errors && <p>{errors.hinhAnh?.message}</p>}
              </div>

              <div>
                <TextField
                  fullWidth
                  id="outlined-multiline-static"
                  multiline
                  label="ID"
                  variant="outlined"
                  disabled
                  value={movie?.maPhim}
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  id="outlined-multiline-static"
                  multiline
                  label="Tên phim"
                  variant="outlined"
                  {...register("tenPhim")}
                  helperText={errors.tenPhim?.message}
                />
              </div>

              <div>
                <TextField
                  fullWidth
                  id="outlined-multiline-static"
                  multiline
                  label="Bí danh"
                  variant="outlined"
                  {...register("biDanh")}
                  helperText={errors.biDanh?.message}
                />
              </div>

              <div>
                <TextField
                  fullWidth
                  id="outlined-multiline-static"
                  multiline
                  label="Trailer"
                  variant="outlined"
                  {...register("trailer")}
                  helperText={errors.trailer?.message}
                />
              </div>

              <div className={style.textArea}>
                <textarea
                  name="Mô tả"
                  cols="72"
                  rows="10"
                  placeholder="Mô tả"
                  {...register("moTa")}
                ></textarea>
                {errors.moTa && <p>{errors.moTa.message}</p>}
              </div>
              <div>
                <input
                  placeholder="Ngày Khởi Chiếu"
                  type="date"
                  {...register("ngayKhoiChieu", {
                    setValueAs: (date) => {
                      return dayjs(date).format("YYYY-MM-DD");
                    },
                  })}
                />
              </div>
              <div>
                <div>
                  <p>
                    Đang chiếu <Switch {...label} {...register("dangChieu")} />
                  </p>
                </div>
                <div>
                  <p>
                    Sắp chiếu <Switch {...label} {...register("sapChieu")} />
                  </p>
                </div>
                <div>
                  <p>
                    Hot <Switch {...label} {...register("hot")} />
                  </p>
                </div>
              </div>
              <div>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  label="Rating"
                  type="number"
                  min="0"
                  max="10"
                  {...register("danhGia")}
                  helperText={errors.danhGia?.message}
                />
              </div>
              <div className={style.btn}>
                <Button
                  type="submit"
                  style={{ padding: "10px 30px" }}
                  variant="contained"
                  color="success"
                >
                  Cập nhật phim
                </Button>
              </div>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
