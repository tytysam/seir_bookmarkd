import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      {/* APP CHECKLIST

      BACK END...
      • Create an express app
      • Connect it to MongoDB
      • Create a schema (with a title + url)
      • Create your routes (Create, Read, Update, Destroy)
      • Test the routes using Postman
      • 

      FRONT END...
      • You need an index of a clickable list of bookmark titles that takes you to the url of your bookmark
      • You need a working form to add new bookmark records to the database 
  
      
      
       */}
    </div>
  );
}

export default App;
