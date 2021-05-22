import axios from 'axios';
import React from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const token = cookies.get('token');

export default function Logout(){
    
    const api = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Token':token
        },
        url: "http://localhost:8000/api/auth/logout"
    };
    
    console.log(api.headers);
    axios.post(api.url,{ headers: api.headers })
    .then(function(response) {
        console.log(response);
        
        // axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        console.log(axios.defaults.headers.common.Authorization)
        
        // cookies.remove('token');
        // delete axios.defaults.headers.common.Authorization;
        // document.getElementById('signin').style.display="inline-block";
        // document.getElementById('signup').style.display="inline-block";
        // document.getElementById('update').style.display="none";
        // document.getElementById('logout').style.display="none";
        window.location.href='/'
        // window.location.href = '/posts'

      })
      .catch(function (error) {
        console.log(error);console.log('tokendelete')
      });
      return(null);
}