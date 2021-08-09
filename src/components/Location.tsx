import { useState, useEffect } from "react";
import { fetchLocation, Location } from "../API";

//Arrow Icons
import ArrowUp from "../assets/desktop/icon-arrow-up.svg";

const UserTime: React.FC = () => {
  const [location, setLocation] = useState<Location>();
  const [time, setTime] = useState<string>();
  const [menu, setMenu] = useState<boolean>(false);

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
      <button className="more-info" onClick={() => setMenu(!menu)}>
        <p>{menu ? "Less" : "More"}</p>
        <img src={ArrowUp} alt="" />
      </button>
      <div className="extra-info">
        <div className="info">
          <p>CURRENT TIMEZONE</p>
          <h2>{location?.timezone}</h2>
        </div>
        <div className="info">
          <p>DAY OF THE YEAR</p>
          <h2>{location?.day_of_year}</h2>
        </div>
        <div className="info">
          <p>DAY OF THE WEEK</p>
          <h2>{location?.day_of_week}</h2>
        </div>
        <div className="info">
          <p>WEEK NUMBER</p>
          <h2>{location?.week_number}</h2>
        </div>
      </div>
    </div>
  );
};

export default UserTime;
