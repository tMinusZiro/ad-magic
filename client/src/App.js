import "./App.css";
import TopBar from "./components/TopBar.jsx";
import Map from "./components/Map.jsx";
import LowBar from "./components/LowBar.jsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/*I figure we would use react router so this really isn't the home page but yea you all get it */}
        <h1>Executive Report</h1>
      </header>
      <div>
        <TopBar />
        <Map />
        <LowBar />
      </div>
    </div>
  );
}

export default App;
