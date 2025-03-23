import { Link } from "react-router-dom";

const NavigationLink = ({ target, text }) => {
  return (
    <Link className="nav-link" to={target}>
      {text}
    </Link>
  );
};
export default NavigationLink;
