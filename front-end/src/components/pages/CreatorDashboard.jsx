import React, { useState } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import Title from "../common/Title";
import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../../config/api";

const DashboardForm = styled.form`
  max-width: 400px;
  height: 700px;
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
  font-size: 1.8rem;
  font-weight: 400;
  width: 170px;
  background-color: #fff;
  padding: 1rem;
  border-radius: 10px;
  margin: 0.6rem 0 0 1rem;
  color: rgba(30, 23, 9, 0.4);

  @media (max-width: 768px) {
    font-size: 1.4rem;
    width: 140px;
    padding: 0.8rem;
  }
`;

const XhibitLogo = styled.img`
  width: 150px;
  height: 150px;

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

const PayoutButton = styled.button`
  padding: ${props => props.size === "large" ? "1rem 2.5rem" : "0.8rem 1.5rem"};
  font-size: ${props => props.size === "large" ? "0.9rem" : "0.7rem"};
  border: none;
  border-radius: 3px;
  margin-top: 1rem;
  margin-left: 5rem;
  cursor: pointer;
  font-weight: 400;
  width: 175px;
  height: 35px;
  transition: all 0.3s ease;
  background: ${props => props.variant === "secondary" ? "transparent" : "#000"};
  color: ${props => props.variant === "secondary" ? "#000" : "#fff"};
  border: ${props => props.variant === "secondary" ? "2px solid #000" : "none"};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    width: 140px;
    height: 30px;
    margin-left: 8.5rem;
    font-size: 0.7rem;
    padding: 0.6rem 1.2rem;
  }
`;

const LookBooksTitle = styled.h1`
  font-size: 1.4rem;
  font-weight: 400;
  margin: 2rem 0 0 0;
  font-family: "Helvetica Neue", helvetica;
  color: rgba(30, 23, 9, 1);
  letter-spacing: 0.2rem;
  align-self: center;
`;

const LookBookContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: column;
  justify-content: center;
  background-color: rgba(255, 254, 253, 0.88);
  width: 100%;
  border-radius: 6px;
  padding: 1.6rem;
  margin-top: 1.7rem;
  font-family: "Helvetica Neue", helvetica;
  color: rgba(30, 23, 9, 1);
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
          <ConversionExplanation>CURRENT BALANCE </ConversionExplanation>
          <WalletBalance>0.00 USD</WalletBalance>
          <PayoutButton>REQUEST PAYOUT</PayoutButton>
        </WalletDisplayContainer>
      </WalletInfo>
      <LookBooksTitle>LOOKBOOKS</LookBooksTitle>
      <LookBookContainer></LookBookContainer>
    </DashboardForm>
  );
};

export default CreatorDashboard;
