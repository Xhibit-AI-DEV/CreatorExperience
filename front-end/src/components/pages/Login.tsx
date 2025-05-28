import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import backgroundImage from '../images/background-static.png';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #000;
  font-family: 'Montserrat', sans-serif;

  @media (min-width: 768px) {
    padding: 4rem;
  }
`;

const LoginForm = styled.form`
  width: 100%;
  min-height: 800px;
  max-width: 400px;
  margin: 0 auto;
  padding: 6rem;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  @media (min-width: 768px) {
    margin-bottom: 4rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-top: -4rem;
  margin-bottom: 32rem;
  text-align: center;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 350px;
  padding: 0.75rem;
  border: 1px solid #000;
  border-radius: 3px;
  font-size: 1rem;
  transition: border-color 0.2s;
  background-color: rgba(255, 255, 255, 0.8);

  &:focus {
    outline: none;
    border-color: rgb(4, 4, 4);
  }
`;


const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt with:', { email, password });
  };

  return (
    <LoginContainer>
      <div></div> {/* Empty div for spacing */}
      
      <LoginForm onSubmit={handleSubmit}>
      <Title>XHIBIT</Title>
        <InputGroup>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="EMAIL"
            required
          />
        </InputGroup>
        <InputGroup>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="PASSWORD"
            required
          />
        </InputGroup>
        <Button type="submit">CONTINUE</Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login; 