import { useState, useEffect } from "react";
import { fetchTimeData, TimeData } from "../API";

const Menu: React.FC<{ active: boolean; daytime: boolean }> = ({
  active,
  daytime,
}) => {
  const [timeData, setTimeData] = useState<TimeData>();

  const getTimeData = async () => {
    const worldTime = await fetchTimeData();
    setTimeData(worldTime);
  };

  useEffect(() => {
    getTimeData();
  }, [timeData]);

  return (
    <div
      className={`data ${active ? "active" : null} ${
        daytime ? "light" : "dark"
      }`}
    >
      <div className="data-container">
        <div className="info">
          <p>CURRENT TIMEZONE</p>
          <h2>{timeData?.timezone}</h2>
        </div>
        <div className="info">
          <p>DAY OF THE YEAR</p>
          <h2>{timeData?.day_of_year}</h2>
        </div>
        <div className="info">
          <p>DAY OF THE WEEK</p>
          <h2>{timeData?.day_of_week}</h2>
        </div>
        <div className="info">
          <p>WEEK NUMBER</p>
          <h2>{timeData?.week_number}</h2>
        </div>
      </div>
    </div>
  );
};

export default Menu;
