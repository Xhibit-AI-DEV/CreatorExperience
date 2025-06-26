import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Title from "../common/Title";
import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../../config/api";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axios";


const DashboardForm = styled.form`
  max-width: 400px;
  height: 100%;
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
  background: linear-gradient(to bottom, #e2dedc, rgba(9, 3, 0, 0.41));
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
  background-color: rgba(255, 254, 253, 0.47);
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
  letter-spacing: 0.05rem;
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
  padding: ${(props) =>
    props.size === "large" ? "1rem 2.5rem" : "0.8rem 1.5rem"};
  font-size: ${(props) => (props.size === "large" ? "0.9rem" : "0.7rem")};
  border: none;
  border-radius: 3px;
  margin-top: 1rem;
  margin-left: 1rem;
  cursor: pointer;
  font-weight: 400;
  width: 200px;
  height: 35px;
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

  @media (max-width: 768px) {
    width: 200px;
    height: 35px;
    margin-left: 1rem;
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

const LookBookDisplayContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 1rem;
  background-color: rgba(255, 254, 253, 0.47);
  width: 100%;
  border-radius: 6px;
  padding: 1.6rem;
  margin-top: 2rem;
  font-family: "Helvetica Neue", helvetica;
  color: rgba(30, 23, 9, 1);
`;

const LookbookCover = styled.img`
  width: 140px;
  height: 165px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.62);

  @media (max-width: 768px) {
    width: 140px;
    height: 165px;
  }
`;

const LookbookInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  margin-top: 0.5rem;
`;

const LookbookTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.2rem 0;
  font-family: "Helvetica Neue", helvetica;
  color: rgba(30, 23, 9, 1);
  letter-spacing: 0.05rem;
`;

const LookbookStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
`;

const LookbookEarnings = styled.p`
  font-size: 0.9rem;
  font-weight: 400;
  margin: 0;
  font-family: "Helvetica Neue", helvetica;
  color: rgba(30, 23, 9, 1);
`;

const ViewButton = styled.button`
  font-size: ${(props) => (props.size === "large" ? "1rem" : "0.9rem")};
  border: none;
  margin-top: 3.3rem;
  margin-left: 7rem;
  cursor: pointer;
  font-weight: 500;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    margin-left: 6.5rem;
    margin-top: 3.3rem;
    font-size: 1rem;
  }
`;

const ArrowIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 0.1rem;
`;

const LoadingText = styled.p`
  text-align: center;
  color: #666;
  font-size: 1rem;
  margin: 2rem 0;
`;

const NoLookbooksText = styled.p`
  text-align: center;
  color: #666;
  font-size: 1rem;
  margin: 2rem 0;
`;

const CreatorDashboard = () => {
  const [balance, setBalance] = useState("0.00");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log("CreatorDashboard - Current user:", user);
  const [lookbooks, setLookbooks] = useState([]);

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
        const response = await axios.get(
          `${API_BASE_URL}${API_ENDPOINTS.AUTH.GET_BALANCE}`,
          {
            params: { publicKey: walletAddress },
          }
        );
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

  useEffect(() => {
    const fetchLookbooks = async () => {
      try {
        console.log("CreatorDashboard - Fetching lookbooks for wallet:", user?.wallet);
        if (!user?.wallet) {
          console.log("CreatorDashboard - No wallet found, returning early");
          return;
        }
        
        const response = await axiosInstance.get(`/api/lookbook/wallet/${user.wallet}`);
        const lookbooks = response.data.lookbooks;
        console.log("CreatorDashboard - API Response:", response.data);
        
        if (lookbooks) {
          setLookbooks(lookbooks);
        }
      } catch (error) {
        console.error("CreatorDashboard - Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLookbooks();
  }, [user?.wallet]);

  const handlePayout = async () => {
    // TODO: Implement payout functionality
    console.log("Payout requested");
  };

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
          <WalletBalance>
            {isLoading ? "Loading..." : `$${balance} USD`}
          </WalletBalance>
          <PayoutButton onClick={handlePayout}>REQUEST PAYOUT</PayoutButton>
        </WalletDisplayContainer>
      </WalletInfo>
      <LookBooksTitle>LOOKBOOKS</LookBooksTitle>
      
      {isLoading ? (
        <LoadingText>Loading lookbooks...</LoadingText>
      ) : lookbooks.length === 0 ? (
        <NoLookbooksText>No lookbooks found</NoLookbooksText>
      ) : (
        lookbooks.map((lookbook) => (
          <LookBookDisplayContainer key={lookbook.id}>
            <LookbookCover src={lookbook.coverImage || "/lookbookCover.png"} alt="Lookbook Cover" />
            <LookbookInfo>
              <LookbookTitle>{lookbook.title || `Lookbook #${lookbook.id}`}</LookbookTitle>
              <LookbookStats>
                <LookbookEarnings>EARNINGS: ${lookbook.earnings || 0}</LookbookEarnings>
              </LookbookStats>
              <ViewButton>
                VIEW IN APP
                <ArrowIcon src="/arrowIcon.png" alt="Arrow" />
              </ViewButton>
            </LookbookInfo>
          </LookBookDisplayContainer>
        ))
      )}
    </DashboardForm>
  );
};

export default CreatorDashboard;
