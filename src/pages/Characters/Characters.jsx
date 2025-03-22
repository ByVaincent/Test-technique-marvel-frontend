import("./characters.css");
import Filter from "../../components/Filter/filter";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination/pagination";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import Cookies from "js-cookie";

const Characters = ({ user }) => {
  const [charactersDatas, setCharactersDatas] = useState(null);
  const [handleError, setHandleError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ name: "", page: 1 });

  //favorites logic
  const [favorites, setFavorites] = useState([
    {
      thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
        extension: "jpg",
      },
      comics: [
        "5fce213378edeb0017c9602f",
        "5fce213478edeb0017c96040",
        "5fce20fe78edeb0017c95fb7",
        "5fce20e078edeb0017c95f01",
        "5fce20ab78edeb0017c95e56",
        "5fce207678edeb0017c95d8b",
        "5fce207678edeb0017c95d8c",
        "5fce202078edeb0017c95c8e",
        "5fce292678edeb0017c97e05",
        "5fce31ee78edeb0017c9a305",
        "5fce31dc78edeb0017c9a2b0",
        "5fce31c778edeb0017c9a276",
      ],
      _id: "5fcf91f4d8a2480017b91453",
      name: "3-D Man",
      description: "",
      __v: 0,
    },
    {
      thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16",
        extension: "jpg",
      },
      comics: [
        "5fce17e278edeb0017c93def",
        "5fce17ca78edeb0017c93da2",
        "5fce17c878edeb0017c93d62",
      ],
      _id: "5fcf91f4d8a2480017b91454",
      name: "A-Bomb (HAS)",
      description:
        "Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy explosion, A-Bomb's thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction! ",
      __v: 0,
    },
  ]);

  console.log(favorites);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const fetchFavorites = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/favorites`,

            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          console.log(fetchFavorites.data.favorites);
          setFavorites(fetchFavorites.data.favorites);
        }

        const datas = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/characters?${
            "page=" + filters.page
          }${filters.name && "&name=" + filters.name}`
        );

        setCharactersDatas(datas.data);
        setIsLoading(false);
      } catch (error) {
        setHandleError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filters, user]);

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
                charactersDatas.results.map((character) => {
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
          count={charactersDatas.count}
        />
      )}
    </main>
  );
};
export default Characters;
