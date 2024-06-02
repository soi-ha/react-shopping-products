import styled from "styled-components";
import STYLE from "@constants/style";

export const Header = styled.section`
  margin-bottom: 28px;
`;

export const Title = styled.h2`
  color: ${STYLE.COLOR.black};
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
`;

export const SelectBoxGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SelectBox = styled.select`
  width: 125px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 8px;
`;
