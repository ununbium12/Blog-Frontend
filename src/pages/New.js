import Axios from 'axios';
import BlogEditor from '../components/BlogEditor';

const New = () => {

  Axios.defaults.withCredentials = true; //axios
  
  let userId = localStorage.getItem('userId');
  if(userId == ""){
    window.location.href ="/login";
  }
  console.log(userId)
  
  return (
    <div>
      <BlogEditor />
    </div>
  );
};
  
export default New;