import axios from 'axios';
import React from 'react';

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
                const user = {
                        email: this.state.email,
                        password:this.state.password
                      };
                console.log(user)
                // const user = {
                //   name: this.state.name
                // };
                // Route::post('auth/login', [UsersController::class,'login']);//++
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
                    console.log(api);
                    axios.post(api.url, api.data, { headers: api.headers })
                    .then(function (response) {
                        console.log(response);
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                // axios.post(`auth/login`, { user })
                //   .then(res => {
                //     console.log(res);
                //     console.log(res.data);
                //   })
              }
        render(){
        return (
                <div className='login'>
                         
                        <p>Sing in</p>
                        <form onSubmit={this.handleSubmit}>
                        <input type='text' placeholder='Email' onChange={this.handleChangeEmail} name="email"></input><br></br>
                        <input type='password' placeholder='password' onChange={this.handleChangePassword} name="password"></input><br></br>
                        <input type='submit' value='Sing in'></input>
                        </form>
                </div>
        );
        }
    
}
// const initialState = {
//   email: '',
//   password: '',
//   err: '',
//   success: ''
// }

// export default function Login(){
//   let dispatch = useDispatch()
//   const [user, setUser] = useState(initialState)
//   const {email, password, err, success} = user

//   const handleChangeInput = e => {
//     const {name, value} = e.target
//     setUser({...user, [name]:value, err: '', success: ''})
//   }

//   const handleSubmit = async e => {
//     e.preventDefault()
//     try {
//       const res = await axios.post('api/auth/login', {email, password})
//       setUser({...user, err: '', success: res.data.msg})
//       localStorage.setItem('logInOnStartUp', true)
//       dispatch(login())
//       window.location.href = '/'
//     } catch (err) {
//         err.response.data.msg &&
//           setUser({...user, err: err.response.data.msg, success: ''})
//     }
//   }

//   return (
//     <div>
//       <h2>Login</h2>
//       {err && showErrMsg(err)}
//       {success && showSuccessMsg(success)}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor={'login-email'}>Email</label>
//           <input type={'email'} required={true} name={'email'} id={'login-email'}
//                  value={email} onChange={handleChangeInput}/>
//         </div>
//         <div>
//           <label htmlFor={'login-password'}>Password</label>
//           <input type={'password'} required={true} name={'password'} id={'login-password'}
//                  value={password} onChange={handleChangeInput}/>
//         </div>
//         <div>
//           <button type={"submit"}>Login</button>
//           <Link to={'/forgotPassword'}>Forgot your password</Link>
//         </div>
//       </form>

//       <p>New Customer? <Link to={'/register'}>Register</Link></p>
//     </div>
//   )
// }
// export default Login;