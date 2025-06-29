import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Title from "../common/Title";

const SuccessContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const SuccessMessage = styled.h2`
  color: #28a745;
  margin-bottom: 1rem;
`;

const PayoutSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/creator');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <SuccessContainer>
      <Title>PAYOUT SUCCESS</Title>
      <SuccessMessage>Your payout has been initiated successfully!</SuccessMessage>
      <p>You will receive the funds in your bank account within 1-3 business days.</p>
      <p>Redirecting to dashboard in 5 seconds...</p>
    </SuccessContainer>
  );
};

export default PayoutSuccess; 