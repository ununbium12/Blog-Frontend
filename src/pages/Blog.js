import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BlogStateContext } from '../App';
import MyButton from '../components/MyButton';
import MyHeader from '../components/MyHeader';
import { getStringDate } from '../util/date.js';
import { emotionList } from '../util/emotion';

const Bolg = () => {

  Axios.defaults.withCredentials = true; //axios

  let userId = localStorage.getItem('userId');
  if(userId == ""){
    window.location.href ="/login";
  }
  console.log(userId)

  const { id } = useParams();
  const blogList = useContext(BlogStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    if(blogList.length >= 1) {
      const targetBlog = blogList.find(
        (it) => parseInt(it.id) === parseInt(id)
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
  }, [id, blogList]);
  

  if(!data) {
    return <div className="BlogPage">로딩중입니다...</div>;
  } else {

    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion))
    ;

    console.log(curEmotionData);

    return (
      <div className="BlogPage">
        <MyHeader 
          headText={`${getStringDate(new Date(data.date))} 게시물`} 
          leftChild = {
            <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightChild = {
            <MyButton 
              text={"수정하기"} 
              onClick={() => navigate(`/edit/${data.id}`)} 
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div 
              className={[
                "blog_img_wrapper",
                `blog_img_wrapper_${data.emotion}`,
              ].join(" ")}
            >
              <img src={curEmotionData.emotion_img} />
              <div className="emotion_descript">
                {curEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>게시물</h4>
            <div className="blog_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};
  
export default Bolg;