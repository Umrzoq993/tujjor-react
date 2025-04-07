// src/pages/LandingPage.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { Facebook, Instagram } from "lucide-react";
import { BsTelegram } from "react-icons/bs";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Landing>
      <Content>
        <Hero>
          <Title>Tujjor Express</Title>
          <Subtitle>
            Sizga eng tezkor va ishonchli yuk yetkazish xizmati
          </Subtitle>
          <CtaButton href="/register-physical">Boshlash</CtaButton>
        </Hero>
      </Content>

      <Footer>
        <Social>
          <a href="https://facebook.com">
            <Facebook size={20} />
          </a>
          <a href="https://instagram.com">
            <Instagram size={20} />
          </a>
          <a href="https://t.me/tujjorexpress">
            <BsTelegram size={20} />
          </a>
        </Social>
        <p>© 2025 Tujjor Express</p>
      </Footer>
    </Landing>
  );
}

// ========== Styled Components ==========

const Landing = styled.div`
  font-family: "Poppins", sans-serif;
  overflow: hidden;
  position: relative;
  min-height: 100vh;
`;

const Header = styled.header`
  position: absolute;
  top: 0;
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 3;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #fff;
`;

const MenuToggle = styled.div`
  display: none;
  flex-direction: column;
  gap: 4px;
  span {
    width: 25px;
    height: 3px;
    background: #fff;
  }
  @media (max-width: 768px) {
    display: flex;
  }
`;

const Nav = styled.nav`
  ul {
    list-style: none;
    display: flex;
    gap: 2rem;
    li a {
      text-decoration: none;
      color: #fff;
      font-size: 1rem;
      transition: color 0.3s ease;
      &:hover {
        color: #f0a500;
      }
    }
  }
  @media (max-width: 768px) {
    position: absolute;
    top: 60px;
    right: 0;
    background: rgba(0, 0, 0, 0.8);
    padding: 1rem 2rem;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    ul {
      flex-direction: column;
      gap: 1rem;
    }
    &.open {
      transform: translateX(0);
    }
  }
`;

const Content = styled.div`
  height: 100vh;
  width: 100vw;
  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("/back-hero.png") no-repeat top center/cover;
    z-index: -1;
  }
`;

const Hero = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #fff;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Subtitle = styled.p`
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const CtaButton = styled.a`
  background: #f0a500;
  color: #fff;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background 0.3s ease;
  &:hover {
    background: #cf8600;
  }
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  text-align: center;
  padding: 1rem 0;
`;

const Social = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
  a {
    color: #fff;
    &:hover {
      color: #f0a500;
    }
  }
`;
