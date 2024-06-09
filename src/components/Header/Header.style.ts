import styled from "styled-components";

export const HeaderStyle = styled.header`
  display: flex;
  background-color: ${({ theme }) => theme.color.black};
  width: inherit;
  height: 64px;
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.header};
  padding: 16px 24px 16px;
  box-sizing: border-box;
`;

export const LogoImg = styled.img`
  width: 56px;
`;

export const CartButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  position: absolute;
  right: 24px;
  bottom: 16px;
`;

export const CartImg = styled.img`
  width: 32px;
`;

export const CartCount = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 999px;
  width: 19px;
  height: 19px;
  font-size: 10px;
  font-weight: 700;
  position: absolute;
  right: 0;
  bottom: 2px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
