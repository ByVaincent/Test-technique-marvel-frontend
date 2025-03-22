import NavigationLink from "../NavigationLink";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import("./header.css");
import logo from "/marvel_logo.svg";

const Header = ({ setModal, user, setUser }) => {
  return (
    <header>
      <section className="top-header">
        <div className="container">
          <Link to={"/"} className="logo">
            <img src={logo} alt="Logo de Marvel" />
          </Link>
          {user && (
            <div className="welcome">
              <i>Content </i>
              <i>de </i>
              <i>te </i>
              <i>voir </i>

              <span>
                <i>{user.username}</i> <i>!</i>
              </span>
            </div>
          )}
          {user ? (
            <button
              className="signup-login"
              onClick={() => {
                Cookies.remove("token");
                setUser(null);
              }}
            >
              Se déconnecter
            </button>
          ) : (
            <button className="signup-login" onClick={() => setModal("login")}>
              Se connecter / S'inscire
            </button>
          )}
        </div>
      </section>
      <div className="container nav">
        <nav>
          <NavigationLink text={"Accueil"} target={"/"} />
          <NavigationLink text={"Personnages"} target={"/characters"} />
          <NavigationLink text={"Comics"} target={"/comics"} />
          {user && <NavigationLink text={"Favoris"} target={"/favorites"} />}
        </nav>
      </div>
    </header>
  );
};
export default Header;
