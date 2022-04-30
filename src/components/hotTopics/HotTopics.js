import { getHotTopic } from "../../utils/news.util";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import placeholder from '../../assets/images/placeholder.png'
import newsLoading from '../../assets/images/newsLoading.gif';

const HotTopics = ({setIsLoading, isLoading}) => {
    const [view, setView] = useState({});
    const [time, setTime] = useState(0);
    const [secondView, setSecondView] = useState([]);
    const navigate = useNavigate();

    

    useEffect(() => {
        setIsLoading(true);
        getHotTopic()
                .then(res => {
                    
                    setView(res.articles[0]);

                    const formattedTime = getDifferenceBetweenTime(res.articles[0].publishedAt);

                    setTime(formattedTime);

                    const formattedArr = res.articles.map((item, i) => {
                        if (i === 0 || i >= 9) return null;

                        const newTime = getDifferenceBetweenTime(item.publishedAt);

                        item.time = newTime;
                        let newTitle = item.title;

                        if (item.title.length > 80) {
                            newTitle = item.title.slice(0, 75) + '...';
                        }
                        const imgPlaceHolder = item.urlToImage ? item.urlToImage : placeholder;

                        return (
                            <div className="latestNews__container__item" key={i} onClick={() => {
                                navigate('/article', { state: { urlToImage: imgPlaceHolder, title: item.title, time: (newTime ? `${newTime} hours ago` : 'Just posted'), author: item.author, description: item.description} });
                            }}>
                                <img src={imgPlaceHolder} alt="post preview" />
                                <h4>{newTitle}</h4>
                                <div className="latestNews__container__item__bot"><span>{newTime ? `${newTime} hours ago` : 'Just posted'}</span><span>{item.author}</span></div>
                            </div>
                        )
                    });

                    setIsLoading(false);

                    setSecondView(formattedArr);
                    
                });

        
    }, []);

    if (isLoading === true) {
        return (
            
            <img src={newsLoading} alt="Loading" className="loading"/>
            
        )
    }

    const defaultTitle = view.title ? view.title : '';

    const title = defaultTitle.length > 80 ? (view.title.slice(0, 65) + '...') : view.title;

    let deafultDescr = view.description ? view.description : '';

    if (deafultDescr.indexOf('&') !== -1) {
        console.log(deafultDescr.indexOf('&'), typeof(deafultDescr.indexOf('&')));
        while(deafultDescr.indexOf('&') !== -1) {
            const newStr = deafultDescr.replace('&quot;', `"`);
            
            deafultDescr=newStr;
        }
    }

    const descr = deafultDescr.length > 100 ? (deafultDescr.slice(0, 90) + '...') : deafultDescr;

    const imgPlaceHolder = view.urlToImage ? view.urlToImage : placeholder;

    return (
        <>
            <div className="container"><h2>Hot Topics</h2></div>
            <section className="hotTopics">
                <div className="hotTopics__container container" onClick={() => {
                                navigate('/article', { state: { urlToImage: imgPlaceHolder, title: defaultTitle, time: (time ? `${time} hours ago` : 'Just posted'), author: view.author, description: deafultDescr} });
                            }}>
                    <div className="hotTopics__container__post" style={{backgroundImage:  `url('${imgPlaceHolder}')`}}>
                        <div className="hotTopics__container__post__text">
                            <p>{title}</p>
                            <div className="hotTopics__container__post__text__bot">
                                <span>{time ? `${time} hours ago` : 'Just posted'}</span>
                                <span>{view.author}</span>
                            </div>
                        </div>
                    </div>
                    <p id="descr_post">{descr}</p>
                </div>
            </section>
            <div className="container"><h3>Latest News</h3></div>
            <section className="latestNews">
                <div className="latestNews__container container">
                    {secondView}
                </div>
            </section>
        </>
    )
}

export const getDifferenceBetweenTime = (subTime) => {
    let currentDate = new Date();
    let subDate = new Date(subTime);

    let differenceInTime = currentDate - subDate;

    let differenceInHours = differenceInTime / (1000 * 3600);

    return Math.round(differenceInHours);
}

export default HotTopics;

