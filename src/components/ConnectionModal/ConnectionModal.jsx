import("./connectionModal.css");
import { useState } from "react";
import { ImCross } from "react-icons/im";
import axios from "axios";

const ConnectionModal = ({ modal, setModal, setUser }) => {
  const [formInputs, setFormInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errorHandler, setHandleError] = useState(null);
  const [succeedHandler, setSucceedHandler] = useState(null);

  //http request for submit
  const submitForm = async (event) => {
    event.preventDefault();
    setHandleError(null);
    setSucceedHandler(null);

    try {
      let submit;
      if (modal === "signup") {
        submit = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/user/signup`,
          formInputs
        );
      } else if (modal === "login") {
        submit = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/user/login`,
          formInputs
        );
      }

      setUser(submit.data.data);
      setSucceedHandler(submit.data.message);
      setTimeout(() => {
        setModal(false);
        setFormInputs({ ...formInputs, username: "", email: "", password: "" });
        setSucceedHandler(null);
      }, 2000);
    } catch (error) {
      console.log(error);

      setHandleError(error.response.data);
    }
  };

  return (
    modal && (
      <div
        className="connection-modal"
        onClick={() => {
          setFormInputs({
            ...formInputs,
            username: "",
            email: "",
            password: "",
          });
          setModal(false);
        }}
      >
        {/* display signup  */}

        {modal === "signup" && (
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <ImCross className="exit-modal" onClick={() => setModal(false)} />
            <h2>Inscription</h2>
            <form onSubmit={submitForm}>
              <div className="form-input">
                <label htmlFor="username">
                  Username
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={formInputs.username}
                    onChange={(event) => {
                      setFormInputs({
                        ...formInputs,
                        username: event.target.value,
                      });
                    }}
                  />
                </label>
              </div>
              <div className="form-input">
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formInputs.email}
                    onChange={(event) => {
                      setFormInputs({
                        ...formInputs,
                        email: event.target.value,
                      });
                    }}
                  />
                </label>
              </div>
              <div className="form-input">
                <label htmlFor="password">
                  Mot de passe
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formInputs.password}
                    onChange={(event) => {
                      setFormInputs({
                        ...formInputs,
                        password: event.target.value,
                      });
                    }}
                  />
                </label>
              </div>
              <button>Envoyer</button>
            </form>
            {errorHandler && (
              <div className="authentication-error">{errorHandler}</div>
            )}
            {succeedHandler && (
              <div className="authentication-succeed">{succeedHandler}</div>
            )}
            <div
              className="switch-login-signup"
              onClick={() => {
                setFormInputs({
                  ...formInputs,
                  username: "",
                  email: "",
                  password: "",
                });
                setModal("login");
              }}
            >
              Déjà un compte? Connecte toi!
            </div>
          </div>
        )}

        {/* display login  */}
        {modal === "login" && (
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <ImCross className="exit-modal" onClick={() => setModal(false)} />
            <h2>Connection</h2>
            <form onSubmit={submitForm}>
              <div className="form-input">
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formInputs.email}
                    onChange={(event) => {
                      setFormInputs({
                        ...formInputs,
                        email: event.target.value,
                      });
                    }}
                  />
                </label>
              </div>
              <div className="form-input">
                <label htmlFor="password">
                  Mot de passe
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formInputs.password}
                    onChange={(event) => {
                      setFormInputs({
                        ...formInputs,
                        password: event.target.value,
                      });
                    }}
                  />
                </label>
              </div>
              <button>Envoyer</button>
            </form>
            {errorHandler && (
              <div className="authentication-error">{errorHandler}</div>
            )}
            {succeedHandler && (
              <div className="authentication-succeed">{succeedHandler}</div>
            )}
            <div
              className="switch-login-signup"
              onClick={() => {
                setFormInputs({
                  ...formInputs,
                  username: "",
                  email: "",
                  password: "",
                });
                setModal("signup");
              }}
            >
              Pas encore de compte? Inscris toi!
            </div>
          </div>
        )}
      </div>
    )
  );
};
export default ConnectionModal;
