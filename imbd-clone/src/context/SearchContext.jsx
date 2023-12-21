import axios from 'axios';
import { createContext, useState, useContext } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
      const [query, setQuery] = useState('');
      const [searchResults, setSearchResults] = useState([]);
      const [isLoading, setIsLoading] = useState(false);

      const updateSearchResults = async (newQuery) => {
            if (newQuery.trim() === '') {
                  setSearchResults([]);
                  return;
            }

            setIsLoading(true);

            try {
                  const response = await axios.get(`https://api.themoviedb.org/3/search/multi`, {
                        params: {
                              query: newQuery,
                              include_adult: false,
                              language: 'en-US',
                              page: 1,
                        },
                        headers: {
                              Authorization:
                                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTg4MTJiY2YzMjU2NjBiYzI5NzY2NTIyZDIxMzU5NSIsInN1YiI6IjY1ODJkYjk4ZjE3NTljM2ZkOTEwYmRmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tIjJJNiU03GebFQI6PLaB15wgk6RB1TVhY-Ui5Y3_Rc',
                        },
                  });

                  setSearchResults(response.data.results);
            } catch (error) {
                  console.error('Error fetching search results:', error);
            }

            setIsLoading(false);
      };

      return (
            <SearchContext.Provider value={{ query, setQuery, searchResults, isLoading, updateSearchResults }}>
                  {children}
            </SearchContext.Provider>
      );
};

export const useSearch = () => {
      return useContext(SearchContext);
};
