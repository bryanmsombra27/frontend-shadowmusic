
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./pages/Privateroute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Track from "./pages/Track";
import Favorites from "./pages/Favorites";

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} exact ></Route>
        <Route path="/" element={<PrivateRoute />} >
          <Route path="/" element={<Home />} exact />
          <Route path="/track/:id" element={<Track />} exact />
          <Route path="/favorites" element={<Favorites />} exact />
        </Route>

      </Routes>

    </Router>
  );
}

export default App;






