import React from "react";
import styled from "styled-components";

const StyledTitle = styled.h1`
  font-size: 1.5rem;
  color: #000;
  margin: 0;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-family: "Helvetica Neue", helvetica;
  letter-spacing: 1px;
  text-align: center;

  @media (min-width: 768px) {
    height: 33px;
  }
`;   

const BoldText = styled.span`
  font-weight: 500;
  letter-spacing: 2px;
  font-size: 1.5rem;
`;

const RegularText = styled.span`
  font-weight: 400;
  font-size: 1.3rem;
`;

const Title = ({ children }) => {
  const parts = children.split('||');
  return (
    <StyledTitle>
      <BoldText>{parts[0].trim()}</BoldText>
      {parts[1] && <RegularText> || {parts[1].trim()}</RegularText>}
    </StyledTitle>
  );
};

export default Title; 