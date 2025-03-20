import ("./characters.css")
import Filter from "../../components/Filter/filter"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination/pagination";
import Favorites from "../../components/Favorites/Favorites";


const Characters = () => {

    const [charactersDatas, setCharactersDatas] = useState(null)
    const [handleError, setHandleError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [filters, setFilters] = useState({name: "", page: 1})
    
    useEffect(() => {
        const fetchCharacters = async() => {
console.log(filters.page);

            try {
                  const datas = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/characters?${"page="+ filters.page}${filters.name && "&name=" + filters.name}`)

                  setCharactersDatas(datas.data)
                  setIsLoading(false)
            } catch (error) {
                setHandleError(error.message)
                setIsLoading(false)
            }
           
        }   

        fetchCharacters()

    }, [filters])


return <main className="characters">
    <div className="container">
        <Filter name={"characters-search"} filters={filters} setFilters={setFilters}/>
   
    <section className="characters-section">
    

        {isLoading ? <div className="loader-container"><span className="loader"></span></div>  :
            handleError ? <div className="loader-container">Une erreur est survenue: {handleError}</div> : 
            charactersDatas.count === 0 ? <h3 className="loader-container">Aucun résultat</h3> : <div className="characters-display">
            {charactersDatas && charactersDatas.results.map((character) => {

              return  <div key={character._id} className="wrap-characters">
                    <Link  to={`/characters-details/${character._id}`} className="character-card">

                   
                    <img src={character.thumbnail ? character.thumbnail.path + "/portrait_incredible" + "." + character.thumbnail.extension : null} alt="Photo du personnage" />

                    <div className="details">

                        <h3>{character.name && character.name}</h3>
                        <p>{character.description && character.description} </p>
                    </div>
                    
                </Link>
                 <Favorites character={character}/>
                </div>
            })}
        </div>}

    </section>
     </div>

     {isLoading || <Pagination filters={filters} setFilters={setFilters} count={charactersDatas.count}/>}

</main>
}
export default Characters