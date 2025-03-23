import "./favoritesPage.css";
import Filter from "../../components/Filter/filter";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination/pagination";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import Cookies from "js-cookie";

const FavoritesPage = ({ user }) => {
  const [handleError, setHandleError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ name: "", page: 1 });

  //favorites logic
  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    const fetchFavoritesCharacters = async () => {
      try {
        const favoritesCharacters = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/favorites`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        setFavorites(favoritesCharacters.data.favorites);
        setIsLoading(false);
      } catch (error) {
        setHandleError(error.message);
        setIsLoading(false);
      }
    };

    fetchFavoritesCharacters();
  }, [user]);

  return !user ? (
    <Navigate to={"/"} />
  ) : (
    <main className="characters char-fav">
      <div className="container">
        <section className="characters-section">
          {isLoading ? (
            <div className="loader-container">
              <span className="loader"></span>
            </div>
          ) : handleError ? (
            <div className="loader-container">
              Une erreur est survenue: {handleError}
            </div>
          ) : favorites.length === 0 ? (
            <h3 className="loader-container">Aucun résultat</h3>
          ) : (
            <div className="characters-display">
              {favorites &&
                favorites.map((character) => {
                  return (
                    <CharacterCard
                      key={character._id}
                      character={character}
                      favorites={favorites}
                      setFavorites={setFavorites}
                      user={user}
                    />
                  );
                })}
            </div>
          )}
        </section>
      </div>

      {isLoading || (
        <Pagination
          filters={filters}
          setFilters={setFilters}
          count={favorites.length}
        />
      )}
    </main>
  );
};
export default FavoritesPage;
