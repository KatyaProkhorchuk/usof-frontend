import axios from 'axios';
import React from 'react';
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";
import Posts from './Posts.js'
// import Cat from '../'
const cookies = new Cookies();

const token = cookies.get('token');
function LogUpdate() {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const apii = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Token':token
        },
        url: "http://localhost:8000/api/usersId"
    };
    const api = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        
        url: "http://localhost:8000/api/users/"
    };
    console.log(token)
    axios.get(apii.url, { headers: apii.headers })
    .then(function (response) {
                
                console.log(response.data);
                // user_id=response.data
                
                console.log(api.url+response.data)
                axios.get(api.url+response.data, api.data,{ headers: api.headers })
                  .then(function (response) {
                      console.log(response.data[0].login)
                    // console.log(response.data);
                    document.getElementById('loginUser').innerHTML='Login:    '+response.data[0].login
                    document.getElementById('emailUser').innerHTML='Email:    '+response.data[0].email
                    document.getElementById('nameUser').innerHTML='Name:    '+response.data[0].name
                    // src='<img src='+response.data[0].profile_pictures+'/>'
                    
                    // document.getElementById('avatarUser').innerHTML="<img src='../img/cat.jpeg' ></img>"
                })
                  .catch(function (error) {
                    console.log(error);
                  });
              })
              .catch(function (error) {
                console.log(error);
              }); 
              return (<><div></div>
                    </>);
}
function deleteProfile() {
    console.log(';ld')
    var userId=cookies.get('user_id');
    const api = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        url: "http://localhost:8000/api/users/"+userId
    };
    console.log(api); 
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    axios.delete(api.url, api.data, { headers: api.headers })
    .then(function (response) {
        console.log(response);
        cookies.remove('token')
        window.location.href='/';
    })
    .catch(function (error) {
        console.log(error);
    });
}
export default class Register extends React.Component{
    state={
            email:'',
            password:'',
            login:'',
            name:'',
            profile_pictures:'',
            flag:'',
    }
    
    arr = new Object();  

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
    handleChangeAvatar = event =>{
        this.setState({ profile_pictures: event.target.value });
    }
    handleSubmit = event => {
            const user_id=0
            event.preventDefault();
            console.log(this.state)
            if (this.state.email){
                this.arr['email']=this.state.email
            }
            if (this.state.login){
                this.arr['login']=this.state.login
            }
            if (this.state.password){
                this.arr['password']=this.state.password
            }
            if (this.state.profile_pictures){
                this.arr['profile_pictures']=this.state.profile_pictures
            }
            if (this.state.name){
                this.arr['name']=this.state.name
            }
            // if (this.state.password){
            //     this.arr.set('password',this.state.password)
            // }
            console.log('arr')
            console.log(this.arr)
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            const apii = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Token':token
                },
                data: this.arr,
                url: "http://localhost:8000/api/usersId"
            };
            const api = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data: this.arr,
                url: "http://localhost:8000/api/users/"
            };
            console.log(token)
            axios.get(apii.url, { headers: apii.headers })
            .then(function (response) {
                        
                        console.log(response.data);
                        // user_id=response.data
                        
                        console.log(api.url+response.data)
                        axios.patch(api.url+response.data, api.data,{ headers: api.headers })
                          .then(function (response) {
                            console.log(response);
                            window.location.href='/updateprofile'
                          })
                          .catch(function (error) {
                            console.log(error);
                          });
                      })
                      .catch(function (error) {
                        console.log(error);
                        
                      });
            console.log(user_id)
            
            // const api = {
            //         headers: {
            //             'Content-Type': 'application/json',
            //             'Accept': 'application/json'
            //         },
            //         data: this.arr,
            //         url: "http://localhost:8000/api/auth/register"
            //     };
                console.log(api);
            //     axios.patch(api.url, api.data, { headers: api.headers })
                // .then(function (response) {
                //     console.log(response);
                //     window.location.href = '/login'
                //   })
                //   .catch(function (error) {
                //     console.log(error);
                //   });

          }
    
    render(){
    return (
        
            <div className='login'>
                    <p>Update my profile</p>
                    <div className='loginUpdateDisplay'>
                    <div className='logupdate'><LogUpdate/>
                        
                        <div className='infoUser' id ='avatarUser'></div><br></br>
                        <div className='infoUser' id='loginUser'></div><br></br>
                        <div className='infoUser' id='emailUser'></div><br></br>
                        <div className='infoUser' id='nameUser'></div><br></br>
                    </div>
                   <form onSubmit={this.handleSubmit}>
                     <input type='text' placeholder='Email' onChange={this.handleChangeEmail} name="Email"></input><br></br>
                    <input type='text' placeholder='Login' onChange={this.handleChangeLogin} name="login"></input><br></br>
                    <input type='password' placeholder='password' onChange={this.handleChangePassword} name="password"></input><br></br>
                    {/* <label >Avatar</label><input type="file" multiple accept="image/*,image/jpeg" onChange={this.handleChangeAvatar} name='avatar'></input><br></br> */}
                    
                   <input type='text' placeholder='Your name' onChange={this.handleChangeName} name="name"></input><br></br>
                    <input type='submit' value='Update'></input>
                    <div className='deleteProfile'onClick={deleteProfile}>DeleteProfile</div>
                    </form> 
                    
                    </div>
            </div>

    );
    }

}