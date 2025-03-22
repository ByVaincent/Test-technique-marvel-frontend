import NavigationLink from "../NavigationLink";

import("./header.css");
import logo from "/marvel_logo.svg";

const Header = ({ setModal, user, setUser }) => {
  return (
    <header>
      <div className="container">
        <section className="top-header">
          <div className="logo">
            <img src={logo} alt="Logo de Marvel" />
          </div>
          {user ? (
            <button className="signup-login" onClick={() => setUser(null)}>
              Se déconnecter
            </button>
          ) : (
            <button className="signup-login" onClick={() => setModal("login")}>
              Se connecter / S'inscire
            </button>
          )}
        </section>
        <nav>
          <NavigationLink text={"Accueil"} target={"/"} />
          <NavigationLink text={"Personnages"} target={"/characters"} />
          <NavigationLink text={"Comics"} target={"/comics"} />
          <NavigationLink text={"Favoris"} target={"/favorites"} />
        </nav>
      </div>
    </header>
  );
};
export default Header;
