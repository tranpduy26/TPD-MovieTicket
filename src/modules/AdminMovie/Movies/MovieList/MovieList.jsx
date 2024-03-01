import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { deleteMovie, getMovies } from "../../../../apis/movieAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Button,
  TableRow,
  IconButton,
  InputBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Tooltip,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import WorkIcon from "@mui/icons-material/Work";
import SearchIcon from "@mui/icons-material/Search";
import style from "./movieStyle.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function MovieList() {
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
  //Dialog
  const [open, setOpen] = useState(false);

  const [deletingMovieId, setDeletingMovieId] = useState(null);
  const handleClickOpen = (movieId) => {
    setOpen(true);
    setDeletingMovieId(movieId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Search
  const [searchTerm, setSearchTerm] = useState("");

  const { data = [], isLoading } = useQuery({
    queryKey: ["movies", searchTerm],
    queryFn: () => getMovies({ search: searchTerm }),
    // enabled: false,
  });

  //Delete
  const queryClient = useQueryClient();
  const { mutate: onDeleteMovie } = useMutation(
    (movieId) => deleteMovie(movieId),
    {
      onSuccess: () => {
        handleSnackbar("Xóa phim thành công!", "success")();
        queryClient.invalidateQueries("movie-list");
      },
      onError: () => {
        handleSnackbar("Xóa phim thất bại!", "error")();
      },
    }
  );
  const handleDeleteMovie = (movieId) => {
    onDeleteMovie(movieId);
  };
  const handleSearchChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  // Navigate
  const navigate = useNavigate();
  const handleMoveEdit = (movieId) => {
    navigate(`/admin/edit-movie/${movieId}`);
  };
  const handleMoveAddLich = (movieId) => {
    navigate(`/admin/add-showtime/${movieId}`);
  };
  const handleMoveAdd = () => {
    navigate("/admin/movie-add");
  };

  return (
    <div className={style.container}>
      <h1 style={{ textAlign: "center" }}>Movie List</h1>
      <div className={style.search}>
        <Paper sx={{ p: "2px 4px", width: 250 }}>
          <InputBase
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Paper>
        <Button onClick={handleMoveAdd} color="secondary" variant="contained">
          Thêm phim
        </Button>
      </div>

      <TableContainer component={Paper} className={style.tableContainer}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Showtime</TableCell>
              <TableCell align="center">More</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => {
              return (
                <TableRow key={item.maPhim}>
                  <TableCell>
                    <img src={item.hinhAnh} alt="" width="50px" height="70px" />
                  </TableCell>
                  <TableCell>
                    <p>{item.maPhim}</p>
                  </TableCell>
                  <TableCell>
                    <h4>{item.tenPhim}</h4>
                  </TableCell>
                  <TableCell>
                    <p>{item.moTa}</p>
                  </TableCell>
                  <TableCell>
                    <p>{item.ngayKhoiChieu}</p>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: "flex" }}>
                      <Tooltip title="Chỉnh sửa phim">
                        <Button onClick={() => handleMoveEdit(item.maPhim)}>
                          <BorderColorIcon />
                        </Button>
                      </Tooltip>

                      <Tooltip title="Xóa phim">
                        <Button onClick={() => handleClickOpen(item.maPhim)}>
                          <DeleteIcon />
                        </Button>
                      </Tooltip>

                      <Tooltip title="Thêm lịch chiếu">
                        <Button onClick={() => handleMoveAddLich(item.maPhim)}>
                          <WorkIcon />
                        </Button>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Bạn có muốn xóa phim này không ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Phim không thể hoàn tác khi xóa
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>
            Hủy
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              handleClose();
              handleDeleteMovie(deletingMovieId);
            }}
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
