import { useState } from 'react';
import './App.css';
import axios from 'axios';
import logo from './assets/logo.png'

function App() {

  const [joke, setJoke] = useState(null);
  const [error, setError] = useState(null);

  const API_BASE_URL= "https://carambar-backend-53rm.onrender.com/api/jokes";

  const fetchRandomJoke = async () => {
    setJoke(null);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/random`);
      setJoke(response.data);
    } catch (error) {
      console.error("Error fetching random joke: ", error);
      if (error.response) {
        setError(error.response.data.message || `Server Error: ${error.response.status}`);
      } else if (error.request) {
        setError("No server response. Check the connection or state of backend");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <>
      <div className="App">
        <header>
          <div className=' nav d-flex'>
            <a href='#'>
              <img src={logo} alt="" />
            </a>
            <div className='d-flex'>
              <a href='#'>Accueil</a>
              <a href='#'>Produits</a>
              <a href='#'>Contact</a>
              <a href='#'>A propos</a>
            </div>
          </div>
        </header>
        <div className='card'>
          <h1>Vous cherchez une blague ?</h1>
          {joke && (
            <>
              <div className='joke'>
                <p> {joke.question} </p>
                <p> {joke.response} </p>
              </div>
              <div>
                {joke.id && <small> (Cliquer pour une nouvelle blague) </small>}
              </div>
              <br />
            </>
          )}
          <button className='btn' onClick={fetchRandomJoke}>Cliquez ici !</button>

          {error && <p>Erreur: {error}</p>}

          {!joke && !error && <p>Cliquez sur le bouton pour découvrir une blague !</p>}
        </div>
      </div>
      <footer>
          @Copyright by Maxime LARQUETOUX 2025
      </footer>
    </>
  );
}

export default App;
