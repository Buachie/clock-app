import DisplayQuote from "./components/DisplayQuote";
import Menu from "./components/Menu";
import "./scss/main.css";
import { useState, useEffect } from "react";
import { fetchLocation, Location } from "./API";

//Images
import SunIcon from "./assets/desktop/icon-sun.svg";
import MoonIcon from "./assets/desktop/icon-moon.svg";
import Daytime from "./assets/desktop/bg-image-daytime.jpg";
import Nighttime from "./assets/desktop/bg-image-nighttime.jpg";
import ArrowUp from "./assets/desktop/icon-arrow-up.svg";
import ArrowDown from "./assets/desktop/icon-arrow-down.svg";

const App: React.FC = () => {
  const [time, setTime] = useState<any>();
  const [location, setLocation] = useState<Location>();
  const [dayTime, setDayTime] = useState<boolean>(true);
  const [greeting, setGreeting] = useState<string>("");
  const [displayMenu, setDisplayMenu] = useState<boolean>(false);

  const getLocation = async () => {
    const newLocation = await fetchLocation();
    setLocation(newLocation);
  };

  const getTime = () => {
    let currentTime = new Date();
    let hour = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    setTime(`${hour}:${minutes}`);
    if (hour > 4 && hour < 12) {
      setGreeting("GOOD MORNING, IT'S CURRENTLY");
      setDayTime(true);
    } else if (hour > 12 && hour < 17) {
      setGreeting("GOOD AFTERNOON, IT'S CURRENTLY");
      setDayTime(true);
    } else {
      setGreeting("GOOD EVENING, IT'S CURRENTLY");
      setDayTime(false);
    }
  };

  useEffect(() => {
    getLocation();
    getTime();
  }, [location]);
  //console.log(location);

  return (
    <div
      className="App"
      style={
        dayTime
          ? {
              background: `url(${Daytime})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }
          : {
              background: `url(${Nighttime})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }
      }
    >
      <div className="background-overlay"></div>
      <div className="content">
        <DisplayQuote />
        <div className="info-container">
          <div className="greeting">
            <img src={dayTime ? SunIcon : MoonIcon} alt="Sun/Moon Icon" />
            <p>{greeting}</p>
          </div>
          <div className="clock">
            <h1 className="current-time">{time}</h1>
            <p className="time-zone">{location?.abbreviation}</p>
          </div>
          <button
            className="more-info"
            onClick={() => setDisplayMenu(!displayMenu)}
          >
            <p>{displayMenu ? "Less" : "More"}</p>
            <img src={displayMenu ? ArrowDown : ArrowUp} alt="" />
          </button>
        </div>
      </div>
      <Menu active={displayMenu} />
    </div>
  );
};

export default App;
