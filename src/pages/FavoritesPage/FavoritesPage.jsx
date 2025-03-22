import "./favoritesPage.css";
import Filter from "../../components/Filter/filter";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination/pagination";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import Cookies from "js-cookie";

const FavoritesPage = () => {
  const [charactersDatas, setCharactersDatas] = useState(null);
  const [handleError, setHandleError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ name: "", page: 1 });

  //favorites logic
  const [favorites, setFavorites] = useState(null);

  console.log(favorites);

  const token =
    "txiixsMQobnsqgKc2eQyZPjPjB-4VQqP2FqUat16lN6hsvufe1Dk8_l5z1KJIEhB";
  useEffect(() => {
    const fetchFavoritesCharacters = async () => {
      try {
        const favoritesCharacters = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/favorites`,
          {
            headers: {
              Authorization:
                "Bearer txiixsMQobnsqgKc2eQyZPjPjB-4VQqP2FqUat16lN6hsvufe1Dk8_l5z1KJIEhB",
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
  }, [filters]);

  return (
    <main className="characters">
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
                      token={token}
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
