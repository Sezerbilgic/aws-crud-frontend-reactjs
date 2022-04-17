import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from "./List";
import Create from "./Create";
import Edit from "./Edit";
import './App.css';


function App() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Router>
        <Routes>
          <Route path="" element={<List />} />
          <Route path="new" element={<Create />} />
          <Route path="edit" element={<Edit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
