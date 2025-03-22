import "./favorites.css";
import Cookies from "js-cookie";
import axios from "axios";

const Favorites = ({ character, token, favorites, setFavorites }) => {
  //display favorite on or off
  let isFavorite = false;

  favorites.forEach((favoriteCharacter) => {
    if (character._id === favoriteCharacter._id) {
      isFavorite = true;
    }
  });

  //update favorites
  const addToFavorites = async () => {
    const favoritesIdArray = favorites.map((character) => character._id);

    if (favoritesIdArray.indexOf(character._id) !== -1) {
      favorites.splice(favoritesIdArray.indexOf(character._id), 1);
    } else {
      favorites.push(character);
    }

    const updateFavorites = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/favorites/update`,
      { favorites },
      {
        headers: {
          Authorization: `Bearer txiixsMQobnsqgKc2eQyZPjPjB-4VQqP2FqUat16lN6hsvufe1Dk8_l5z1KJIEhB`,
        },
      }
    );

    setFavorites(updateFavorites.data);

    // if (Object.keys(favorites).length !== 0) {
    //   let isDeleted = false;
    //   //check is character is already in favorites
    //   for (let id in favorites) {
    //     if (id === character._id) {
    //       Cookies.remove(character._id);
    //       isDeleted = true;
    //       setFavorites(() => {
    //         const newState = Cookies.get();
    //         return newState;
    //       });
    //     }
    //   }
    //   if (!isDeleted) {
    //     Cookies.set(character._id, character.name, { expires: 1 });
    //     setFavorites(() => {
    //       const newState = Cookies.get();
    //       return newState;
    //     });
    //   }
    // } else {
    //   Cookies.set(character._id, character.name, { expires: 1 });
    //   setFavorites(() => {
    //     const newState = Cookies.get();
    //     return newState;
    //   });
    // }
  };

  return (
    <div className="favorites" onClick={addToFavorites}>
      <div className={`star ${isFavorite && "user-fav"}`}></div>
    </div>
  );
};

export default Favorites;
