import React from "react";
import "../styles/main.scss"; // SASS
import { Facebook, Instagram } from "lucide-react";
import { BsTelegram } from "react-icons/bs";

export default function LandingPage() {
  return (
    <div className="landing">
      <header className="header">
        <div className="logo">Tujjor Express</div>
        <nav className="nav">
          <ul>
            <li>
              <a href="#about">Biz haqimizda</a>
            </li>
            <li>
              <a href="#services">Xizmatlar</a>
            </li>
            <li>
              <a href="#contact">Aloqa</a>
            </li>
          </ul>
        </nav>
      </header>

      <div className="content">
        <div className="hero">
          <h1 className="title">Tujjor Express</h1>
        </div>
      </div>
    </div>
  );
}
