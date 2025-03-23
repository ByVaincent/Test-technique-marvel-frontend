import { Link } from "react-router-dom";

const NavigationLink = ({ target, text, isActive, setIsActive }) => {
  return (
    <Link
      className="nav-link"
      to={target}
      onClick={() => setIsActive(!isActive)}
    >
      {text}{" "}
    </Link>
  );
};
export default NavigationLink;
