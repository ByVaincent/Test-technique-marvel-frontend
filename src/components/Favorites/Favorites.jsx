import "./favorites.css";
import Cookies from "js-cookie";

const Favorites = ({ character, favorites, setFavorites }) => {
  //display favorite on or off
  let isFavorite = false;

  Object.keys(favorites).length > 0 &&
    Object.keys(favorites).forEach((id) => {
      if (id === character._id) {
        isFavorite = true;
      }
    });

  //update favorites
  const addToFavorites = async () => {
    if (Object.keys(favorites).length !== 0) {
      let isDeleted = false;
      //check is character is already in favorites
      for (let id in favorites) {
        if (id === character._id) {
          console.log("remove", character.name);
          Cookies.remove(character._id);
          console.log("get =>", Cookies.get());
          isDeleted = true;

          setFavorites(() => {
            const newState = Cookies.get();
            return newState;
          });
        }
      }

      if (!isDeleted) {
        console.log("set 2", character.name);
        Cookies.set(character._id, character.name, { expires: 1 });
        setFavorites(() => {
          const newState = Cookies.get();
          return newState;
        });
      }
    } else {
      console.log("set 2", character.name);
      Cookies.set(character._id, character.name, { expires: 1 });
      setFavorites(() => {
        const newState = Cookies.get();
        return newState;
      });
    }
  };

  return (
    <div className="favorites" onClick={addToFavorites}>
      <div className={`star ${isFavorite && "user-fav"}`}></div>
    </div>
  );
};

export default Favorites;
