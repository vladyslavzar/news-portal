import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import { Home, Category, Search, Profile, Article } from "../../pages";
import Header from "../header/Header";
import { useState } from "react";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    

    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Home isLoading={isLoading} setIsLoading={setIsLoading}/>} />
                <Route path="/article" element={<Article isLoading={isLoading} setIsLoading={setIsLoading}/>}/>
                <Route path="/profile" element={<Profile isLoading={isLoading} setIsLoading={setIsLoading}/>}/>
                <Route path="/category/:userId" element={<Category isLoading={isLoading} setIsLoading={setIsLoading}/>}/>
                <Route path="/search" element={<Search isLoading={isLoading} setIsLoading={setIsLoading}/>}/>
            </Routes>
            <footer className="footer">
                <div className="footer__container container">
                    <p>Copyright 2022 News Portal</p>
                </div>
            </footer>
        </Router>
    )
}

export default App;