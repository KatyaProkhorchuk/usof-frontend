import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
function logout(){
  console.log('hi')
  cookies.remove('token')
  cookies.remove('user_id')
  cookies.remove('postId')
  window.location.href='/'
}
function LoginButtons() {
    return (
      <>
        <p id='signin'>
          <Link to="/login" >Sign in</Link>
        </p>
        <p id='signup'>
          <Link to="/register" >Sign up</Link>
        </p>
      </>
  )
}
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
      <li><HashLink to='/#footer' >About us</HashLink></li>
      <li><HashLink to='/#menu4' >Categories</HashLink></li>
    </>
  )

}
function LoggedButtons() {
  return (
    <>
      <p id='update'>
        <Link to="/updateprofile" >Update Profile</Link>
      </p>
      <p  id="logout"onClick={logout}>Log out
        
        {/* <Link to="/logout" >Log out</Link> */}
      </p>
    </>
  )
}
function SearchPost() {
  var textSearch=document.getElementById('searchText').value
  console.log(textSearch)
  
  cookies.set('search',textSearch)
  window.location.href='/postsSearch';
  // console.log()
  // const api = {
  //   headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //   },
  //   data:arr,
  //   url: "http://localhost:8000/api/postsFound"
  //   };
  //   console.log(api)
  //   axios.get(api.url,api.data, { headers: api.headers })
  //   .then(function (response) {
  //       console.log(response)
  //       tmp= document.getElementById('count_like').value;
  //       tmp=tmp+1
  //       document.getElementById('count_like').innerHTML=tmp
  //       document.getElementById('count_like').value=tmp
        
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
}
export default function Header() {
  const token = cookies.get('token');
    return (
        <header>
        <div className='logo'>
          <Link to='/'>BrainIT</Link>
        </div>
        <div className='search' >
          <input type='text' id='searchText'></input>
          <input type='button'value='hi' onClick={SearchPost}></input>
        </div>
        <nav>
          <ul>
            {
              !token
              ?<NoPosts/>
              :<Post/>
            }
            {/* <li><a href='#footer'>About us</a></li> */}
            {/* <li><HashLink to='/#footer' >About us</HashLink></li>
            <li><HashLink to='/#menu4' >Categories</HashLink></li> */}
            {/* <li><a href='#menu4'>Categories</a></li> */}
          </ul>
        </nav>
        <div>
          {
            !token
            ? <LoginButtons />
            : <LoggedButtons />
          }
        </div>
      </header>
    )
}