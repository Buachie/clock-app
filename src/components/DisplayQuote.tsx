import { useState, useEffect } from "react";
import { fetchQuote, Quote } from "../API";

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
    <div className="quote-entry">
      <p className="quote-content">{quote?.content}</p>
      <h4 className="quote-author">{quote?.author}</h4>
    </div>
  );
};

export default DisplayQuote;
