import { Link } from "react-router-dom";

const NavigationLinkMobile = ({ target, text, isActive, setIsActive }) => {
  return (
    <Link
      className="nav-link"
      to={target}
      onClick={() => setIsActive(!isActive)}
    >
      {text}
    </Link>
  );
};
export default NavigationLinkMobile;
