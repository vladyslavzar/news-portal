import HotTopics from "../../components/hotTopics/HotTopics";

const Home = ({isLoading, setIsLoading}) => {
    return (
        <>
            <HotTopics isLoading={isLoading} setIsLoading={setIsLoading}/>
        </>
    )
}

export default Home;