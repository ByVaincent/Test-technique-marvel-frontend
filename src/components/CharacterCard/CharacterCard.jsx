import "./characterCard.css";
import Favorites from "../Favorites/Favorites";
import { Link } from "react-router-dom";

const CharacterCard = ({ character, user, favorites, setFavorites }) => {
  return (
    <div className="wrap-characters">
      <Link
        to={`/characters-details/${character._id}`}
        className="character-card"
      >
        <div className="card-img">
          <img
            src={
              character.thumbnail
                ? character.thumbnail.path +
                  "/portrait_incredible" +
                  "." +
                  character.thumbnail.extension
                : null
            }
            alt="Photo du personnage"
          />
          {user && (
            <Favorites
              character={character}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          )}
        </div>

        <div className="details">
          <h4>{character.name && character.name}</h4>

          <p>{character.description && character.description} </p>
        </div>
        <div className="dock"></div>
      </Link>
    </div>
  );
};
export default CharacterCard;
