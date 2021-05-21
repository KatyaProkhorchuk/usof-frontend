import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function Header() {
    return (
        <header>
        <div className='logo'>
          <Link to='/'>BrainIT</Link>
        </div>
        <div className='search'>
          <input type='text'></input>
          <input type='button'value='hi'></input>
        </div>
        <nav>
          <ul>
            {/* <li><a href='#footer'>About us</a></li> */}
            <li><HashLink to='/#footer' >About us</HashLink></li>
            <li><HashLink to='/#menu4' >Categories</HashLink></li>
            {/* <li><a href='#menu4'>Categories</a></li> */}
          </ul>
        </nav>
        <div>
          <p>
          <Link to="/login">Sign in</Link>

            {/* <a href='#'>Sign in</a> */}
          </p>

          <p>
            {/* <a href='#'>Sign up</a> */}
          </p>
        </div>
      </header>
    )
}