import { createContext, useContext, useState } from "react";

const TicketContext = createContext();

const TicketProvider = ({ children }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleSelect = (seat) => {
    // Kiểm tra số lượng ghế đã chọn
    if (selectedSeats.length >= 7) {
      // Sử dụng alert để hiển thị thông báo khi vượt quá 8 ghế
      alert("Bạn không thể chọn quá 7 ghế.");

      // eslint-disable-next-line no-restricted-globals
      return location.reload();
    }

    setSelectedSeats((prevSelectedSeats) => {
      // Kiểm tra xem ghế đã được chọn hay chưa
      const isSeatSelected = prevSelectedSeats.some(
        (item) => item.maGhe === seat.maGhe
      );

      // Nếu ghế đã được chọn, loại bỏ nó khỏi mảng và trừ giá vé của ghế đó khỏi tổng giá vé
      if (isSeatSelected) {
        const newSelectedSeats = prevSelectedSeats.filter(
          (item) => item.maGhe !== seat.maGhe
        );
        const seatPrice = seat.giaVe || 0; // Giá vé của ghế
        setTotalPrice((prevTotalPrice) => prevTotalPrice - seatPrice);
        return newSelectedSeats;
      } else {
        // Nếu ghế chưa được chọn, thêm nó vào mảng và cộng thêm giá vé của ghế đó vào tổng giá vé
        const newSelectedSeats = [...prevSelectedSeats, seat];
        const seatPrice = seat.giaVe || 0; // Giá vé của ghế
        setTotalPrice((prevTotalPrice) => prevTotalPrice + seatPrice);
        return newSelectedSeats;
      }
    });
  };

  const removeSeat = (seat) => {
    setSelectedSeats((prevSelectedSeats) => {
      // Lọc ra các ghế khác với ghế cần xóa
      const newSelectedSeats = prevSelectedSeats.filter(
        (item) => item.maGhe !== seat.maGhe
      );

      // Trừ giá vé của ghế bị xóa khỏi tổng giá vé
      const seatPrice = seat.giaVe || 0;
      setTotalPrice((prevTotalPrice) => prevTotalPrice - seatPrice);

      return newSelectedSeats;
    });
  };

  return (
    <TicketContext.Provider
      value={{ selectedSeats, totalPrice, handleSelect, removeSeat }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export const useTicketContext = () => {
  const value = useContext(TicketContext);
  return value;
};

export default TicketProvider;
