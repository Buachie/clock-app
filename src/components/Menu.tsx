import { useState, useEffect } from "react";
import { fetchLocation, Location } from "../API";

interface Props {
  active: boolean;
}
const Menu: React.FC<{ active: boolean }> = ({ active }) => {
  const [location, setLocation] = useState<Location>();

  const getLocation = async () => {
    const newLocation = await fetchLocation();
    setLocation(newLocation);
  };

  useEffect(() => {
    getLocation();
  }, [location]);

  return (
    <div className={`data ${active ? "active" : null}`}>
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
  );
};

export default Menu;
