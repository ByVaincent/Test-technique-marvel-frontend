import ("./home.css")
import { Link } from "react-router-dom"

const Home = () => {
return <main>
    <section className="hero">
        <h1>Tout l'univers </h1>
    </section>
    <section className="snd-nav">
        <Link to={"/characters"} className="characters-link">
            <div >
            </div>
        </Link>

        <Link to={"/comics"} className="comics-link">
            <div >

            </div>
        </Link>
        

        
    </section>
    
</main>
}
export default Home