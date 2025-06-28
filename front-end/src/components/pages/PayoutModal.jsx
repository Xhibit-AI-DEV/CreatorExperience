import React, { useState } from "react";
import styled from "styled-components";

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
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;
  
  &.primary {
    background: #000;
    color: #fff;
  }
  
  &.secondary {
    background: #f0f0f0;
    color: #333;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const PayoutModal = ({ isOpen, onClose, balance }) => {
  const [payoutAmount, setPayoutAmount] = useState("");
  const [isProcessingPayout, setIsProcessingPayout] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!payoutAmount || parseFloat(payoutAmount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (parseFloat(payoutAmount) > parseFloat(balance)) {
      setError("Amount exceeds available balance");
      return;
    }

    setIsProcessingPayout(true);
    setError(null);

    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Payout requested for:", payoutAmount);
      alert(`Payout request submitted for $${payoutAmount}! This is a demo - no actual payout will be processed.`);
      
      // Close modal after successful submission
      handleClose();
      
    } catch (error) {
      console.error("Payout error:", error);
      setError("Failed to process payout. Please try again.");
    } finally {
      setIsProcessingPayout(false);
    }
  };

  const handleClose = () => {
    setPayoutAmount("");
    setError(null);
    setIsProcessingPayout(false);
    onClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleOverlayClick = () => {
    if (!isProcessingPayout) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent onClick={handleModalClick}>
        <h2>Request Payout</h2>
        <p>Enter the amount you'd like to withdraw:</p>
        
        <form onSubmit={handleSubmit}>
          <Input
            type="number"
            placeholder="Enter amount (USD)"
            value={payoutAmount}
            onChange={(e) => setPayoutAmount(e.target.value)}
            step="0.01"
            min="0"
            max={balance}
            required
            disabled={isProcessingPayout}
          />
          
          {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Button 
              type="button" 
              className="secondary" 
              onClick={handleClose}
              disabled={isProcessingPayout}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="primary"
              disabled={isProcessingPayout}
            >
              {isProcessingPayout ? "Processing..." : "Submit Payout Request"}
            </Button>
          </div>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PayoutModal;
