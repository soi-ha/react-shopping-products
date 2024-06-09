import styled from "styled-components";

export const Button = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
`;

export const CartControlButtonStyle = styled(Button)`
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 4px 8px;
  gap: 1px;
  font-weight: 600;
  font-size: 12px;

  img {
    width: 14px;
    height: 14px;
  }
`;

export const AddCartStyle = styled(CartControlButtonStyle)`
  background-color: ${({ theme }) => theme.color.black};
  color: ${({ theme }) => theme.color.white};
`;
export const RemoveCartStyle = styled(CartControlButtonStyle)`
  background-color: ${({ theme }) => theme.color.gray234};
  color: ${({ theme }) => theme.color.black};
`;

export const CountButtonStyle = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.white};
  width: 24px;
  height: 24px;
  font-size: 20px;
`;

export const ButtonStyle = styled(Button)`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.white};
  padding: 4px 9px;
  font-size: 12px;
  color: rgba(10, 13, 19, 1);
`;
