import "./App.css";
import Index from "./Pages/Index.jsx";
import { displayDataContext } from "./Context/context";
import { useState } from "react";
import Details from "./Pages/Details";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  const [convertedData, setconvertedData] = useState([]);
  const [stateClicked, setStateClicked] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState();
  return (
    <displayDataContext.Provider
      value={{
        convertedData,
        setconvertedData,
        stateClicked,
        setStateClicked,
        selectedDistrict,
        setSelectedDistrict,
      }}
    >
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Index />} />
            <Route exact path="/detail/:stateForDetail" element={<Details />} />
          </Routes>
        </div>
      </Router>
    </displayDataContext.Provider>
  );
}

export default App;
