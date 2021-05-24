import axios from 'axios';
import React, { Component, useEffect } from 'react';
import Cookies from 'universal-cookie';
var status
const cookies = new Cookies();
const token = cookies.get('token');
var PostId=0
// document.getElementById("like").onclick = function () {
let user
var flag;
function likes() {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    console.log('like')
    var tmp=0;
    var arr=new Object();
    arr['type']='like'
    const api ={
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data:arr,
        url: "http://localhost:8000/api/posts/"+PostId+"/like"
        };
        console.log(api)
        axios.post(api.url,api.data, { headers: api.headers })
        .then(function (response) {
            console.log(response)
            tmp= document.getElementById('count_like').value;
            tmp=tmp+1
            document.getElementById('count_like').innerHTML=tmp
            document.getElementById('count_like').value=tmp
            
        })
        .catch(function (error) {
          console.log(error);
        });
    
    console.log(tmp)
        return '1'
}

function dislike() {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    console.log('dislike')
    var tmp=0;
    var arr=new Object();
    arr['type']='dislike'
    const api ={
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data:arr,
        url: "http://localhost:8000/api/posts/"+PostId+"/like"
        };
        console.log(api)
        axios.post(api.url,api.data, { headers: api.headers })
        .then(function (response) {
            console.log(response)
            tmp= document.getElementById('count_like').value;
            tmp=tmp-1
            document.getElementById('count_like').innerHTML=tmp
            document.getElementById('count_like').value=tmp
            
        })
        .catch(function (error) {
          console.log(error);
        });
    
    console.log(tmp)
    return(
        <>
    
        </>
      )
}
function CommentCreate() {
    console.log('comment')
    var text=document.getElementById('commentText').value
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    var arr=new Object();
    arr['content']=text
    if(text){
        console.log(text)
        const api ={
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data:arr,
            url: "http://localhost:8000/api/posts/"+PostId+"/comments"
            };
            console.log(api)
            axios.post(api.url, api.data,{ headers: api.headers })
            .then(function (response) {
                console.log(response)
                document.getElementById('commentText').value=null
                window.location.href='/informationPost'
            })
            .catch(function (error) {
              console.log(error);
              
            });
            
        
        
        
    }
}
function userName(user_id,str1,func) {
    console.log(user_id)
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    console.log('Name')
    const api ={
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        url: "http://localhost:8000/api/users/"+user_id
        };
        console.log(api)
        axios.get(api.url,api.data, { headers: api.headers })
        .then(function (response) {
            console.log(response.data[0].name)
            func(str1,response.data[0].name)
            
        })
        .catch(function (error) {
          console.log(error);
        });
        console.log('lpkp')
        // return user_id
}
// function numbertime(time) {
//     return new Date(time/1000)
// }
function Comments() {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    
    var src=''
    var arr=new Object();
    arr['type']='dislike'
    const api ={
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data:arr,
        url: "http://localhost:8000/api/posts/"+PostId+"/comments"
        };
        console.log(api)
        axios.get(api.url,api.data, { headers: api.headers })
        .then(function (response) {
            console.log(response)
            const n=response.data.length
            for(let i =0;i<n;i++){
                var text=response.data[i].content
                // var time=numbertime(response.data[i].date)
                var user_name
                // src+='<div id="comment"> <div id="info"><div id="autor">'+user+' </div></div><div id="contentComment">'+text+'</div></div><br></br>'
                user=userName(response.data[i].user_id, text,(text1,user)=>{
                    console.log(user)
                    var coment ='<div id="comment"> <div id="info"><div id="autor">'+user+' </div></div><div id="contentComment">'+text1+'</div></div></div><br></br>'
                    document.getElementById('comments').innerHTML+=coment
                    user_name=user
                })// потом получить имя 
                console.log(user_name)
            // }
                // <div id='comment'>
                //         <div id='info'>
                //             <div id='autor'>
                //             </div>
                //             <div id='time'>
                //             </div>
                //         </div>
                //         <div id='contentComment'></div>
                //     </div>
                
            }
            console.log(src)
            
            
        })
        .catch(function (error) {
          console.log(error);
        });
}
function ThisPost() {
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
            document.getElementById('title').innerHTML=response.data[0].title
            document.getElementById('thisPostContent').innerHTML=response.data[0].content
            document.getElementById('count_like').innerHTML=response.data[0].rating
            document.getElementById('count_like').value=response.data[0].rating
            document.getElementById('categories1').innerHTML=response.data[response.data.length-1].categories
            console.log(response.data[0].user_id)
            var user=cookies.get('user_id')
            if (user==response.data[0].user_id){
                document.getElementById('notifButton1').style.display='block'
                document.getElementById('notifButton2').style.display='block'
            }
            if(response.data[0].status==1){
                status=response.data[0].status
                document.getElementById("statusPost").innerHTML='This post is active'
                console.log('status='+status)
            }
            else {
                document.getElementById("statusPost").innerHTML='This post is no active'
            }
        })
        .catch(function (error) {
          console.log(error);
        });
        console.log('status='+status)
    return(
        <>
        </>
    )
}
function UpdatePost() {
    console.log('update')
    window.location.href='/updatePost'
}
function deletePost() {
    const api = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        url: "http://localhost:8000/api/posts/"+PostId
    };
    console.log(api); 
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    axios.delete(api.url, api.data, { headers: api.headers })
    .then(function (response) {
        console.log(response);
        
        window.location.href='/posts';
    })
    .catch(function (error) {
        console.log(error);
    });
}
export default function InformationPost()  {
        useEffect(() => {
            Comments()
        }, [])

        return (
        <>
        <ThisPost/>
        
        <div className='informationThisPost'>
            <p id='statusPost'></p>
        
            <div className='notificationPost' id='notificationPost'>
                <div className='notifButton' id='notifButton1' onClick={UpdatePost}>Update</div>
                <div className='notifButton' id='notifButton2' onClick={deletePost}>Delete</div>
            </div>
            <div className='informationPost'>
            <div id='rating'>
               <div id = 'like' onClick={likes}></div>
               <p id='count_like'></p>
               <div id ='dislike' onClick={dislike}></div> 
            </div>
            <div>
                <div className='thisPost'>
                    <p id='title'></p>
                    <div className='thisPostContent' id='thisPostContent'></div>
                    <div id='categories1'className='categoriesInfo'></div>
                    
                </div>
                <div className='comments' id='comments'>
                    {/* <div id='comment'>
                        <div id='info'>
                            <div id='autor'>
                            </div>
                            <div id='time'>
                            </div>
                        </div>
                        <div id='contentComment'></div>
                    </div> */}
                </div>
            
                    {/* <ViewComment/> */}
                
                <div className='commentCreate'>
                <textarea id ='commentText' placeholder='comments'></textarea>
                <div className='buttonComment' onClick={CommentCreate}>Send</div>
                </div>
            </div>
        </div>
        </div>
       </>
        )
}
