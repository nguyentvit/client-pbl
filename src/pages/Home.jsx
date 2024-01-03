import BannerBackground from "../img/home3.png";
import "./Styles.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Meeting <br /> Without a Hitch
          </h1>
          <p className="primary-text">
            Distance doesn't matter, it's the meeting that matter the most
          </p>
          <button className="secondary-button">Explored </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
