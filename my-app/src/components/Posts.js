import axios from 'axios';
import React from 'react';
import Cookies from 'universal-cookie';
import {Link} from "react-router-dom";

const cookies = new Cookies();
const token = cookies.get('token');
function Post() {
  const api = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    url: "http://localhost:8000/api/posts"
    };
    console.log(api)
    axios.get(api.url, { headers: api.headers })
    .then(function (response) {
      const array=response.data[response.data.length-1].title
      console.log(array)
      document.getElementById('post1').innerHTML=response.data[response.data.length-1].title
      document.getElementById('categories1').innerHTML=response.data[response.data.length-1].categories
      // n=response.data.length-1
        return(
          <div>{response.data[response.data.length-1].title}</div>
        )
    })
    .catch(function (error) {
      console.log(error);
    });
      console.log('1')
      return (
        <div></div>
      )
}
export default class Posts extends React.Component {
    // function isLogin(){
    //     const token = cookies.get('token');
    //     console.log('post')
    //     console.log(token)
    //     if(token){
    //         document.getElementById('logout').style.display='none'
    //         console.log ()
    //         // 
    //         // document.getElementById('signup').style.display="none";
    //         // document.getElementById('update').style.display="inline-block";
    //         // document.getElementById('logout').style.display="inline-block";
    //         // document.getElementById('logout').style.display='block';

    //         axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    //         var signin = document.querySelector('signin');
    //         // console.log(signin)
    //         // document.getElementById('logout').style.display="none";
    //     }
    // }
    // isLogin() 
    // return (
    //     <div>
    //         post
    //     </div>
    // )
    // handle(){
    //     document.getElementById('signin').style.display="none";
    //     document.getElementById('signup').style.display="none";
    //     document.getElementById('update').style.display="inline-block";
    //     document.getElementById('logout').style.display="inline-block";
    //     setTimeout(899)        
    // }
    
    render() {
        return (
        <>
        <Post/>
        <div className='posts'>
          <p>Last Post</p>
          <div className='post'>
            <div id ='post1'></div>
            <div id='categories1'className='categories'></div>
          </div>
          {/* <div className='post'>
            <div id ='post2'></div>
          </div>
          <div className='post'>
            <div id ='post3'></div>
          </div>
          <div className='post'>
            <div id ='post4'></div>
          </div>
          <div className='post'>
            <div id ='post5'></div>
          </div>
          <div className='post'>
            <div id ='post6'></div>
          </div>
          <div className='post'>
            <div id ='post2'></div>
          </div> */}
        </div>
        </>
        )
      }
}
