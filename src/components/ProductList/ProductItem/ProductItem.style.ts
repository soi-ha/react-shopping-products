import styled from "styled-components";

export const ProductItemStyle = styled.div`
  background-color: #ffffff;
  color: #000000;
  border-radius: 8px;
  width: 182px;
  height: 224px;
  box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;
`;

export const ProductImg = styled.img`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  width: inherit;
  height: 112px;
  box-sizing: border-box;
`;

export const ProductGroup = styled.div`
  padding: 15px 8px 8px;
  position: relative;
`;

export const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #0a0d13;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  margin-bottom: 4px;
`;

export const ProductName = styled.div`
  font-weight: 700;
  font-size: 14px;
`;