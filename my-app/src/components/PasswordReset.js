import axios from 'axios';
import React from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class Login extends React.Component{
        state={
                email:'',
                password:'',
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
               
               
                const api = {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        data: {
                            email: this.state.email
                        },
                        url: "http://localhost:8000/api/auth/password-reset"
                    };

                    console.log(api);
                    axios.post(api.url, api.data, { headers: api.headers })
                    .then(function (response) {
                        console.log(response)
                        document.getElementById('checkemail').style.display="block";
                        document.getElementById('erroremail').style.display="none";

                      })
                      .catch(function (error) {
                        
                        console.log(error);
                        document.getElementById('erroremail').style.display="block";
                        document.getElementById('checkemail').style.display="none";
                      });
              }
        render(){
        return (
                <div className='login'>
                         
                        <p>Sing in</p>
                        <form onSubmit={this.handleSubmit}>
                        <input type='text' placeholder='Email' onChange={this.handleChangeEmail} name="email"></input><br></br>
                        <input type='submit' value='Password Reset' id='password_reset'></input>   
                        </form>
                        <div id='checkemail'>Check your email</div>
                        <div id="erroremail">Incorrect email</div>
                </div>
        );
        }
    
}