import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Admin from "./Admin";
import "../styles/App.css";
import Landing from "./Landing";
import PlayerManager from "./PlayerManager";
import Nav from "./Nav";
import SearchComponent from "./SearchComponent";
import Settings from "./Settings";
import Profile from "./Profile";
import { useState } from "react";

const App = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const handleOpen = (isNav: boolean, shouldOpen: boolean) => {
    if (isNav) {
      setNavOpen(shouldOpen);
      setSearchOpen(false);
    } else {
      setSearchOpen(shouldOpen);
      setNavOpen(false);
    }
  };

  return (
    <BrowserRouter>
      <div className="header">
        <SearchComponent setOpen={handleOpen} open={searchOpen} />
        <Nav setOpen={handleOpen} open={navOpen} />
      </div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <PlayerManager />
    </BrowserRouter>
  );
};

export default App;
