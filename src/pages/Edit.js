import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BlogStateContext } from '../App';
import BlogEditor from '../components/BlogEditor';

const Edit = () => {

  Axios.defaults.withCredentials = true; //axios

  let userId = localStorage.getItem('userId');
  if(userId == ""){
    window.location.href ="/login";
  }
  console.log(userId)

  const [originData, setOriginData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const blogList = useContext(BlogStateContext);
  
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