import Axios from 'axios';

import BlogList from '../components/BlogList';

const Home = () => {

  Axios.defaults.withCredentials = true; //axios

  const userId = localStorage.getItem("userId");

  if(userId === ""){
    window.location.href ="/login";
  }

  return (
    <div>
      <BlogList />
    </div>
  );
};

export default Home;