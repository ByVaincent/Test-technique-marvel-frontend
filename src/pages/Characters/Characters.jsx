import ("./characters.css")
import Filter from "../../components/Filter/filter"
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination/pagination";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import Cookies from "js-cookie"


const Characters = () => {

    const [charactersDatas, setCharactersDatas] = useState(null)
    const [handleError, setHandleError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [filters, setFilters] = useState({name: "", page: 1})

    //favorites logic
    const [favorites, setFavorites] = useState({})
    console.log(favorites);
    
    useEffect(() => {

        const fetchCharacters = async() => {

            try {
                  const datas = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/characters?${"page="+ filters.page}${filters.name && "&name=" + filters.name}`)

                  setCharactersDatas(datas.data)
                  setIsLoading(false)
                  setFavorites(Cookies.get())

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

              return  <CharacterCard key={character._id} character={character} favorites={favorites} setFavorites={setFavorites}/>
            })}
        </div>}

    </section>
     </div>

     {isLoading || <Pagination filters={filters} setFilters={setFilters} count={charactersDatas.count}/>}

</main>
}
export default Characters