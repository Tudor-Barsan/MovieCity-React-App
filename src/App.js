import { useState, useEffect } from 'react';

import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=a8825344'

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect (() => {
        searchMovies('Search');
    }, [])


    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            searchMovies(searchTerm)
        }
      };


    return (
        <div className="app">
            <h1>MovieCity</h1>
            <h2>By Tudor Barsan</h2>

            <div className="search">
                <input 
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    onKeyDown = {handleKeyDown}
                />
                <img 
                    src={SearchIcon}
                    alt="Search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
                 ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={(movie)} />
                        ))}
                    </div>
                 ) : (
                    <div className="empty">
                        <h2>No Movies Found</h2>
                    </div>
                 )}
        </div>
    );
}

export default App;