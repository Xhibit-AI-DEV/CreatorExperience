import React from "react";
import styled from "styled-components";
import Button from "./common/Button";

interface FeatureBlockProps {
  title: string;
  buttonText: string;
  imageUrl: string;
  reverse?: boolean;
  onButtonClick?: () => void;
}

const Section = styled.section<{ reverse?: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.reverse ? "row-reverse" : "row")};
  align-items: center;
  min-height: 100vh;
  padding: 4rem 2rem;
  background: #fff;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 2rem 1rem;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  letter-spacing: 1px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
    text-align: center;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const FeatureBlock: React.FC<FeatureBlockProps> = ({
  title,
  buttonText,
  imageUrl,
  reverse,
  onButtonClick,
}) => {
  return (
    <Section reverse={reverse}>
      <Content>
        <Title>{title}</Title>
        <ButtonContainer>
          <Button size="large" onClick={onButtonClick}>
            {buttonText}
          </Button>
        </ButtonContainer>
      </Content>
      <ImageContainer>
        <Image src={imageUrl} alt={title} />
      </ImageContainer>
    </Section>
  );
};

export default FeatureBlock;
