import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMovie } from "../../../../apis/movieAPI";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, mixed } from "yup";
import { useNavigate } from "react-router-dom";
import { Box, Container, Grid, TextField, Button, Switch } from "@mui/material";
import style from "./addMovie.module.css";
import MovieList from "../MovieList/MovieList";

const addMovieSchema = object({
  tenPhim: string().required("Tên phim không được để trống"),
  biDanh: string().required("Bí danh không được để trống"),
  moTa: string().required("Mô tả không được để trống"),
  hinhAnh: mixed().test("required", "Hình ảnh không được để trống", (value) => {
    return value !== undefined;
  }),
  trailer: string().required("Trailer không được để trống"),
  ngayKhoiChieu: string().required("Ngày tháng năm không được để trống"),
});

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function AddMovie() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
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
    resolver: yupResolver(addMovieSchema),
  });
  const navigate = useNavigate();
  const hinhAnh = watch("hinhAnh");
  const [imgPreview, setImgPreview] = useState("");
  useEffect(() => {
    //Chạy vào usEffect callback khi giá trị của hinhAnh bị thay đổi
    const file = hinhAnh?.[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (evt) => {
      setImgPreview(evt.target.result);
    };
  }, [hinhAnh]);
  const queryClient = useQueryClient();
  const { mutate: onSubmit } = useMutation({
    mutationFn: (values) => {
      console.log(values);
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

      return addMovie(formData);
    },

    onSuccess: () => {
      alert("Thêm phim thành công");
      queryClient.invalidateQueries("movie-list");
      navigate("/admin/movie-list");
    },
    onError: (error) => {
      const msg = error?.response?.data?.content || "Có lỗi xảy ra";
      alert(msg);
    },
  });
  return (
    <div className={style.container}>
      <Container style={{ margin: "20px 0" }}>
        <h1 style={{ textAlign: "center" }}>Add Movie</h1>
        <Grid container>
          <Grid item xs={6}>
            {imgPreview ? (
              <div style={{ margin: "150px" }}>
                <img src={imgPreview} width="100%" height="100%" />
              </div>
            ) : (
              <div className={style.bgImg}></div>
            )}
          </Grid>
          <Grid item xs={6}>
            <form
              onSubmit={handleSubmit(onSubmit)}
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
                  id="outlined-basic"
                  label="Tên phim"
                  variant="outlined"
                  {...register("tenPhim")}
                  helperText={errors.tenPhim?.message}
                />
              </div>

              <div>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Bí danh"
                  variant="outlined"
                  {...register("biDanh")}
                  helperText={errors.biDanh?.message}
                />
              </div>

              <div>
                <TextField
                  fullWidth
                  id="outlined-basic"
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
                      return dayjs(date).format("DD/MM/YYYY");
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
                  label="Rating"
                  type="number"
                  min="0"
                  max="10"
                  {...register("danhGia")}
                />
              </div>
              <div className={style.btn}>
                <Button
                  type="submit"
                  style={{ padding: "10px 30px" }}
                  variant="contained"
                  color="success"
                >
                  Thêm phim
                </Button>
              </div>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
