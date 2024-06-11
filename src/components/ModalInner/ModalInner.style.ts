import styled from "styled-components";

export const CartItem = styled.div`
  padding: 12px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  position: relative;
`;

export const CartItemImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 17px;
`;

export const CartItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ContentName = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
`;

export const ContentPrice = styled.span`
  font-weight: 500;
  font-size: 12px;
`;

export const CartItemDeleteButton = styled.div`
  position: absolute;
  right: 7px;
`;

export const TotalPriceStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 0;
  padding-right: 5px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  font-weight: 700;
`;

export const TotalPriceTitle = styled.p`
  font-size: 16px;
`;

export const TotalPrice = styled.p`
  font-size: 24px;
`;
