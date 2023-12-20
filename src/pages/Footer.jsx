import React from "react";
import Logo from "../img/logo.png";
import { FaGithub } from "react-icons/fa";
import { SiLinkedin } from "react-icons/si";
import { IoIosMail } from "react-icons/io";
import { FaFacebookF } from "react-icons/fa";
import "./Styles.css";
const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-section-one">
        <div className="footer-logo-container">
          <img src={Logo} alt="" />
          <h4 >LiveTalk</h4>
        </div>
        <div className="footer-icons">
          <FaGithub />
          <SiLinkedin />
          <IoIosMail />
          <FaFacebookF />
        </div>
      </div>
      <div className="footer-section-two">
        <div className="footer-section-columns">
          <span>Qualtiy</span>
          <span>Share</span>
          <span>Work</span>
        </div>
        <div className="footer-section-columns">
          <span>54 NguyenLuongBang</span>
          <span>lenguyen23@gmail.com</span>
          <span>nguyenvt@gmail.com</span>
        </div>
        <div className="footer-section-columns">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;