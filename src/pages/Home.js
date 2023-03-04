import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { BlogStateContext, ListDataContext } from '../App';

import MyHeader from './../components/MyHeader';
import MyButton from './../components/MyButton';
import BlogList from '../components/BlogList';

const Home = () => {

  Axios.defaults.withCredentials = true; //axios

  let userId = localStorage.getItem('userId');
  let idx = localStorage.getItem('idx');

  if(userId == ""){
    window.location.href ="/login";
  }
  console.log(userId)

  const blogList = useContext(BlogStateContext);

  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  //app.js에 있는 리스트 데이터 불러오기
  const listData = useContext(ListDataContext);


  useEffect(()=>{
    if(blogList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59,
      ).getTime();
  
      setData(blogList.filter((it)=> firstDay <= it.date && it.date <= lastDay));
    } else {
      setData([]);
    }
  }, [curDate]);

  useEffect(() => {
    console.log(data);
  }, []);

  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()+1, curDate.getDate())
    );
  };

  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()-1, curDate.getDate())
    );
  };

  return (
    <div>
      <BlogList blogList={blogList} />
    </div>
  );
};

export default Home;