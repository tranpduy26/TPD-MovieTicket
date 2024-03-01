import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Tabs,
  Tab,
  Box,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import {
  getInformtionSystemCinema,
  getLichChieu,
  getSystemCinema,
} from "../../../apis/cinemaAPI";
import style from "./cinemaStyle.module.css";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

// --------------------------------------------------------------------
function TabPanel(props) {
  const { children, value, index, indicatorColor, ...other } = props;
  const theme = useTheme();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ position: "relative" }}>
          {/* Indicator */}
          <Box
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              height: "100%",
              width: 3, // Độ rộng của indicator
              backgroundColor: indicatorColor || theme.palette.primary.main,
            }}
          />

          {/* Nội dung của TabPanel */}
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  indicatorColor: PropTypes.string, // Màu của indicator
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
// ------------------------------------------------------------
export default function Cinema() {
  const [lichChieuTheoCum, setLichChieuTheoCum] = useState([]);

  const navigate = useNavigate();

  const { data: systemCine = [] } = useQuery({
    queryKey: ["systemCinema"],
    queryFn: getSystemCinema,
  });
  const [selectedCine, setSelectedCine] = useState("");
  const { data: inforSysCine = [] } = useQuery({
    queryKey: ["informationSysCine", selectedCine],
    queryFn: () => getInformtionSystemCinema(selectedCine),
    enabled: !!selectedCine,
  });

  const handleChangeSystemCinema = (newValue) => {
    setSelectedCine(newValue);
  };

  const [selectedRap, setSelectedRap] = useState([]);
  const { data: lichChieu } = useQuery({
    queryKey: ["lichChieu", selectedCine],
    queryFn: () => getLichChieu(selectedCine),
    enabled: !!selectedCine,
  });

  const handleChangeRap = (cumRapId) => {
    const found = lichChieu[0].lstCumRap.filter(
      (item) => item.maCumRap == cumRapId
    );
    setLichChieuTheoCum(found);
  };

  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange2 = (event, value) => {
    setValue2(value);
  };
  useEffect(() => {
    // Kiểm tra xem có hệ thống rạp nào hay không
    if (systemCine.length > 0) {
      const firstSystem = systemCine[0];
      handleChangeSystemCinema(firstSystem.maHeThongRap);
    }
  }, [systemCine]);
  // useEffect(() => {
  //   // Kiểm tra xem có thông tin cụm rạp nào hay không
  //   if (inforSysCine.length > 0) {
  //     const firstCumRap = inforSysCine[0];
  //     handleChangeRap(firstCumRap.maCumRap);
  //   }
  // }, [inforSysCine]);
  return (
    <div id="cinema">
      <Container
        maxWidth="md"
        className={style.container}
        style={{ marginTop: "200px" }}
      >
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            height: 720,
          }}
        >
          <Tabs
            orientation="vertical"
            variant="standard"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={style.tabs}
            sx={{
              borderRight: 1,
              borderColor: "divider",
              "& .MuiTabs-indicator": {
                backgroundColor: "#00ac4d",
              },
            }}
          >
            {systemCine.map((system, index) => {
              return (
                <Tab
                  className={style.cinemaLogoTab}
                  style={{
                    padding: "30px",
                    minWidth: "unset",
                    position: "relative",
                  }}
                  icon={
                    <Avatar
                      alt={system.biDanh}
                      src={system.logo}
                      className={style.cinemaLogoAvatar}
                    />
                  }
                  {...a11yProps(index)}
                  key={system.maHeThongRap}
                  onClick={() => handleChangeSystemCinema(system.maHeThongRap)}
                />
              );
            })}
          </Tabs>

          {systemCine.map((item, index) => (
            <TabPanel
              className={style.cinemaByIdList}
              value={value}
              index={index}
              indicatorColor="#cccccc"
            >
              <Tabs
                orientation="vertical"
                variant="scrollable"
                aria-label="Vertical tabs example"
                value={value2}
                onChange={handleChange2}
                sx={{
                  borderRight: 1,
                  borderColor: "divider",
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#00ac4d",
                  },
                }}
              >
                {inforSysCine.map((info, index) => (
                  <Tab
                    label={
                      <Button
                        style={{
                          position: "relative",
                          textAlign: "left",
                          height: "90px",
                        }}
                        onClick={() => handleChangeRap(info.maCumRap)}
                      >
                        <div className={style.cinemaLogoTab}>
                          <h5 className={style.cinemaTenCumRap}>
                            {info.tenCumRap}
                          </h5>
                          <h6 className={style.cinemaDiaChi}>{info.diaChi}</h6>
                        </div>
                      </Button>
                    }
                    {...a11yProps(index)}
                  ></Tab>
                ))}
              </Tabs>
            </TabPanel>
          ))}
          {inforSysCine.map((info, index) => (
            <TabPanel
              value={value2}
              index={index}
              className={style.cinemaTabPannel}
              indicatorColor="#fff"
            >
              {lichChieuTheoCum.map((cumRap, index) => (
                <Box sx={{ width: "100%" }} key={cumRap.maCumRap}>
                  {cumRap.danhSachPhim
                    .filter((phim) => phim.dangChieu)
                    .map((phim) => (
                      <div key={phim.maPhim} className={style.movieSingle}>
                        <img
                          src={phim.hinhAnh}
                          alt=""
                          width="100px"
                          height="126px"
                        />
                        <div className={style.phimInfo}>
                          <h2 className={style.tenPhim}>
                            <span className={style.limitAge}>C18</span>
                            {phim.tenPhim}
                          </h2>
                          <div className={style.ngayGioChieuContainer}>
                            {phim.lstLichChieuTheoPhim
                              .slice(0, 4)
                              .map((lichChieu) => {
                                const date = new Date(
                                  lichChieu.ngayChieuGioChieu
                                );
                                const formattedDate = dayjs(
                                  lichChieu.ngayChieuGioChieu
                                ).format("DD-MM-YYYY ~ HH:mm");
                                return (
                                  <div key={lichChieu.maLichChieu}>
                                    <button
                                      className={style.ngayGioChieuButton}
                                      onClick={() =>
                                        navigate(
                                          `/tickets/${lichChieu.maLichChieu}`
                                        )
                                      }
                                    >
                                      {formattedDate}
                                    </button>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    ))}
                </Box>
              ))}
            </TabPanel>
          ))}
        </Box>
      </Container>
    </div>
  );
}
