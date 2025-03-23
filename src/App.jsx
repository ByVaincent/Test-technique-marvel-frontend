import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import Home from "./pages/Home/Home";
import Characters from "./pages/Characters/Characters";
import CharactersDetails from "./pages/CharactersDetails/CharactersDetails";
import Comics from "./pages/Comics/Comics";
import Header from "./components/Header/Header";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import ConnectionModal from "./components/ConnectionModal/ConnectionModal";

function App() {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localToken = Cookies.get("token");

    if (localToken) {
      const fetchUserData = async () => {
        const userData = await axios.get(
          `${import.meta.env.BACKEND_URL}/user/data`,
          {
            headers: {
              Authorization: `Bearer ${localToken}`,
            },
          }
        );
        setUser(userData.data.data);
      };

      fetchUserData();
    }
  }, []);

  return (
    <Router>
      <Header setModal={setModal} user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/characters" element={<Characters user={user} />}></Route>
        <Route
          path="/characters-details/:id"
          element={<CharactersDetails />}
        ></Route>
        <Route path="/comics" element={<Comics />}></Route>
        <Route
          path="/favorites"
          element={<FavoritesPage user={user} />}
        ></Route>
      </Routes>
      <ConnectionModal modal={modal} setModal={setModal} setUser={setUser} />
    </Router>
  );
}

export default App;
