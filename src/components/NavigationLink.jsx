import {Link} from "react-router-dom"

const NavigationLink = ({target, text}) => {
return <Link to={target}>{text}</Link>
}
export default NavigationLink