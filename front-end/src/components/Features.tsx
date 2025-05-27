import React from "react";
import styled from "styled-components";
import FeatureBlock from "./FeatureBlock";
import { SectionProps } from "../types/common";

const FeaturesContainer = styled.div`
  width: 100%;
`;

const Features: React.FC<SectionProps> = ({ className }) => {
  return (
    <FeaturesContainer className={className}>
      <FeatureBlock
        title="TRY ON INDEPENDENT LABELS AND BRANDS WITH YOUR DIGITAL TWIN"
        buttonText="TRY IN APP"
        imageUrl="https://placehold.co/800x600"
      />
      <FeatureBlock
        title="CREATE IMMERSIVE LOOKBOOKS SIMPLY BY UPLOADING IMAGES"
        buttonText="CREATE LOOKBOOKS"
        imageUrl="https://placehold.co/800x600"
        reverse
      />
    </FeaturesContainer>
  );
};

export default Features;
