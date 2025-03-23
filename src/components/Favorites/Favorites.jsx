import "./favorites.css";
import Cookies from "js-cookie";
import axios from "axios";

const Favorites = ({ character, favorites, setFavorites, user }) => {
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
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    setFavorites(updateFavorites.data);
  };

  return (
    <div
      className="favorites"
      onClick={(event) => {
        addToFavorites();
        event.stopPropagation();
      }}
    >
      <div className={`star ${isFavorite && "user-fav"}`}></div>
    </div>
  );
};

export default Favorites;
