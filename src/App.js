import React, { useState } from 'react';
import './App.css';
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Recipe from './components/Recipe';
import Alert from './components/Alert';

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");

  const APP_ID = "b5df9612";
  const APP_KEY = "203adc817c0f632f005f096a2e928b92";
  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  
  const getData = async() => {
    if(query !== "") {
      // fetch data from url and set the data as 'result'
      const result = await Axios.get(url);
      
      // Error handling if the searching food does not exits
      if(!result.data.more) {
        return setAlert("The food you are searching does not exists :(")
      }
      setRecipes(result.data.hits);

      // load fetched results in console
      console.log(result);
      
      // make Alert and Query empty
      setAlert("");
      setQuery("");
    } else {
      // Error Handling if user has not filled in the query
      setAlert("Please fill the food name :) ")
    }
  }

  // set query as what user typed
  const onChange = e => setQuery(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    getData();
  }

  return (
    <div className="App">
      <h1 className="title">Food Recipe App</h1>
      <form className="search-form" onSubmit={onSubmit}>
        {alert !== "" && <Alert alert={alert} />}
        <input 
          type="text" 
          name="query"
          placeholder="Find your favourite food here!" 
          autoComplete="off"
          value={query}
          onChange={onChange}
        />
        <input 
          type="submit" 
          value="Search"
        />
      </form>
      <div className="recipes">
        {recipes !== [] && 
          recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)
        }
      </div>
    </div>
  );
}

export default App;
