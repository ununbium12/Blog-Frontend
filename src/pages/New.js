import Axios from 'axios';
import BlogEditor from '../components/BlogEditor';

const New = () => {

  Axios.defaults.withCredentials = true; //axios
  
  return (
    <div>
      <BlogEditor />
    </div>
  );
};
  
export default New;