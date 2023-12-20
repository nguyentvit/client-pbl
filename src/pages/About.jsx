// import React from "react";
// import { BsFillPlayCircleFill } from "react-icons/bs";
import AboutBackground from "../img/home4.png";
import "./Styles.css";
import { FaLightbulb } from "react-icons/fa";
import { LuAlarmClock } from "react-icons/lu";
import { MdOutlineSecurity } from "react-icons/md";
const About = () => {
  return (
    <div className="about-section-container">
      <div className="about-section-container-left">
        <div className="about-section-text-container">
          {/* <p className="primary-subheading">About</p> */}
          <h3 className="about-primary-heading">
            More fun <br /> with effect <br /> filters{" "}
          </h3>
          <div className="about-background-image-container">
            <img src={AboutBackground} alt="" />
          </div>
        </div>
      </div>

      <div className="about-section-container-right">
        <div className="content-container">
          <div
            className="content-container-item"
            style={{
              width: "220px",
              height: "220px",
              background: "#FFCBCB",
              borderRadius: 20,
            }}
          >
            <div
              className="icon-container"
              style={{
                width: "50px",
                height: "50px",
                background: "#62C6FF",
                backdropFilter: "blur(4px)",
                borderRadius: "100%",
              }}
            >
              <FaLightbulb
                style={{
                  width: "40px",
                  height: "40px",
                  color:"white",
                  // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
              />
            </div>
            <h6 className="" style={{ color: "black" }}>
              Easy to share my idea and connect everyone
            </h6>
          </div>

          <div
            className="content-container-item"
            style={{
              width: "220px",
              height: "220px",
              background: "#FFE5E2",
              borderRadius: 20,
            }}
          >
            <div
              className="icon-container"
              style={{
                width: "50px",
                height: "50px",
                background: "#62C6FF",
                backdropFilter: "blur(4px)",
                borderRadius: "100%",

              }}
            >
              <LuAlarmClock
                style={{
                  width: "39px",
                  height: "39px",
                  color:"white",
                }}
              />
            </div>
            <h6 className="" style={{ color: "black" }}>
            Fastly and save your time </h6>
            
          </div>

          <div
            className="content-container-item"
            style={{
              width: "220px",
              height: "220px",
              background: "#C5EDF0",
              borderRadius: 20,
            }}
          >
            <div
              className="icon-container"
              style={{
                width: "50px",
                height: "50px",
                background: "#62C6FF",
                backdropFilter: "blur(4px)",
                borderRadius: "100%",
              }}
            >
              <MdOutlineSecurity style={{ width: "40px", height: "40px" ,color:"white",}} />
            </div>
            <h6 style={{ color: "black" }}>
              Protect Informations
            </h6>
          </div>
        </div>
        <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default About;
