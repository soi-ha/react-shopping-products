import styled from "styled-components";

export const ErrorToastStyle = styled.div`
  background-color: ${({ theme }) => theme.color.red};
  width: 429px;
  height: 40px;
  padding: 12px 77px;
  position: fixed;
  top: 64px;
  box-sizing: border-box;
  z-index: ${({ theme }) => theme.zIndex.header};
`;
