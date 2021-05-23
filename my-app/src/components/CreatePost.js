import axios from 'axios';
import React from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const token = cookies.get('token');
let n=0;
function Categories() {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const api = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Token':token
        },
        url: "http://localhost:8000/api/categoriesUser"
    };
    // const api = {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //     },
        
    //     url: "http://localhost:8000/api/users/"
    // };
    // console.log(token)
    axios.get(api.url, { headers: api.headers })
    .then(function (response) {
                n=response.data.length
                console.log(n)
                var src='';
                // <input type='radio' value='PHP' name='radio' ></input><label>PHP</label><br></br>
                for (let i = 0; i<n;i++){
                    src+= '<input type="radio" className="radio" value="'+response.data[i].title+'" name="radio" id="'+i+'" onChange={this.handleChangeRadio}></input><label>'+ response.data[i].title+'</label><br></br>';
                }
                document.getElementById('categoriesradio').innerHTML=src;
                console.log(src)
                console.log(response.data);
    //             // user_id=response.data
                
    //             console.log(api.url+response.data)
    //             axios.get(api.url+response.data, api.data,{ headers: api.headers })
    //               .then(function (response) {
    //                   console.log(response.data[0].login)
    //                 // console.log(response.data);
    //                 document.getElementById('loginUser').innerHTML='Login:    '+response.data[0].login
    //                 document.getElementById('emailUser').innerHTML='Email:    '+response.data[0].email
    //                 document.getElementById('nameUser').innerHTML='Name:    '+response.data[0].name
    //                 // src='<img src='+response.data[0].profile_pictures+'/>'
                    
    //                 // document.getElementById('avatarUser').innerHTML="<img src='../img/cat.jpeg' ></img>"
    //             })
    //               .catch(function (error) {
    //                 console.log(error);
    //               });
              })
              .catch(function (error) {
                console.log(error);
              }); 
    //           return (<><div></div>
    //                 </>);
    return (
        <>
        <div></div>
        </>
    )
}
export default class CreatePost extends React.Component{
    state={
            title:'',
            content:'',
            categories:'',
    }
    
    handleChangeTitle = event => {
            this.setState({ title: event.target.value });
    }
    handleChangeContent = event => {
        this.setState({ content: event.target.value });
    }
    handleChangeRadio = event => {
        console.log('radio');
        this.setState({ categories: event.target.value });
    }
    handleSubmit = event => {
            event.preventDefault();
            console.log(this.state)
            console.log(document.getElementsByClassName('radio').check)
            let str=''
            for(let i=0;i<n;i++){
                if(document.getElementById(i).checked){
                    str=document.getElementById(i).value;
                }
            }
            console.log(str)
            if(this.state.title&&this.state.content&&str){
                const api = {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        data: {
                            title: this.state.title,
                            content: this.state.content,
                            categories: str
                        },
                        url: "http://localhost:8000/api/posts"
                    };
                    console.log(api);
                    axios.post(api.url, api.data, { headers: api.headers })
                    .then(function (response) {
                        console.log(response);
                        window.location.href='/posts';
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }

          }
          
    render(){
    return (
            <div className='newPost'>
                    <p>New Question</p>
                    <form onSubmit={this.handleSubmit}>
                    <input type='text' placeholder='title' onChange={this.handleChangeTitle} name="title"></input><br></br>
                    <textarea  placeholder='content' id='content' onChange={this.handleChangeContent} name="content"></textarea><br></br>
                    <div className='categoriesradio' id='categoriesradio'>
                        <Categories/>
                        {/* onChange={this.handleChangeContent} */}
                        {/* <input type='radio' value='PHP' name='radio' ></input><label>PHP</label><br></br>
                        <input type='radio' value='C/C++' name='radio' ></input><label>C/C++</label><br></br>
                        <input type='radio' value='Java' name='radio' ></input><label>Java</label><br></br>
                        <input type='radio' value='Python' name='radio' ></input><label>Python</label><br></br>
                        <input type='radio' value='Android/iOS' name='radio' ></input><label>Android/iOS</label><br></br> */}

                    </div>
                    <input type='submit' value='Create'></input>
                    
                    </form>
            </div>

    );
    }

}