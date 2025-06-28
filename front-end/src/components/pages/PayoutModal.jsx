import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Transak } from '@transak/transak-sdk';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: rgba(255, 254, 253);
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 260px;
`;

const CloseIcon = styled.img`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 20px;
  height: 20px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 80%;
  padding: 0.8rem;
  border: none;
  border-bottom: 2px solid #ccc;
  border-radius: 0;
  font-size: 1rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
  background: #fff;
  text-align: center;

  &:focus {
    outline: none;
  }
`;

const PayoutTitle = styled.h1`
  font-size: 1.1rem;
  font-weight: 800;
  margin: 1rem 0 0 1rem;
  letter-spacing: 0.05rem;
`;

const SubmitButton = styled.button`
  padding: 0.8rem;
  font-size: 1rem;
  border: none;
  border-radius: 3px;
  margin-top: 0.5rem;
  margin-left: 1rem;
  cursor: pointer;
  font-weight: 400;
  width: 300px;
  height: 45px;
  background: #000;
  color: #fff;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    width: 350px;
    height: 55px;
    margin-left: 1rem;
    font-size: 0.9rem;
    padding: 0.6rem;
  }
`;

const PayoutModal = ({ balance, onClose, userWallet }) => {
  const [payoutAmount, setPayoutAmount] = useState("");
  const [isProcessingPayout, setIsProcessingPayout] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setPayoutAmount("");
    setError(null);
    setIsProcessingPayout(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (payoutAmount.trim()) {
      // Initialize Transak widget for XLM to USD off-ramp
      const transak = new Transak({
        apiKey: process.env.REACT_APP_TRANSAK_API_KEY, // Replace with your actual API key
        environment: 'STAGING', // Change to 'PRODUCTION' for live
        walletAddress: userWallet,
        defaultCryptoCurrency: 'XLM',
        cryptoCurrencyList: 'XLM',
        fiatCurrency: 'USD',
        countryCode: 'US',
        themeColor: '#007bff',
        redirectURL: window.location.origin,
        hideMenu: false,
        isDisableCrypto: false,
        isDisableFiat: true, // Only allow crypto to fiat (off-ramp)
        exchangeScreenTitle: 'Withdraw XLM to USD',
        cryptoAmount: payoutAmount,
        defaultNetwork: 'stellar',
        networks: 'stellar',
        defaultPaymentMethod: 'card',
        paymentMethod: 'card',
        defaultMode: 'sell', // Set to sell mode for off-ramp
      });

      // Open the Transak widget
      transak.init();
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleOverlayClick = () => {
    if (!isProcessingPayout) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent onClick={handleModalClick}>
        <CloseIcon src="/closeIcon.png" alt="Close" onClick={onClose} />
        <PayoutTitle>Enter the amount you'd like to withdraw:</PayoutTitle>
      
        <form onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            type="number"
            placeholder="AMOUNT(USD)"
            value={payoutAmount}
            onChange={(e) => setPayoutAmount(e.target.value)}
            max={balance}
            required
            disabled={isProcessingPayout}
          />
          </InputContainer>
          {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          >
            
            <SubmitButton
              type="submit"
              className="primary"
              disabled={isProcessingPayout}
            >
              {isProcessingPayout ? "Processing..." : "SUBMIT REQUEST"}
            </SubmitButton>

          </div>
        </form>
          
      </ModalContent>
    </ModalOverlay>
  );
};

export default PayoutModal;
