import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function Post() {
  return (
    <>
          <ul>
            {/* <li><a href='#footer'>About us</a></li> */}
            <li><HashLink to='/#footer' >About us</HashLink></li>
            <li><HashLink to='/#menu4' >Categories</HashLink></li>
            <li><Link to='/posts' >Posts</Link></li>
            {/* <li><a href='#menu4'>Categories</a></li> */}
          </ul>
    </>
)
}
function NoPosts(){
  return(
    <> 
      <li><HashLink to='/#menu5' >About us</HashLink></li>
      <li><HashLink to='/#menu4' >Categories</HashLink></li>
    </>
  )

}

export default function Footer() {
  const token = cookies.get('token');
    return (
        <footer>
        <div className='footer' id ='footer'>

          <div class='about'>
            <div className='logo'>
              <Link to='/'>BrainIT</Link>
            </div>
          </div>

          <div class="info">
            <p className="text">(+380) 123-45-67-89</p>
            <p className="text">brainIt@usof.brain</p>
          </div>

          <nav>
          <ul>
            {
              !token
              ?<NoPosts/>
              :<Post/>
            }
          </ul>
        </nav>
          
        </div>
      </footer>
    )
}