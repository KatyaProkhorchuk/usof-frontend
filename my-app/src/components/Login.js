import axios from 'axios';
import React from 'react';
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";
import Posts from './Posts.js'

const cookies = new Cookies();

export default class Login extends React.Component{
        state={
                email:'',
                password:'',
                flag:'',
        }
        handleChangeEmail = event => {
                this.setState({ email: event.target.value });
        }
        handleChangePassword = event => {
                this.setState({ password: event.target.value });
        }
        handleSubmit = event => {
                event.preventDefault();
                console.log('button')
                const user = {
                        email: this.state.email,
                        password:this.state.password
                      };
                // const [cookies, setCookie] = useCookies(['name']);

                console.log(user)
               
                const api = {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        data: {
                            email: this.state.email,
                            password: this.state.password
                        },
                        url: "http://localhost:8000/api/auth/login"
                    };
                //     const [cookies, setCookie] = useCookies(['user']);

                    console.log(api);
                    axios.post(api.url, api.data, { headers: api.headers })
                    .then(function (response) {
                        console.log(response.data.token);
                        // document.cookie="token="+response.data.token
                        // setCookie('token',response.data.token)
                        cookies.set('token', response.data.token);
                        axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
                        console.log(axios.defaults.headers.common.Authorization)
                        console.log('go post');
                        window.location.href = '/posts'

                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                      
              }
              passwordreset = event => {
                      console.log('reset')
                        window.location.href = '/passwordreset'
              }
              
        render(){
        return (
                <div className='login'>
                         
                        <p>Sing in</p>
                        <form onSubmit={this.handleSubmit}>
                        <input type='text' placeholder='Email' onChange={this.handleChangeEmail} name="email"></input><br></br>
                        <input type='password' placeholder='password' onChange={this.handleChangePassword} name="password"></input><br></br>
                        <input type='submit' value='Sing in' ></input><br></br>
                        {/*  */}
                        <div className='password_reset'><Link to='passwordreset'>Password Reset</Link></div>
                        </form>
                        
                        
                </div>
        );
        }
    
}