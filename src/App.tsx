import DisplayQuote from "./components/DisplayQuote";
import Menu from "./components/Menu";
import "./scss/main.css";
import { useState, useEffect } from "react";
import { fetchTimeData, TimeData, fetchLocation, Location } from "./API";

//Images
import SunIcon from "./assets/desktop/icon-sun.svg";
import MoonIcon from "./assets/desktop/icon-moon.svg";
import Daytime from "./assets/desktop/bg-image-daytime.jpg";
import Nighttime from "./assets/desktop/bg-image-nighttime.jpg";
import ArrowUp from "./assets/desktop/icon-arrow-up.svg";
import ArrowDown from "./assets/desktop/icon-arrow-down.svg";

const App: React.FC = () => {
  const [time, setTime] = useState<any>();
  const [timeData, setTimeData] = useState<TimeData>();
  const [dayTime, setDayTime] = useState<boolean>(true);
  const [greeting, setGreeting] = useState<string>("");
  const [displayMenu, setDisplayMenu] = useState<boolean>(false);
  const [location, setLocation] = useState<Location>();

  const getLocation = async () => {
    const location = await fetchLocation();
    setLocation(location);
  };

  const getTimeData = async () => {
    const worldTime = await fetchTimeData();
    setTimeData(worldTime);
  };

  const getTime = () => {
    let currentTime: Date = new Date();
    let hour = currentTime.getHours();
    let minutes: any = currentTime.getMinutes();

    //Adds a 0 to the to the minutes during the first 10 minutes of each hour
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    setTime(`${hour}:${minutes}`);
    if (hour >= 5 && hour <= 11) {
      setGreeting("GOOD MORNING, IT'S CURRENTLY");
      setDayTime(true);
    } else if (hour >= 12 && hour <= 17) {
      setGreeting("GOOD AFTERNOON, IT'S CURRENTLY");
      setDayTime(true);
    } else {
      setGreeting("GOOD EVENING, IT'S CURRENTLY");
      setDayTime(false);
    }
  };

  useEffect(() => {
    getTimeData();
    getTime();
    getLocation();
  }, [timeData]);
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
              backgroundRepeat: "no-repeat",
            }
          : {
              background: `url(${Nighttime})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
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
            <p className="time-zone">{timeData?.abbreviation}</p>
          </div>
          <h2 className="location">
            In {location?.city + ", " + location?.country_code}
          </h2>
          <button
            className="more-info"
            onClick={() => setDisplayMenu(!displayMenu)}
          >
            <p>{displayMenu ? "Less" : "More"}</p>
            <img src={displayMenu ? ArrowDown : ArrowUp} alt="" />
          </button>
        </div>
        <Menu active={displayMenu} />
      </div>
    </div>
  );
};

export default App;
