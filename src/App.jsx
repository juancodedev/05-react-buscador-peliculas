import "./App.css";
import { useMovies } from "./hooks/useMovies.js";
import { Movies } from "./components/Movies.jsx";
import { useState, useEffect, useRef} from "react";

function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current){
      isFirstInput.current = search === ''
      return
    }
    if (search === ''){
      setError('No se puede buscar una pelicula vacia')
      return
    }
    if (search.match(/^\d+$/)){
      setError("No se puede buscar una pelicula con numero")
      return
    }
    if (search.length < 3){
      setError('La consulta debe tener al menos 3 letras')
      return
    }
    setError(null)

  }, [search])
  return { search, updateSearch, error}
}


function App() {
  // const movies = responseMovies.Search
  const {search, updateSearch, error} = useSearch()
  const { movies, loading, getMovies} = useMovies({search})

  // const [query, setQuery] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    //const { search } = Object.fromEntries(new window.FormData(event.target))
    console.log({search})
    getMovies()

  }
  const handleChange = (event) => {
    updateSearch(event.target.value)
  }

  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas </h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={search}
            name="query"
            placeholder="matrix, avengers, other"
          />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </header>
      <main>
        {
          loading? <p>Cargando ......</p>:<Movies movies={movies} />
        }
        
      </main>
    </div>
  );
}

export default App;
