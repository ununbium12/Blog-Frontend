import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BlogStateContext } from '../App';
import BlogEditor from '../components/BlogEditor';

const Edit = () => {

  Axios.defaults.withCredentials = true; //axios

  const idx = useParams().id;
  const [data, setData] = useState([]);
  const [originData, setOriginData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();


  const blogList = useContext(BlogStateContext);
  

  let userId = localStorage.getItem('userId');
  if(userId == ""){
    window.location.href ="/login";
  }
  console.log(userId)

/////
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
  
  useEffect(() => {
    if(blogList.length >= 1) {
      const targetBlog = blogList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if(targetBlog) {
        setOriginData(targetBlog);
      } else {
        alert("없는 게시물입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, blogList]);

  return (
    <div>
      {originData && <BlogEditor isEdit={true} originData={originData} />}
    </div>
  );
};
  
export default Edit;