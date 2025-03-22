import("./home.css");
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <section className="hero">
        <h1>Tout l'univers </h1>
      </section>
      <section className="snd-nav">
        <Link to={"/characters"} className="characters-link">
          <h3>Persos</h3>
        </Link>

        <Link to={"/comics"} className="comics-link">
          <h3>Comics</h3>
        </Link>
      </section>
    </main>
  );
};
export default Home;
