import React from "react";
import styled from "styled-components";
import { ButtonProps } from "../../types/common";

const StyledButton = styled.button<ButtonProps>`
  padding: ${(props) =>
    props.size === "large" ? "1rem 2.5rem" : "0.8rem 2rem"};
  font-size: ${(props) => (props.size === "large" ? "1.2rem" : "1rem")};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  background: ${(props) =>
    props.variant === "secondary" ? "transparent" : "#000"};
  color: ${(props) => (props.variant === "secondary" ? "#000" : "#fff")};
  border: ${(props) =>
    props.variant === "secondary" ? "2px solid #000" : "none"};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
