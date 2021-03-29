import "./App.css";
import TopBar from "./components/TopBar.jsx";
import Map from "./components/Map.jsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/*I figure we would use react router so this really isn't the home page but yea you all get it */}
        <h1>This is the Home Page</h1>
      </header>
      <TopBar />
      <Map />
    </div>
  );
}

export default App;
