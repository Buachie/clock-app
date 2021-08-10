import DisplayQuote from "./components/DisplayQuote";
import Menu from "./components/Menu";
import "./scss/main.css";
import { useState, useEffect } from "react";
import { fetchTimeData, TimeData, fetchLocation, Location } from "./API";

//Images
import SunIcon from "./assets/desktop/icon-sun.svg";
import MoonIcon from "./assets/desktop/icon-moon.svg";
import ArrowUp from "./assets/desktop/icon-arrow-up.svg";
import ArrowDown from "./assets/desktop/icon-arrow-down.svg";

const App: React.FC = () => {
  const [time, setTime] = useState<any>();
  const [period, setPeriod] = useState<string>("");
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
    let displayHour: number | null = null;
    let minutes: any = currentTime.getMinutes();

    //Adds a 0 to the to the minutes during the first 10 minutes of each hour
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    if (hour > 12) {
      displayHour = hour - 12;
    } else {
      displayHour = hour;
    }

    setTime(`${displayHour}:${minutes}`);
    if (hour >= 0 && hour <= 11) {
      setGreeting("GOOD MORNING");
      setDayTime(true);
      setPeriod("AM");
    } else if (hour >= 12 && hour <= 17) {
      setGreeting("GOOD AFTERNOON");
      setDayTime(true);
      setPeriod("PM");
    } else {
      setGreeting("GOOD EVENING");
      setDayTime(false);
      setPeriod("PM");
    }
  };

  useEffect(() => {
    getTimeData();
    getTime();
  }, [timeData]);

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="App">
      <div className={`background ${dayTime ? "daytime" : "nighttime"}`}>
        <div className="content">
          {!displayMenu ? <DisplayQuote /> : null}
          <div className="info-container">
            <div className="clock-flex">
              <div className="greeting">
                <img
                  className={dayTime ? "sun-icon" : "moon-icon"}
                  src={dayTime ? SunIcon : MoonIcon}
                  alt="Sun/Moon Icon"
                />
                <p>
                  {greeting}
                  <span>, IT'S CURRENTLY</span>
                </p>
              </div>
              <div className="clock">
                <h1 className="current-time">{time}</h1>
                <div className="time-data">
                  <p className="time-period">{period}</p>
                  <p className="time-zone">{timeData?.abbreviation}</p>
                </div>
              </div>
              <h2 className="location">
                In {location?.city + ", " + location?.country_code}
              </h2>
            </div>
            <button
              className="more-info"
              onClick={() => setDisplayMenu(!displayMenu)}
            >
              <p>{displayMenu ? "Less" : "More"}</p>
              <img src={displayMenu ? ArrowDown : ArrowUp} alt="" />
            </button>
          </div>
          <Menu active={displayMenu} daytime={dayTime} />
        </div>
      </div>
    </div>
  );
};

export default App;
