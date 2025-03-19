import ("./characters.css")
import Filter from "../../components/Filter/filter"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Characters = () => {
console.log(import.meta.env.VITE_BACKEND_URL);

    const [charactersDatas, setCharactersDatas] = useState(null)
    const [handleError, setHandleError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    
    console.log(charactersDatas);

    useEffect(() => {
        const fetchCharacters = async() => {

            try {
                  const datas = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/characters`)

                  setCharactersDatas(datas.data)
                  setIsLoading(false)
            } catch (error) {
                setHandleError(error.message)
                setIsLoading(false)
            }
           
            


        }   
        fetchCharacters()

    }, [])

return <main className="characters">
    <div className="container">
        <Filter name={"characters-search"}/>
   
    <section className="characters-section">

        {isLoading ? <div className="loader-container"><span class="loader"></span></div>  : handleError ? <div className="loader-container">Une erreur est survenue: {handleError}</div> : 
        <div className="characters-display">
            {charactersDatas && charactersDatas.results.map((character) => {

              return  <Link to={`/characters-details/${character._id}`} className="character-card">

                    <img src={character.thumbnail ? character.thumbnail.path + "." + character.thumbnail.extension : null} alt="Photo du personnage" />

                    <div className="details">

                        <h3>{character.name && character.name}</h3>
                        <p>{character.description && character.description} </p>
                    </div>
                    
                </Link>
            })}
        </div>}

    </section>
     </div>
</main>
}
export default Characters