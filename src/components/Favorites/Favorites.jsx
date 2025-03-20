
import "./favorites.css"
import Cookies from "js-cookie"

const Favorites = ({character, favorites, setFavorites}) => {

const addToFavorites = () => {   
    
    if(Object.keys(favorites).length !== 0){

        for(let id in favorites){

            if(id !== character._id){
                Cookies.set(character._id, character.name, {expires : 1} )
                setFavorites(prevState => {
                    const newState = {...prevState};
                    prevState[character._id] = character.name;
                    return newState
                })

            } else {

                Cookies.remove(id)
                setFavorites(prevState => {
                    const newState ={...prevState};
                    delete newState[id]
                    return newState
                })
          
            }
            
        }
    } else {

        Cookies.set(character._id, character.name , {expires : 1})
        setFavorites(prevState => {
            const newState = {...prevState};
            prevState[character._id] = character.name;
            return newState
        })

    }
    
}

return <div className="favorites" onClick={addToFavorites}>
    <div className={`star `}>

    </div>
</div>
}
export default Favorites