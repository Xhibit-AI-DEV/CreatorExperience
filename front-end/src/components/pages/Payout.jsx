import React, { useState, useEffect } from "react";
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
  border-radius: 2px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: linear-gradient(to bottom, #e2dedc,rgba(9, 3, 0, 0.41));
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

const Payout = () => {
    const [balance, setBalance] = useState("0.00");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const convertXBTtoUSD = (xbtBalance) => {
    // Convert XBT to cents (1 XBT = 1 cent)
    const cents = xbtBalance;
    // Convert cents to dollars
    const dollars = cents / 100;
    // Format to 2 decimal places
    return dollars.toFixed(2);
  };

  useEffect(() => {
    const fetchBalance = async () => {
      const walletAddress = localStorage.getItem("walletAddress");
      if (!walletAddress) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.AUTH.GET_BALANCE}`, {
          params: { publicKey: walletAddress }
        });
        // Convert XBT balance to USD
        const usdBalance = convertXBTtoUSD(response.data.balance || 0);
        setBalance(usdBalance);
      } catch (error) {
        console.error("Error fetching balance:", error);
        setError("Failed to fetch balance");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, [navigate]);
  
  return (
    <DashboardForm>
      <TitleContainer>
       <Title>XHIBIT</Title>
      </TitleContainer>
      <WalletInfo>
        <XhibitLogo src="/XhibitLogo.jpg" alt="Xhibit Logo" />
        <WalletDisplayContainer>
          <WalletInfoTitle>WALLET</WalletInfoTitle>
          <ConversionExplanation>1 XBT = 1 CENT</ConversionExplanation>
          <ConversionExplanation>CURRENT BALANCE </ConversionExplanation>
          <WalletBalance>{isLoading ? "Loading..." : `$${balance} USD`}</WalletBalance>
        </WalletDisplayContainer>
      </WalletInfo>
    </DashboardForm>
  );
};

export default Payout;