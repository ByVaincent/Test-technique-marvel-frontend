import "./characterCard.css";
import Favorites from "../Favorites/Favorites";
import { Link } from "react-router-dom";

const CharacterCard = ({ character, token, favorites, setFavorites }) => {
  return (
    <div className="wrap-characters">
      <Link
        to={`/characters-details/${character._id}`}
        className="character-card"
      >
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

        <div className="details">
          <h3>{character.name && character.name}</h3>

          <p>{character.description && character.description} </p>
        </div>
      </Link>

      <Favorites
        character={character}
        favorites={favorites}
        setFavorites={setFavorites}
        token={token}
      />
    </div>
  );
};
export default CharacterCard;
