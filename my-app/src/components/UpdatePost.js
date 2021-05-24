import axios from 'axios';
import React from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const token = cookies.get('token');
var PostId=0;
let n=0;

function ThisPostsUpdate(){
    PostId=cookies.get('postId')
    // document.getElementById('like').onclick = like;
    console.log(PostId)
    // cookies.remove('postId')
    const api = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        url: "http://localhost:8000/api/posts/"+PostId
        };
        console.log(api)
        axios.get(api.url, { headers: api.headers })
        .then(function (response) {
            console.log(response.data[0])
            document.getElementById('title').value=response.data[0].title
            document.getElementById('content').value=response.data[0].content
            console.log(response.data[0].user_id)
            var user=cookies.get('user_id')
            
        })
        .catch(function (error) {
          console.log(error);
        });
    return(
        <>
        </>
    )
}
export default class CreatePost extends React.Component{
    state={
            title:'',
            content:'',
    }
    
    handleChangeTitle = event => {
            this.setState({ title: event.target.value });
    }
    handleChangeContent = event => {
        this.setState({ content: event.target.value });
    }
    handleSubmit = event => {
            event.preventDefault();
            let arr=new Object();
            this.state.title=document.getElementById('title').value;
            this.state.content=document.getElementById('content').value;
            console.log(this.state)
            if(this.state.title)
                arr['title']=this.state.title
            if(this.state.content)
                arr['content']=this.state.content
            if(arr){
                const api = {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        data: arr,
                        url: "http://localhost:8000/api/posts/"+PostId
                    };
                    console.log(api); 
                    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

                    axios.patch(api.url, api.data, { headers: api.headers })
                    .then(function (response) {
                        console.log(response);
                        window.location.href='/InformationPost';
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }

          }
          
    render(){
    return (
        <>
        <ThisPostsUpdate/>
            <div className='newPost'>
                    <p>Update post</p>
                    <form onSubmit={this.handleSubmit}>
                    <input type='text' placeholder='title' id='title'  name="title"></input><br></br>
                    <textarea  placeholder='content' id='content'  name="content"></textarea><br></br>
                    
                    <input type='submit' value='Update'></input>
                    
                    </form>
            </div>
        </>
    );
    }

}