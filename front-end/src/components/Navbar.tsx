import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface NavbarProps {
  className?: string;
}

interface StyledNavProps {
  isScrolled?: boolean;
}

interface MenuItemsProps {
  isOpen: boolean;
}

const Nav = styled.nav<StyledNavProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  background: rgb(1, 1, 1);
  transition: all 0.3s ease;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const MenuItems = styled.div<MenuItemsProps>`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: ${(props) => (props.isOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgb(1, 1, 1);
    padding: 1rem;
    gap: 1rem;
  }
`;

const MenuItem = styled.a`
  text-decoration: none;
  color: #fff;
  font-weight: 500;
  transition: all 0.3s ease;
  letter-spacing: 1px;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #fff;
  transition: opacity 0.3s ease;

  @media (max-width: 768px) {
    display: block;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Nav className={className}>
      <Logo>XHIBIT.AI</Logo>
      <MenuButton onClick={toggleMenu}>☰</MenuButton>
      <MenuItems isOpen={isOpen}>
        <MenuItem href="#">HOME</MenuItem>
        <MenuItem href="#">CREATORS</MenuItem>
        <MenuItem href="#">FAQ</MenuItem>
      </MenuItems>
    </Nav>
  );
};

export default Navbar;
