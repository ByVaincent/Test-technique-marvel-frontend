import { useEffect, useState } from "react"
import "./favorites.css"
import Cookies from "js-cookie"

const Favorites = ({character}) => {

const [fav, setFav] = useState(false)
const [favorites, setFavorites] = useState(Cookies.get())

useEffect(() => {

  setFavorites(Cookies.get())

}, [fav])

 console.log(favorites);
const addToFavorites = () => {   
    
    if(Object.keys(favorites).length !== 0){

        for(let id in favorites){

            if(id !== character._id){
                Cookies.set(character._id, character.name )
                setFav(true)

            } else {

                Cookies.remove(id)
                setFav(false)
            }
            
        }
    } else {

        Cookies.set(character._id, character.name)
        setFav(true)
    }

    // if(Object.keys(favorites).length !== 0){
    //         Object.keys(favorites).forEach(charactersId => {
        
    //             if(charactersId === character._id){
                    
    //             Cookies.remove(charactersId)
    //             setFav(false)
    //             setFavorites((prevState) => {
    //                 return {...prevState, charactersId : null}
    //             })


    //     } else {
    //         Cookies.set(character._id, character.name )
    //         setFav(true)
    //         setFavorites((prevState) => {
    //             const newState = {...prevState};
    //             newState[charactersId] = null
    //             return newState
    //         })
    //     }
    // })
    // } else {
    //     Cookies.set(character._id, character.name)
    //     setFav(true)
    //     setFavorites((prevState) => {
    //         return {...prevState, charactersId : character.name}
    //     })
    // }


   
    
    
}

return <div className="favorites" onClick={addToFavorites}>
    <div className={`star ${fav && "user-fav"}`}>

    </div>
</div>
}
export default Favorites