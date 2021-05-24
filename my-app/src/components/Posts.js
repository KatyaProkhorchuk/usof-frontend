import axios from 'axios';
import React from 'react';
import Cookies from 'universal-cookie';
import {Link} from "react-router-dom";
import Select from 'react-select';

const categorySelect=[
  {value:'',label:'All'},
  {value:'1',label:'Python'},
  {value:'2',label:'Web'},
  {value:'3',label:'Laravel'},
  {value:'4',label:'Php'},
  {value:'5',label:'Backend'},
]
const cookies = new Cookies();
const token = cookies.get('token');
function sortCategories(){
  console.log('sort')
  return(
    <>
    </>
  )
}
function postView(){
  console.log('post')
  console.log(document.getElementById('post1').value)
  cookies.set('postId', document.getElementById('post1').value);
  window.location.href='/informationPost'
  return(
    <>

    </>
  )
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
      document.getElementById('post1').innerHTML=response.data[response.data.length-1].title
      document.getElementById('post1').value=response.data[response.data.length-1].id
      document.getElementById('content1').innerHTML='<label> Content:   '+response.data[response.data.length-1].content+'</label>'
      document.getElementById('categories').innerHTML=response.data[response.data.length-1].categories
      // n=response.data.length-1
        return(
          <div>{response.data[response.data.length-1].title}</div>
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
    }
    render() {
      const {selectedOption}=this.state;
      const {select}=this.state;
        return (
        <>
        <Post/>
        <div className='posts'>
          <div className='headelSelect'>
          <Select className='select'
          value={selectedOption}
          onChange={this.handleChange}
          options={categorySelect}/>
          <div className='AddPost'><Link to='/createpost' >Add new post  +</Link></div></div>
          <p id='activePost'>Active posts</p>
          <div className='post' onClick={postView}>
            <div  className='postDb' id ='post1'></div>
            <div  className='postDb' id ='content1'></div>
            <button id='categories'className='categories'  onClick={sortCategories}></button>
          </div>
          {/* <div className='post'>
            <div id ='post2'></div>
          </div>
          <div className='post'>
            <div id ='post3'></div>
          </div>
          <div className='post'>
            <div id ='post4'></div>
          </div>
          <div className='post'>
            <div id ='post5'></div>
          </div>
          <div className='post'>
            <div id ='post6'></div>
          </div>
          <div className='post'>
            <div id ='post2'></div>
          </div> */}
        </div>
        </>
        )
      }
}
