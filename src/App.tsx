import UserTime from "./components/Location";
import DisplayQuote from "./components/DisplayQuote";
import "./scss/main.css";

const App = () => {
  return (
    <div className="App">
      <DisplayQuote />
      <UserTime />
    </div>
  );
};

export default App;
