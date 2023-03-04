import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MyButton from '../components/MyButton';
import MyHeader from '../components/MyHeader';


const Blog = () => {

  Axios.defaults.withCredentials = true; //axios

  const idx = useParams().id;

  const [data, setData] = useState([]);

    
  useEffect(() => {
    const config = {
      headers:{
        "Content-Type": "application/json",
      },
    };
    Axios.get(`http://localhost:8080/api/boards/${idx}`, config)
      .then(res => {
        console.log(res.data);
        setData([res.data, ...data]);
      })
      .catch(err => {
        console.log(err);
      });
    },[]);

//////

  let userId = localStorage.getItem('userId');
  if(userId == ""){
    window.location.href ="/login";
  }
  console.log(userId)


  const navigate = useNavigate();

  console.log(data);



  useEffect(() => {
    if(data.length >= 1) {
      const targetBlog = data.find(
        (it) => parseInt(it.idx) === parseInt(idx)
        );

      if(targetBlog){
        // 게시물이 존재할 때
        setData(targetBlog);
      } else {
        // 게시물이 없을 때
        alert("없는 게시물입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [idx, data]);
  
  console.log(data);
  /*
  if(data.date.indexOf(" ")==10){
    data.date.indexOf(" ","T");
  }

  */

  if(!data) {
    return <div className="BlogPage">로딩중입니다...</div>;
  } else {

    return (
      
      <div className="BlogPage">
        <MyHeader 
          headText={`${1} 게시물`} 
          leftChild = {
            <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightChild = {
            <MyButton 
              text={"수정하기"} 
              onClick={() => navigate(`/edit/${data.idx}`)} 
            />
          }
        />
        <article>
          <section>
            <div className="title"><h4>{data.title}</h4></div>
            <div className="blog_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};
  
export default Blog;