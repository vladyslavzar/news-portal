import { Link } from "react-router-dom"

const CategotyLink = (props) => {
    return <li><Link to={`/category/${props.title}`}>{props.title}</Link></li>
}

export default CategotyLink;