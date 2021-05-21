import Login from './components/Login.js';
// import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter as Router, Switch,Route } from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className='container'>
      <Router>
        <Header />
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path="/login" component={Login} />
        </Switch>
        <Footer />
      </Router>
    </div>
      
  );
  
}

export default App;
// export default Login; 

