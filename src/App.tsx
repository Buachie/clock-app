import UserTime from "./components/Location";
import DisplayQuote from "./components/DisplayQuote";
import "./scss/main.css";
import { useState, useEffect } from "react";
import { fetchLocation, Location } from "./API";

//Background Images

import Daytime from "./assets/desktop/bg-image-daytime.jpg";
import Nighttime from "./assets/desktop/bg-image-nighttime.jpg";

const App: React.FC = () => {
  const [time, setTime] = useState<any>();
  const [location, setLocation] = useState<Location>();
  const [dayTime, setDayTime] = useState<Boolean>(true);
  const [greeting, setGreeting] = useState<String>("");

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
      setGreeting("Good Morning, It's Currently");
      setDayTime(true);
    } else if (hour > 12 && hour < 17) {
      setGreeting("Good Afternoon, It's Currently");
      setDayTime(true);
    } else {
      setGreeting("Good Evening, It's Currently");
      setDayTime(false);
    }
  };

  useEffect(() => {
    getTime();
  }, [location]);
  console.log(location);
  return (
    <div
      className="App"
      style={
        dayTime
          ? { background: `url(${Daytime})` }
          : { background: `url(${Nighttime})` }
      }
    >
      <DisplayQuote />
      <UserTime />
    </div>
  );
};

export default App;
