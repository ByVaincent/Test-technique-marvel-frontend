import "./characterCard.css";
import Favorites from "../Favorites/Favorites";
import { useNavigate } from "react-router-dom";

const CharacterCard = ({ character, user, favorites, setFavorites }) => {
  const navigate = useNavigate();

  return (
    <div className="wrap-characters">
      <div
        className="character-card"
        onClick={() => navigate(`/characters-details/${character._id}`)}
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
              user={user}
            />
          )}
        </div>

        <div className="dock">
          <div className="details">
            <h4>{character.name && character.name}</h4>

            <p>
              {character.description &&
                character.description.substring(0, 100) + "..."}{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CharacterCard;
