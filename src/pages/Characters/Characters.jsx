import ("./characters.css")
import Filter from "../../components/Filter/filter"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Characters = () => {
console.log(import.meta.env.VITE_BACKEND_URL);

    const [charactersDatas, setCharactersDatas] = useState(null)
    const [handleError, setHandleError] = useState(null)
console.log(charactersDatas);

    useEffect(() => {
        const fetchCharacters = async() => {

            try {
                  const datas = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/characters`)

                  setCharactersDatas(datas.data)
            } catch (error) {
                setHandleError(error.message)
            }
           
            


        }   
        fetchCharacters()

    }, [])

return <main className="characters">
    <div className="container">
        <Filter name={"characters-search"}/>
   
    <section className="characters-section">
        <div className="characters-display">
            {charactersDatas && charactersDatas.results.map((character) => {
              return  <Link className="character-card">
                    <img src={character.thumbnail ? character.thumbnail.path + "." + character.thumbnail.extension : null} alt="Photo du personnage" />
                    <div className="details">
                        <h3>{character.name && character.name}</h3>
                    <p>{character.description && character.description} </p>
                    </div>
                    
                </Link>
            })}
        </div>

    </section>
     </div>
</main>
}
export default Characters