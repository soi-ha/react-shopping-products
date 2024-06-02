import styled from "styled-components";

export const ProductListStyle = styled.section`
  display: grid;
  grid-template-columns: 0fr 0fr;
  gap: 16px 20px;
  justify-content: space-between;
`;

export const Loading = styled.div`
  font-size: 30px;
  font-weight: 700;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Empty = styled(Loading)`
  font-size: 17px;
  font-weight: 500;
`;
