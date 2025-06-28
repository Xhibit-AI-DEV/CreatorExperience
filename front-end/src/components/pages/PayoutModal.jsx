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
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  margin: 1rem 0;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin: 0.5rem;
  
  &.primary {
    background: #000;
    color: #fff;
  }
  
  &.secondary {
    background: #f0f0f0;
    color: #333;
  }
`;

const PayoutModal = ({ balance, onClose }) => {
  const [payoutAmount, setPayoutAmount] = useState("");

  console.log("PayoutModal rendering, balance:", balance);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    alert(`Payout request submitted for $${payoutAmount}!`);
  };

  const handleClose = () => {
    console.log("Close function called!");
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
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
          />
          
          <div>
            <Button type="submit" className="primary">
              Submit Payout Request
            </Button>
            <Button 
              type="button" 
              className="secondary" 
              onClick={handleClose}
            >
              Close Modal
            </Button>
            
            {/* Add test button */}
            <Button 
              type="button" 
              onClick={() => {
                console.log("Test button in modal clicked!");
                alert("Modal test button works!");
              }}
            >
              Test Button
            </Button>
          </div>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PayoutModal;
