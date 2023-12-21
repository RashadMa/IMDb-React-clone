import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './components/header/Header'
import Home from './pages/home/Home'
import MovieList from './components/movieList/MovieList'
import Movie from './pages/movieDetail/Movie'
import ErrorPage from './pages/error/ErrorPage'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path='movie/:id' element={<Movie />}></Route>
          <Route path='movies/:type' element={<MovieList />}></Route>
          <Route path='/*' element={<ErrorPage />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
