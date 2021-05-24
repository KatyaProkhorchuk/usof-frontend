import axios from 'axios';
import React from 'react';
import Cookies from 'universal-cookie';
import {Link} from "react-router-dom";
import Select from 'react-select';
const cookies = new Cookies();
const token = cookies.get('token');
const categorySelect=[
  {value:'',label:'All'},
  {value:'0',label:'My Posts'},
  {value:'python',label:'Python'},
  {value:'web',label:'Web'},
  {value:'laravel',label:'Laravel'},
  {value:'php',label:'Php'},
  {value:'backend',label:'Backend'},
]

function sortCategories(){
  console.log('sort')
  return(
    <>
    </>
  )
}
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
function Post() {
  const api = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    url: "http://localhost:8000/api/posts"
    };
    console.log(api)
    axios.get(api.url, { headers: api.headers })
    .then(function (response) {
      console.log(response.data)
      const array=response.data[response.data.length-1].title
      console.log(array)
      // document.getElementById('post1').innerHTML=response.data[response.data.length-1].title
      // document.getElementById('post1').value=response.data[response.data.length-1].id
      // document.getElementById('content1').innerHTML='<label> Content:   '+response.data[response.data.length-1].content+'</label>'
      // document.getElementById('categories').innerHTML=response.data[response.data.length-1].categories
      var n=response.data.length
      var index=1;
      var src='';
      var txt=''
      for (let i=0;i<n;i++){
        src+=`<div className="post" onClick={postView}><div className="postDb" id="post'+index+'">`+response.data[i].title+`</div><div  className="postDb" id ="content`+index+`"><label> Content:   `+response.data[response.data.length-1].content+`</label></div><button id="categories"className="categories">`+response.data[response.data.length-1].categories+`</button>`
        txt='post'+index;
       
        document.getElementById('allposts').innerHTML=src;
        document.getElementById(txt).value=response.data[i].id


      } console.log(src)
      // <div className='post' onClick={postView}>
      //       <div  className='postDb' id ='post1'></div>
      //       <div  className='postDb' id ='content1'></div>
      //       <button id='categories'className='categories'></button>
      //     </div>
        return(
          <div></div>
        )
    })
    .catch(function (error) {
      console.log(error);
    });
      console.log('1')
      return (
        <div></div>
      )
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
function Other(param) {
  console.log(param.id)
  // document.getElementById('post1').value=param.id
  return(
    <div className='post' onClick={() => postView(param.id)}><p className='idPost'>{param.id}</p>
            <div  className='postDb' id ='post1'>{param.title}</div>
            <div  className='postDb' id ='content1'>{param.content}</div>
            <button id='categories'className='categories'>{param.categories}</button>
          </div>
          
  )
}

export default class Posts extends React.Component {
    state={
      selectedOption:null,
      posts:[],
      category:[],
      select:true
    }
    handleChange=selectedOption=>{
      this.setState({selectedOption});
      console.log(selectedOption)
      if(selectedOption.value!="" &&selectedOption.value!=0){
        console.log(selectedOption.value)
        const select=false;
        this.setState({select})
        const api = {
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          
          url: "http://localhost:8000/api/categories/"+selectedOption.value+"/posts"
          };
          console.log(api)
          let that = this
          axios.get(api.url, { headers: api.headers })
          .then(function (response) {
            console.log(response)
            const category=response.data
            that.setState({category})
            
          
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      else  if (selectedOption.value!=0){
        const select=true;
        this.setState({select});
        const api = {
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          
          url: "http://localhost:8000/api/posts"
          };
          console.log(api)
          let that = this

          axios.get(api.url, { headers: api.headers })
          .then(function (response) {
            console.log(response)
            const posts=response.data
            console.log(posts)
            that.setState({posts});
          })
          .catch(function (error) {
            console.log(error);
          });
          
      }
      else{
        console.log(selectedOption.value)
        const select=false;
        this.setState({select})
        console.log('My')
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;

        const api = {
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          
          url: "http://localhost:8000/api/postsuser"
          };
          console.log(api)
          let that = this
          axios.get(api.url, { headers: api.headers })
          .then(function (response) {
            console.log(response)
            const category=response.data
            that.setState({category})
            
          
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
    
      render() {
      const {selectedOption}=this.state;
      const {select}=this.state;
      
        return (
        <>
        {/* <Post/> */}
        <div className='posts'>
          <div className='headelSelect'>
          <Select className='select'
          value={selectedOption}
          onChange={this.handleChange}
          options={categorySelect}/>
          <div className='AddPost'><Link to='/createpost' >Add new post  +</Link></div></div>
          {/* <p id='activePost'>Active posts</p> */}
          <div>
          {
            select
            ?this.state.posts.map(post=><All id={post.id} title={post.title} content={post.content} categories={post.categories}/>)
            :this.state.category.map(categ=><Other id={categ.id} title={categ.title} content={categ.content} categories={categ.categories}/>)
          }
          {/* <div className='post' onClick={postView}>
            <div  className='postDb' id ='post1'></div>
            <div  className='postDb' id ='content1'></div>
            <button id='categories'className='categories'></button>
          </div> */}
        </div>
        </div>
        </>
        )
      }
}
