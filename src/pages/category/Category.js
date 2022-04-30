import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTopicsInCategory } from "../../utils/news.util";
import Item from "../../components/item/Item";
import { getDifferenceBetweenTime } from "../../components/hotTopics/HotTopics";
import uuid from 'react-uuid';
import newsLoading from '../../assets/images/newsLoading.gif';

const Category = ({setIsLoading, isLoading}) => {
    let { userId } = useParams();

    const [view, setView] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setIsLoading(true);
        setView([]);
        getTopicsInCategory(userId, 1)
                            .then(res => {
                                const tempArr = res.articles.map((item, i) => {
                                    return <Item image={item.urlToImage} title={item.title} author={item.author} time={getDifferenceBetweenTime(item.publishedAt)} descr={item.description} key={uuid()}/>
                                })

                                setView(tempArr);
                                setIsLoading(false);
                            })
    }, [userId])

    const loadMoreContent = () => {
        setPage(+(page + 1).toFixed());
    }

    const loadArticles = () => {
        setIsLoading(true);
        getTopicsInCategory(userId, page)
                            .then(res => {
                                const tempArr = res.articles.map((item, i) => {
                                    return <Item image={item.urlToImage} title={item.title} author={item.author} time={getDifferenceBetweenTime(item.publishedAt)} descr={item.description} key={uuid()}/>
                                })

                                const newArr = tempArr.concat(view);

                                setView(newArr);
                                setIsLoading(false);
                            })
    }

    if (isLoading === true) {
        return (
            
            <img src={newsLoading} alt="Loading" className="loading"/>
            
        )
    }

    return (
        <>
            <div className="container"><h2>{capitalizeFirstLetter(userId)}</h2></div>
            <section className="category">
                <div className="category__container container">
                    {view.sort((a, b) => a.props.time - b.props.time)}
                </div>
            </section>
            <button style={{
                marginBottom: '100px',
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'block'
                }} onClick={() => {
                    loadMoreContent();
                    loadArticles();
                    }}>Load more</button>
        </>
    )
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default Category;