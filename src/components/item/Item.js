import { useNavigate } from "react-router-dom";
import placeholder from '../../assets/images/placeholder.png'

const Item = (props) => {
    const navigate = useNavigate();

    const Ttitle = props.title ? props.title : 'This article has no title';

    const newTime = props.time === 0 ? 'Just posted' : `${props.time} hours ago`;

    const newTitle = Ttitle.length > 100 ? `${props.title.slice(0, 95)}...` : props.title;

    return (
        <article className="article">
            <div className="article__container container" onClick={() => {
                                navigate('/article', { state: { urlToImage: (props.image ? props.image : placeholder), title: props.title, time: newTime, author: props.author, description: props.descr} });
                            }}>
                <img src={(props.image ? props.image : placeholder)} alt="" />
                <div className="article__container__main">
                    <h3>{newTitle} </h3>
                    <div className="article__container__main__bot">
                        <span>{newTime}</span><span>{props.author}</span>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default Item;