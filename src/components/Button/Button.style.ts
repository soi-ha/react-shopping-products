import styled from "styled-components";
import STYLE from "@constants/style";

export const ButtonStyle = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
`;

export const CartControlButtonStyle = styled(ButtonStyle)`
  display: flex;
  position: absolute;
  right: 8px;
  align-items: center;
  border-radius: 4px;
  padding: 4px 8px;
  gap: 1px;
  bottom: 15px;
  font-weight: 600;
  font-size: 12px;

  img {
    width: 14px;
    height: 14px;
  }
`;

export const AddCartStyle = styled(CartControlButtonStyle)`
  background-color: ${STYLE.COLOR.black};
  color: ${STYLE.COLOR.white};
`;
export const RemoveCartStyle = styled(CartControlButtonStyle)`
  background-color: ${STYLE.COLOR.gray234};
  color: ${STYLE.COLOR.black};
`;
