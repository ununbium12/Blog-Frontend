import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { BlogStateContext } from '../App';

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
  const [listData, setListData] = useState([]);
  
  useEffect(() => {
    const config = {
      headers:{
        "Content-Type": "application/json",
      },
    };
    Axios.get("./api/boards/list", config)
      .then(res => {
        console.log(res.data);
        setListData(res.data.content.map((it) => {
          return {
            idx : it.idx,
            userId : it.userId,
            title : it.title,
            content : it.content,
            writeDate : it.writeDate,
          };
        }).slice(0, 20));
      })
      .catch(err => {
        console.log(err);
      });
  },[]);

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
      <MyHeader
        headText={headText} 
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <BlogList blogList={listData} />
    </div>
  );
};

export default Home;