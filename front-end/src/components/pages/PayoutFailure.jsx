import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Title from "../common/Title";

const FailureContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const FailureMessage = styled.h2`
  color: #dc3545;
  margin-bottom: 1rem;
`;

const PayoutFailure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/creator');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <FailureContainer>
      <Title>PAYOUT FAILED</Title>
      <FailureMessage>Your payout could not be processed.</FailureMessage>
      <p>Please try again or contact support if the issue persists.</p>
      <p>Redirecting to dashboard in 5 seconds...</p>
    </FailureContainer>
  );
};

export default PayoutFailure; 