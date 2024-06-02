import styled from "styled-components";
import STYLE from "@constants/style";

export const ErrorToastStyle = styled.div`
  background-color: ${STYLE.COLOR.red};
  width: 429px;
  height: 40px;
  padding: 12px 77px;
  position: fixed;
  top: 64px;
  box-sizing: border-box;
  z-index: ${STYLE.Z_INDEX.header};
`;
