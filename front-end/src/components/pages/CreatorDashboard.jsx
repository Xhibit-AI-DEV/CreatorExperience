import React, { useState } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import Title from "../common/Title";
import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../../config/api";

const DashboardForm = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding-left: 3rem;
  padding-right: 3rem;
  padding-top: 1rem;
  padding-bottom: 6rem;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: #e2dedc;
  backdrop-filter: blur(5px);
  position: relative;
  overflow: visible;

  @media (min-width: 768px) {
    margin-bottom: 4.5rem;
  }

  @media (min-width: 768px) {
    margin-bottom: 4rem;
  }
`;
const TitleContainer = styled.div`
  justify-content: flex-start;
  margin-bottom: 0.1rem;
`;
const WalletInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: row;
  justify-content: flex-start;
  margin-bottom: 1rem;
  background-color: rgba(255, 254, 253, 0.88);
  width: 100%;
  border-radius: 6px;
  padding: 1.6rem;
  margin-top: 2rem;
  font-family: "Helvetica Neue", helvetica;
  color: rgba(30, 23, 9, 1);
`;
const WalletDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: column;
  justify-content: flex-start;
`;
const WalletInfoTitle = styled.h1`
  font-size: 1.1rem;
  font-weight: 800;
  margin: 0rem 0 0 1rem;
`;
const ConversionExplanation = styled.p`
  font-size: 0.8rem;
  font-weight: 400;
  margin: 0.3rem 0 0 1rem;
`;
const WalletBalance = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
  background-color: #fff;
  border: 1px solid rgba(30, 23, 9, 1);
`;

const XhibitLogo = styled.img`
  width: 100px;
  height: 100px;
`;

const CreatorDashboard = () => {
  return (
    <DashboardForm>
      <TitleContainer>
        <Title>XHIBIT</Title>
      </TitleContainer>
      <WalletInfo>
        <XhibitLogo src="/XhibitLogo.jpg" alt="Xhibit Logo" />
        <WalletDisplayContainer>
          <WalletInfoTitle>WALLET</WalletInfoTitle>
          <ConversionExplanation>10 XBT = 10 CENTS</ConversionExplanation>
          {/*         <WalletBalance>Balance: 0.000000000000000000</WalletBalance>
           */}{" "}
        </WalletDisplayContainer>
      </WalletInfo>
    </DashboardForm>
  );
};

export default CreatorDashboard;
