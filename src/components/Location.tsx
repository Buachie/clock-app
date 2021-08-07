import { useState, useEffect } from "react";
import { fetchLocation, Location } from "../API";

const UserTime = () => {
  const [location, setLocation] = useState<Location>();
  const [time, setTime] = useState<string>();

  const getLocation = async () => {
    const newLocation = await fetchLocation();
    setLocation(newLocation);
  };

  useEffect(() => {
    getLocation();
    //console.log(location);
    const currentTime = location?.datetime.slice(11, 16);
    setTime(currentTime);
  }, [location]);

  return (
    <div className="data">
      <div className="time">
        <h1 className="clock">{time}</h1>
        <p className="time-zone">{location?.abbreviation}</p>
      </div>
    </div>
  );
};

export default UserTime;
