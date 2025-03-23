import("./characters-details.css");
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const CharactersDetails = () => {
  const { id } = useParams();

  const [charactersDatas, setcharactersDatas] = useState(null);
  const [handleError, setHandleError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const datas = await axios.get(
          `${import.meta.env.BACKEND_URL}/characters/${id}`
        );

        setcharactersDatas(datas.data);
        setIsLoading(false);
      } catch (error) {
        setHandleError(error.message);
        setIsLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  return (
    <main>
      <div className="container">
        {isLoading ? (
          <div className="loader-container">
            <span className="loader"></span>
          </div>
        ) : handleError ? (
          <div className="loader-container">
            Une erreur est survenue: {handleError}
          </div>
        ) : (
          <section className="character">
            <div className="character-details">
              <div className="character-thumbnail">
                <img
                  src={
                    charactersDatas.thumbnail
                      ? charactersDatas.thumbnail.path +
                        "/portrait_uncanny" +
                        "." +
                        charactersDatas.thumbnail.extension
                      : null
                  }
                  alt="Portrait du personnage"
                />
              </div>
              <div className="character-description">
                <h3>
                  {charactersDatas.name
                    ? charactersDatas.name
                    : "Pas de nom disponible pour ce personnage"}
                </h3>
                <p>
                  {charactersDatas.description
                    ? charactersDatas.description
                    : "Pas de description disponible pour ce personnage"}
                </p>
              </div>
            </div>

            <div className="character-comics">
              <h3>
                Retrouvez{" "}
                {charactersDatas.name &&
                  charactersDatas.name +
                    " dans " +
                    charactersDatas.comicsDetails.length +
                    " comics :"}{" "}
              </h3>
              <div className="character-comics-carousel">
                {charactersDatas.comicsDetails &&
                  charactersDatas.comicsDetails.map((comics) => {
                    return (
                      <div
                        key={comics._id}
                        className="characters-comics-details"
                      >
                        <div>
                          {comics.thumbnail && (
                            <img
                              src={
                                comics.thumbnail.path +
                                "/portrait_fantastic" +
                                "." +
                                comics.thumbnail.extension
                              }
                              alt="Image du comics"
                            />
                          )}
                        </div>
                        <p>{comics.title && comics.title}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};
export default CharactersDetails;
