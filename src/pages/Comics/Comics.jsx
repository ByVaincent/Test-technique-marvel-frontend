import ("./comics.css")
import Filter from "../../components/Filter/filter"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Comics = () => {

    const [comicsDatas, setcomicsDatas] = useState(null)
    const [handleError, setHandleError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    
    console.log(comicsDatas);

    useEffect(() => {
        const fetchcomics = async() => {

            try {
                  const datas = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/comics`)

                  setcomicsDatas(datas.data)
                  setIsLoading(false)

            } catch (error) {

                setHandleError(error.message)
                setIsLoading(false)
            }

        }   
        fetchcomics()

    }, [])

return <main className="comics">
<div className="container">
    <Filter name={"comics-search"}/>

<section className="comics-section">

    {isLoading ? <div className="loader-container"><span className="loader"></span></div>  : handleError ? <div className="loader-container">Une erreur est survenue: {handleError}</div> : 
    <div className="comics-display">
        {comicsDatas && comicsDatas.results.map((comics) => {

          return  <Link to={`/comics-details/${comics._id}`} className="comics-card">

                <img src={comics.thumbnail ? comics.thumbnail.path + "/portrait_incredible" + "." + comics.thumbnail.extension : null} alt="Photo du personnage" />

                <div className="details">

                    <h3>{comics.title && comics.title}</h3>
                    <p>{comics.description && comics.description} </p>
                </div>
                
            </Link>
        })}
    </div>}

</section>
 </div>
</main>
}
export default Comics