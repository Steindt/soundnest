import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Admin from "./Admin";
import "../styles/App.css";
import { useCookies } from "react-cookie";
import Landing from "./Landing";
import PlayerManager from "./PlayerManager";

const App = () => {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/" />
        <Link to="/admin" />
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
      <PlayerManager />
    </BrowserRouter>
  );
};

export default App;
