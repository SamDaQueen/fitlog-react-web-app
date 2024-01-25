import "./App.css";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import FitLog from "./fitlog";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/*" element={<FitLog />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
