import("./comics.css");
import Filter from "../../components/Filter/filter";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination/pagination";

const Comics = () => {
  const [comicsDatas, setcomicsDatas] = useState(null);
  const [handleError, setHandleError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ name: "", page: 1 });

  useEffect(() => {
    const fetchcomics = async () => {
      try {
        const datas = await axios.get(
          `${import.meta.env.BACKEND_URL}/comics?${"page=" + filters.page}${
            filters.name && "&name=" + filters.name
          }`
        );

        setcomicsDatas(datas.data);
        setIsLoading(false);
      } catch (error) {
        setHandleError(error.message);
        setIsLoading(false);
      }
    };
    fetchcomics();
  }, [filters]);

  return (
    <main className="comics">
      <Filter
        className={"comics-search"}
        name={filters.title}
        filters={filters}
        setFilters={setFilters}
        data={comicsDatas}
      />
      <div className="container">
        <section className="comics-section">
          {isLoading ? (
            <div className="loader-container">
              <span className="loader"></span>
            </div>
          ) : handleError ? (
            <div className="loader-container">
              Une erreur est survenue: {handleError}
            </div>
          ) : comicsDatas.count === 0 ? (
            <h3 className="loader-container no-result">Aucun résultat</h3>
          ) : (
            <div className="comics-display">
              {comicsDatas &&
                comicsDatas.results?.map((comics) => {
                  return (
                    <Link
                      key={comics._id}
                      // to={`/comics-details/${comics._id}`}
                      className="comics-card"
                    >
                      <img
                        src={
                          comics.thumbnail
                            ? comics.thumbnail.path +
                              "/portrait_incredible" +
                              "." +
                              comics.thumbnail.extension
                            : null
                        }
                        alt="Photo du personnage"
                      />

                      <div className="details">
                        <h3>{comics.title && comics.title}</h3>
                        <p>
                          {comics.description &&
                            comics.description.substring(0, 100) + "..."}{" "}
                        </p>
                      </div>
                    </Link>
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
          count={comicsDatas.count}
        />
      )}
    </main>
  );
};
export default Comics;
