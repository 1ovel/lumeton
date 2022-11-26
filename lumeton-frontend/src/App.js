import "./App.css";
import MapComponent from "./components/Map";
import { useState } from "react";

function App() {
  const [selectedPoint, setSelectedPoint] = useState(null)

  return (
    <div className="App">
      <MapComponent />
    </div>
  );
}

export default App;
