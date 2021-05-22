import Login from './components/Login.js';
import Register from './components/Register.js';
import Posts from './components/Posts.js'
import UpdateProfile from './components/UpdateProfile.js'
import PasswordReset from './components/PasswordReset.js'
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
          <Route path="/register" component={Register} />
          <Route path="/posts" component={Posts} />
          <Route path="/updateprofile" component={UpdateProfile} />
          <Route path="/passwordreset" component={PasswordReset} />
        </Switch>
        <Footer />
      </Router>
    </div>
      
  );
  
}

export default App;
// export default Login; 

