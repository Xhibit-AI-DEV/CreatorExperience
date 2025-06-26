import React, { useState } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import Title from "../common/Title";
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../../config/api';
import { useAuth } from "../../context/AuthContext";

const LoginForm = styled.form`
max-height: 1000px;
  max-width: 400px;
  margin: 0 auto;
  padding-left: 3rem;
  padding-right: 3rem;
  padding-top: 1rem;
  padding-bottom: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  backdrop-filter: blur(5px);
  position: relative;
  overflow: visible;

  @media (min-width: 768px) {
    margin-bottom: 4.5rem;
  }
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  maxheight: 600px;
  object-fit: cover;
  z-index: -1;
`;

const InputGroup = styled.div`
  align-items: center;
  display: flex-start;
  flex-direction: column;
  margin-bottom: 1rem;
  position: relative;
  margin-top: auto;
`;

const Input = styled.input`
  width: 350px;
  padding: 0.75rem;
  border: 1px solid #000;
  border-radius: 3px;
  font-size: 1rem;
  margin: 0.5rem;
  transition: border-color 0.2s;
  background-color: rgba(255, 255, 255, 0.3);

  &:focus {
    outline: none;
    border-color: rgb(4, 4, 4);
  }
`;

const TermsLink = styled.a`
  color: #333;
  width: 350px;
  text-decoration: none;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    text-decoration: underline;
  }
`;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;
const StyledCheckbox = styled.div`
  width: 14px;
  height: 14px;
  background: ${(props) => (props.checked ? "#000" : "#fff")};
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 150ms;
`;

// Checkmark icon
const Icon = styled.span`
  color: white;
  font-size: 18px;
`;

const AlertMessage = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.95);
  padding: 1rem 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #333;
  font-size: 1rem;
  z-index: 1000;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from {
      transform: translate(-50%, -100%);
      opacity: 0;
    }
    to {
      transform: translate(-50%, 0);
      opacity: 1;
    }
  }
`;

const TitleContainer = styled.div`
  justify-content: flex-start;
  margin-bottom: 0rem;
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const toggleCheckbox = () => {
    setIsChecked((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isChecked) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log("Login - Making API call for email:", email);
      const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.AUTH.GET_PUBLIC_KEY}`, {
        params: { email }
      });
      
      console.log("Login - API Response:", response.data);
      
      if (response.data.wallet_address) {
        // Store in localStorage
        localStorage.setItem('walletAddress', response.data.wallet_address);
        localStorage.setItem('userEmail', email);
        
        // Update AuthContext
        login({ wallet: response.data.wallet_address, email });
        
        console.log("Login - User data set, navigating to creator");
        navigate('/creator');
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login - Error:", error);
      if (error.response?.status === 404) {
        setError("User not found. Please sign up first.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginForm onSubmit={handleLogin}>
      {showAlert && (
        <AlertMessage>Please accept the terms and conditions</AlertMessage>
      )}
      <BackgroundVideo autoPlay muted loop playsInline>
        <source src="/Background-animation.mp4" type="video/mp4" />
      </BackgroundVideo>
      <TitleContainer>
        <Title>XHIBIT</Title>
      </TitleContainer>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', marginTop: '400px', marginBottom: '10px'}}>
      <InputGroup>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="EMAIL"
          required
        />
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="PASSWORD"
          required
        />
      </InputGroup>
      <TermsLink href="#" onClick={(e) => e.preventDefault()}>
        <CheckboxContainer onClick={toggleCheckbox}>
          <HiddenCheckbox checked={isChecked} readOnly />
          <StyledCheckbox checked={isChecked}>
            {isChecked && <Icon>✓</Icon>}
          </StyledCheckbox>
        </CheckboxContainer>
        AGREE TO TERMS AND CONDITIONS
      </TermsLink>
      <Button type="submit">CONTINUE</Button>
      </div>
    </LoginForm>
  );
};

export default Login;
