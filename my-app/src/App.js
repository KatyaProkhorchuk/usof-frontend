import React from 'react';
import logo from './logo.svg';
// import search from 'search.png';
// import { Counter } from './features/counter/Counter';
import './App.css';

function App() {
  return (
    <div class='container'>
      <header>
        <div class='logo'>
          <a href='#'>USOF</a>
        </div>
        <div class='search'>
          <input type='text'></input>
          <input type='button'value='hi'></input>
        </div>
        <nav>
          <ul>
            {/* <li><a href='#'>Main</a></li> */}
            <li><a href='#footer'>About us</a></li>
            <li><a href='#menu4'>Categories</a></li>
          </ul>
        </nav>
        <div>
          <p>
            <a href='#'>Sign in</a>
          </p>

          <p>
            <a href='#'>Sign up</a>
          </p>
        </div>
      </header>
      <main>
      <div className='menu'>
        <p>Do you have question?</p>
        <div className="menutitle">
          <div className='menu1'></div>
          <div className='menu2'><br></br><br></br>We have an answer to your question<br></br>
How? Just ask your question to USOF and wait for <br></br>an answer<br></br>
Every developer know USOF<br></br>
<span> More than 10,000 people have already received answers to their questions</span></div>
        </div>
        
      </div>
      <div className='menu'>
        <p>Categories</p>
        <div className="menutitle"><div className='menu4' id='menu4'>Our developers are actively working to increase the number of categories
        <br></br>We already have various directions, for example:
        <ul>
          <li>
            Web development
          </li>
          <li>
            Android development
          </li>
          <li>
            Design
          </li>
          <li>
            Sockets
          </li>
          <li>
            PHP
          </li>
          <li>
            Python
          </li>
          <li>
            and other
          </li>
        </ul>
        </div>
          <div className='menu3'></div>
          
        </div>
        
      </div>
      </main>
    <footer>
        <div className='footer' id ='footer'>
          <p>About us</p>
        </div>
      </footer>
    </div>
      
  );
}

export default App;
