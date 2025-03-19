import ("./characters-details.css")
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

const CharactersDetails = () => {

    const {id} = useParams()
    
    const [charactersDatas, setcharactersDatas] = useState(null);
    const [handleError, setHandleError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    
console.log(charactersDatas);

    
    useEffect(() => {
        const fetchCharacter = async() => {

            try {
                
                const datas = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/characters/${id}`);

                setcharactersDatas(datas.data)
                setIsLoading(false)
                
            } catch (error) {
                setHandleError(error.message)
                setIsLoading(false)
            }
        }

        fetchCharacter()
    }, [id])
return <main>
    <div className="container">
        {isLoading ? <div className="loader-container"></div>  : handleError ? <div className="loader-container">Une erreur est survenue: {handleError}</div> : 
        
        <section className="character">
            <div className="character-details">
                <div className="character-thumbnail">
                    <img src={charactersDatas.thumbnail ? charactersDatas.thumbnail.path + "." + charactersDatas.thumbnail.extension : null} alt="" />
                </div>
                <div className="character-description">
                    <h3>{charactersDatas.name && charactersDatas.name}</h3>
                    <p>{charactersDatas.description && charactersDatas.description}</p>
                </div>
            </div>

            <div className="character-comics">
                <div className="character-carousel">
                    {/* aller chercher les datas des comics */}
                </div>
            </div>

        </section>
        
        }
    </div>



</main>
}
export default CharactersDetails