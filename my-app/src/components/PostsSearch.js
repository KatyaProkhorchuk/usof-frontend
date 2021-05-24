import axios from 'axios';
import React from 'react';
import Cookies from 'universal-cookie';
import Select from 'react-select';
const cookies = new Cookies();
const token = cookies.get('token');
function postView(param){
    console.log('post'+param)
    // const id=document.getElementById("idPost").innerHTML
    cookies.set('postId', param);  // console.log(document.getElementById('post1').value)
    // cookies.set('postId', document.getElementById('post1').value);
    window.location.href='/informationPost'
    // return(
    //   <>
  
    //   </>
    // )
  }
  function All(param) {
    // console.log(param.id)
    // document.getElementById('post1').value=param.id
  
    return(
      <div className='post' onClick={() => postView(param.id)}> <p className='idPost'>{param.id}</p>
              <div  className='postDb' id ='post1'>{param.title}</div>
              <div  className='postDb' id ='content1'>{param.content}</div>
              <button id='categories'className='categories'>{param.categories}</button>
            </div>
            
    )
  }
// function Search() {
//     var searchPost=cookies.get('search')
//     console.log(searchPost)
    
//     if(searchPost){
//             const api = {
//               headers: {
//                   'Content-Type': 'application/json',
//                   'Accept': 'application/json'
//               },
//               url: "http://localhost:8000/api/postsf?search="+searchPost
//           };
          
  
//           console.log(api);
//           axios.get(api.url, { headers: api.headers })
//           .then(function (response) {
//             console.log(response)
//             const posts=response.data
//               console.log(posts)
//               var n=posts.length;
//               var src=''
//               console.log(posts[0].id)
//               console.log(posts[0].title)
//               console.log(posts[0].content)
              
//               document.getElementById('posts').innerHTML=src
//             //   <div className='post' onClick={() => postView(param.id)}> <p className='idPost'>{param.id}</p>
//             //   <div  className='postDb' id ='post1'>{param.title}</div>
//             //   <div  className='postDb' id ='content1'>{param.content}</div>
//             //   <button id='categories'className='categories'>{param.categories}</button>
//             // </div>
//             })
//             .catch(function (error) {
//               console.log(error);
//             });
//     }
//     return(
//       <>
//       </>
//     )
//   }

export default class Posts extends React.Component {
    state={
      posts:[]
    }
    componentDidMount() {
      var searchPost=cookies.get('search')
      console.log(searchPost)

      let that=this
      
      if(searchPost){
              const api = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                url: "http://localhost:8000/api/postsf?search="+searchPost
            };
            
    
            console.log(api);
            axios.get(api.url, { headers: api.headers })
            .then(function (response) {
              console.log(response)
              const posts=response.data
                that.setState({posts});
              cookies.remove('search')
              })
              .catch(function (error) {
                console.log(error);
              });
      }
      return(
        <>
        </>
      )
    }

    
      render() {
      const {selectedOption}=this.state;
      const {select}=this.state;
      
        return (
        <>
        {/* this.Search() */}
        <div className='posts' id='posts'>
          {
        this.state.posts.map(post=><All id={post.id} title={post.title} content={post.content} categories={post.categories}/>)
        
        }
        </div>
        </>
        )
      }
}
