import Axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogEditor from '../components/BlogEditor';

const Edit = () => {

  Axios.defaults.withCredentials = true; //axios

  const idx = useParams().id;
  const [data, setData] = useState([]);

  let userId = localStorage.getItem('userId');
  if(userId === ""){
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

  return (
    <div>
      {data && <BlogEditor isEdit={true} originData={data} />}
    </div>
  );
};
  
export default Edit;