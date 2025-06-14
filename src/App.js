import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [joke, setJoke]= useState(null);
  const [error, setError]= useState(null);

  const fetchRandomJoke= async ()=>{
    setJoke(null);
    setError(null);
    try {
      const response= await axios.get("http://localhost:4000/api/jokes/random");
      setJoke(response.data);
    } catch (error) {
      console.error("Error fetching random joke: ", error);
      if(error.response){
        setError(error.response.data.message || `Server Error: ${error.response.status}`);
      }else if(error.request){
        setError("No server response. Check the connection or state of backend");
      }else{
        setError(error.message);
      }
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Carambar & Co</h1>
        <button onClick={fetchRandomJoke}>Afficher une Blague Aléatoire</button>

        {error && <p>Erreur: {error}</p>}

        {joke && (
          <div>
            <p> {joke.question} </p>
            <p> {joke.response} </p>
            {joke.id && <small> (Cliquer pour re-afficher cette blague: {joke.id}) </small>}
          </div>
        )}
        {!joke && !error && <p>Cliquez sur le bouton pour découvrir une blague !</p>}
      </header>
    </div>
  );
}

export default App;
