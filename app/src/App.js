import React from 'react';
import logo from './denzel.svg';
import './App.css';
import Data from './movies.json'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="Image"/>
        <a
          className="App-link"
          href="https://www.imdb.com/name/nm0000243/"
          target="_blank"
          rel="noopener noreferrer"
        >
          📽️ This is the must-watch movies from Denzel's 📽️
        </a>
        <p>

        </p>
        <div>
        <table className="table"> 
            <thead>
              <tr>
                <th>Title</th>
                <th>Synopsis</th>
                <th>Metascore</th>
              </tr>
            </thead>         
                  {Data.map((movie,index) => {
                  if(movie.metascore >70){
                    return <tr>
                    <td><a  href={movie.link} target="_blank" rel="noopener noreferrer">{movie.title}</a></td>
                    <td>{movie.synopsis}</td>
                    <td className="metascore">{movie.metascore}</td>
                  </tr>}
                })}
            </table>
        </div>
      </header>
    </div>
  );
}

export default App;
