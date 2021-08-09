import { useState, useEffect } from "react";
import { fetchQuote, Quote } from "../API";
import ReloadIcon from "../assets/desktop/icon-refresh.svg";

const DisplayQuote = () => {
  const [quote, setQuote] = useState<Quote>();

  const getQuote = async () => {
    const newQuote = await fetchQuote();
    setQuote(newQuote);
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div className="quote">
      <div className="quote-entry">
        <p className="quote-content">"{quote?.content}"</p>
        <h4 className="quote-author">{quote?.author}</h4>
      </div>
      <button className="refresh" onClick={() => getQuote()}>
        <img src={ReloadIcon} alt="" />
      </button>
    </div>
  );
};

export default DisplayQuote;
