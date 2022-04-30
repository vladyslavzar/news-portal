import search from '../../assets/images/search.svg';
import Item from '../../components/item/Item';
import { getTopicsBySearch } from '../../utils/news.util';
import { useState } from 'react';
import { getDifferenceBetweenTime } from "../../components/hotTopics/HotTopics";
import newsLoading from '../../assets/images/newsLoading.gif';

const Search = ({setIsLoading, isLoading}) => {
    const [input, setInput] = useState('');
    const [totalRes, setTotalRes] = useState('no results');
    const [view, setView] = useState([]);

    const btnHandler = () => {
        setView([]);
        setTotalRes('');
        setIsLoading(true);

        getTopicsBySearch(input)
                    .then(res => {
                        console.log(res);
                        if(res.totalResults) setTotalRes(res.totalResults);

                        const tempArr = res.articles.map((item, i) => {
                            return <Item image={item.urlToImage} title={item.title} author={item.author} time={getDifferenceBetweenTime(item.publishedAt)} key={i}/>
                        })

                        setView(tempArr);
                        setIsLoading(false);
                    });
    };

    if (isLoading === true) {
        return (
            
            <img src={newsLoading} alt="Loading" className="loading"/>
            
        )
    }

    return (
        <>
            <div className="container">
                <h2 style={{marginBottom: '20px'}}>
                    Search
                </h2>
                <h3>Search results: {totalRes || totalRes === ' '  ? totalRes : 'no results'}</h3>
            </div>

            <section className="searchBox">
                <div className="searchBox__container container">
                    <input type="text" value={input} onChange={(e) => {
                        setInput(e.target.value);
                    }}/>
                    <button onClick={btnHandler} ><img src={search} alt="" /></button>
                </div>
            </section>

            {view}
        </>
    )
}

export default Search;