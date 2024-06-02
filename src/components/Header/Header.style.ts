import styled from "styled-components";
import STYLE from "@constants/style";

export const HeaderStyle = styled.header`
  display: flex;
  background-color: ${STYLE.COLOR.black};
  width: inherit;
  height: 64px;
  position: fixed;
  z-index: ${STYLE.Z_INDEX.header};
  padding: 16px 24px 16px;
  box-sizing: border-box;
`;

export const LogoImg = styled.img`
  width: 56px;
`;

export const CartImg = styled.img`
  width: 32px;
  position: absolute;
  right: 24px;
  bottom: 16px;
`;

export const CartCount = styled.div`
  background-color: ${STYLE.COLOR.white};
  border-radius: 999px;
  width: 19px;
  height: 19px;
  font-size: 10px;
  font-weight: 700;
  position: absolute;
  right: 24px;
  bottom: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
