import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './components/header/Header'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route index element={<h1>salam</h1>}></Route>
        <Route path='movie/:id' element={<h1>Movie Detail</h1>}></Route>
        <Route path='movies/:type' element={<h1>Movies</h1>}></Route>
        <Route path='/*' element={<h1>Error</h1>}></Route>
      </Routes>
    </Router>
  )
}

export default App
