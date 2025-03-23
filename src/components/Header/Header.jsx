import NavigationLink from "../NavigationLink";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import("./header.css");
import logo from "/marvel_logo.svg";
import { GrLogin } from "react-icons/gr";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";

const Header = ({ setModal, user, setUser }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <header>
      <section className="top-header">
        <div className="container">
          <Link to={"/"} className="logo">
            <img src={logo} alt="Logo de Marvel" />
          </Link>

          <AiOutlineMenu
            size={40}
            className="burger not-on-big-screen "
            color={isActive ? "#ffffff" : "#202020"}
            onClick={() => setIsActive(!isActive)}
          />

          <nav
            className={
              isActive
                ? "mobile-nav not-on-big-screen  mobile-menu-on"
                : "mobile-nav mobile-nav not-on-big-screen "
            }
          >
            <NavigationLink
              text={"Accueil"}
              target={"/"}
              isActive={isActive}
              setIsActive={setIsActive}
            />
            <NavigationLink
              text={"Personnages"}
              target={"/characters"}
              isActive={isActive}
              setIsActive={setIsActive}
            />
            <NavigationLink
              text={"Comics"}
              target={"/comics"}
              isActive={isActive}
              setIsActive={setIsActive}
            />
            {user && (
              <NavigationLink
                text={"Favoris"}
                target={"/favorites"}
                isActive={isActive}
                setIsActive={setIsActive}
              />
            )}
          </nav>
          {user && (
            <div className="welcome not-on-mobile">
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
              <GrLogin className="not-on-big-screen" size={20} color={"red"} />
              <span className="not-on-mobile">Se déconnecter</span>
            </button>
          ) : (
            <button className="signup-login" onClick={() => setModal("login")}>
              <GrLogin className="not-on-big-screen" />
              <span className="not-on-mobile">Se connecter / S'inscire</span>
            </button>
          )}
        </div>
      </section>
      <div className="container nav not-on-mobile">
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
