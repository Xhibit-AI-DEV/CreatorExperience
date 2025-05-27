import React from "react";
import styled from "styled-components";
import Button from "./common/Button";
import { SectionProps } from "../types/common";

const HeroSection = styled.section`
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url("https://placehold.co/1920x1080") center/cover no-repeat;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 0 2rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  font-weight: 400;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Hero: React.FC<SectionProps> = ({ className }) => {
  return (
    <HeroSection className={className}>
      <HeroBackground />
      <HeroContent>
        <Title>IMMERSIVE STYLE DISCOVERY</Title>
        <Subtitle>TRY ON GLOBAL DESIGNERS FROM ANYWHERE</Subtitle>
        <Button size="large">TRY IN APP</Button>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;
