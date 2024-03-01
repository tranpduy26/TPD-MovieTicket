import styled from "@emotion/styled";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(16, auto);
  gap: 10px;
  overflow: hidden;
`;

export const ButtonSeatMovie = styled.button`
  width: 2.25rem;
  height: 2.25rem;
  /* font-size: 14px; */
  text-align: center;
  color: white;
  border: 1px solid transparent;
  cursor: pointer;
  border-radius: 5px;
  pointer-events: ${(props) => props.evt};
  background-color: ${(props) => props.bg};
`;

export const NoteSeat = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
  color: white;
`;

export const BackgroundTicket = styled.div`
  background-color: #f18720;

  max-width: 100%;
  margin: 16px 0;
  overflow: hidden;
`;

export const FormatBackground = styled.div`
  width: 100%;
  background: ${(props) => props.bg};
  height: 8px;
  overflow: hidden;
`;

export const MiniCardUl = styled.ul`
  padding: 10px;
  display: flex;
  @media (max-width: 600px) {
    display: block;
  }
`;

export const MiniCardLi = styled.li`
  display: flex;
  width: calc(100% / 3);
  border-right: ${(props) => props.br};
  padding: ${(props) => props.p};

  @media (max-width: 600px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #ccc;
  }
`;

export const TextTicket = styled.p`
  color: white;

  font-size: ${(props) => props.fs};
  font-weight: ${(props) => props.fw};
  padding: ${(props) => props.p};
  margin: ${(props) => props.m};
  padding-left: ${(props) => props.pl};
  padding-right: ${(props) => props.pr};
  padding-top: ${(props) => props.pt};
  padding-bottom: ${(props) => props.pb};
`;
