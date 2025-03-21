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
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const favoritesCookies = Cookies.get();
    const favoritesId = Object.keys(favoritesCookies);

    const fetchCharacters = async () => {
      try {
        const arrayOfPromise = favoritesId.map((id) => {
          return axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/characters/${id}`
          );
        });

        const results = await Promise.all(arrayOfPromise);
        //extract the charactersDetails
        const favoritesCharacters = results.map((response) => {
          return response.data;
        });

        setCharactersDatas(favoritesCharacters);
        setFavorites(favoritesCookies);
        setIsLoading(false);
      } catch (error) {
        setHandleError(error.message);
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, [filters]);

  return (
    <main className="characters">
      <div className="container">
        <Filter
          name={"characters-search"}
          filters={filters}
          setFilters={setFilters}
        />

        <section className="characters-section">
          {isLoading ? (
            <div className="loader-container">
              <span className="loader"></span>
            </div>
          ) : handleError ? (
            <div className="loader-container">
              Une erreur est survenue: {handleError}
            </div>
          ) : charactersDatas.count === 0 ? (
            <h3 className="loader-container">Aucun résultat</h3>
          ) : (
            <div className="characters-display">
              {charactersDatas &&
                charactersDatas.map((character) => {
                  return (
                    <CharacterCard
                      key={character._id}
                      character={character}
                      favorites={favorites}
                      setFavorites={setFavorites}
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
          count={charactersDatas.length}
        />
      )}
    </main>
  );
};
export default FavoritesPage;
