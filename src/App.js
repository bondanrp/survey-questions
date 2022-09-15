import { Navigate, Route, Routes } from "react-router";
import Navbar from "./components/navbar";
import Create from "./pages/create";
import { BrowserRouter } from "react-router-dom";
import List from "./pages/list";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="main">
          <Routes>
            <Route exact path="/" element={<Navigate to="/create" />} />
            <Route exact path="/create" element={<Create />} />
            <Route exact path="/list" element={<List />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
