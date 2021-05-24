import axios from 'axios';
import React from 'react';
export default class Register extends React.Component{
    state={
            email:'',
            password:'',
            login:'',
            name:'',
            repeat:'',
            flag:'',
    }
    
    handleChangeEmail = event => {
            this.setState({ email: event.target.value });
    }
    handleChangePassword = event => {
            this.setState({ password: event.target.value });
    }
    handleChangeLogin = event => {
        this.setState({ login: event.target.value });
    }
    handleChangerepeat = event =>{
        this.setState({ repeat: event.target.value });
    }
    handleChangeName = event =>{
        this.setState({ name: event.target.value });
    }
    handleSubmit = event => {
            event.preventDefault();
            console.log(this.state)
            const user = {
                    email: this.state.email,
                    password:this.state.password
                  };
            const element = (
                    <div>
                      <h1>success</h1>
                    </div>
                  );
            console.log(user)
           
            const api = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    data: {
                        email: this.state.email,
                        password: this.state.password,
                        login: this.state.login,
                        name: this.state.name
                    },
                    url: "http://localhost:8000/api/auth/register"
                };
                console.log(api);
                if(this.state.password==this.state.repeat){
                axios.post(api.url, api.data, { headers: api.headers })
                .then(function (response) {
                    console.log(response);
                    window.location.href = '/login'
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
                }

          }
          
    render(){
    return (
            <div className='login'>
                    <p>Sing up</p>
                    <form onSubmit={this.handleSubmit}>
                    <input type='text' placeholder='Email' onChange={this.handleChangeEmail} name="Email"></input><br></br>
                    <input type='text' placeholder='Login' onChange={this.handleChangeLogin} name="login"></input><br></br>
                    <input type='password' placeholder='password' onChange={this.handleChangePassword} name="password"></input><br></br>
                    <input type='password' placeholder='Repeat password' onChange={this.handleChangerepeat} name="repeat"></input><br></br>
                    <input type='text' placeholder='Your name' onChange={this.handleChangeName} name="name"></input><br></br>
                    <input type='submit' value='Sing up'></input>
                    
                    </form>
            </div>

    );
    }

}