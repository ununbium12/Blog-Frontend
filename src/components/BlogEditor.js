import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';

import MyButton from './MyButton';
import MyHeader from './MyHeader';

import { getStringDate } from '../util/date.js';

const BlogEditor = ({ isEdit, originData }) => {
  let userId = localStorage.getItem('userId');
  
  Axios.defaults.withCredentials = true; //axios

  const idx = useParams().id;

  const contentRef = useRef();
  const titleRef = useRef();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(getStringDate(new Date()));
  
  const navigate = useNavigate();

  useEffect(() => {
    const config = {
      headers:{
        "Content-Type": "application/json",
      },
    };

    if(idx !== undefined) { 
    Axios.get(`http://localhost:8080/api/boards/${idx}`, config)
      .then(res => {
        setTitle(res.data.title, ...title);
        setContent(res.data.content, ...content);
      })
      .catch(err => {
        console.log(err);
      });
    }
  },[]);
 


  const handleSubmit = () => {
    if(content.length < 1 && title.length < 1) {
      titleRef.current.focus();
      contentRef.current.focus();
      return;
    }
    console.log(isEdit);
    if(window.confirm(isEdit? "게시글을 수정하시겠습니까?" : "새 게시물을 업로드 하시겠습니까?")) {
      if(!isEdit) {
        //새로운 게시물 만들기
        navigate('/', { replace: true });
        window.location.replace("/");
    
        const data = {
          'idx': null,
          'userId': userId,
          'title': title,
          'content': content,
          'writeDate': null,
          'imageLoc': null,
        }
        Axios.post("./api/boards/write",
        JSON.stringify(data),{
          headers:{
            "Content-Type": "application/json",
          },
        })
        .then((res) =>{
          alert("DB에 저장이 완료되었습니다");
        }).catch((err) =>{
          console.log(err.response.data.message);
        })

      } else {
        //게시물 수정하기

        navigate('/', { replace: true });
        window.location.replace("/");

        const data = {
          'idx': idx,
          'userId': userId,
          'title': title,
          'content': content,
          'writeDate': null,
          'imageLoc': null,
        }
        Axios.put(`http://localhost:8080/api/boards/update`,
        JSON.stringify(data),{
          headers:{
            "Content-Type": "application/json",
          },
        })
        .then((res) =>{
          alert("DB에 수정이 완료되었습니다");
        }).catch((err) =>{
          console.log(err.response.data.message);
        })
      }
    }
  };

  const handleRemove = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {

      navigate('/', { replace: true });
      window.location.replace("/");

        const data = {
          'idx': idx,
          'userId': userId,
        }
      Axios.post(`http://localhost:8080/api/boards/delete`,
        JSON.stringify(data),{
          headers:{
            "Content-Type": "application/json",
          },
        })
        .then((res) =>{
          alert("DB에서 삭제가 완료되었습니다");
        }).catch((err) =>{
          console.log(err.response.data.message);
        })
    }
  }

  return (
    <div className='BlogEditor'>
      <MyHeader 
        headText={isEdit ? "게시물 수정하기" : "새 게시물 쓰기"} 
        leftChild={
          <MyButton
            onClick={()=>{navigate(-1);}}
            text={"< 뒤로가기"}
          />
        }
        rightChild={
          <MyButton
            text={'삭제하기'}
            type={'negative'}
            onClick={handleRemove}
          />
        }
      />
      <div>
        <section>
          <h4>오늘은 날짜는?</h4>
          <div className='input_box'>
            <input
              className='input_date'
              value={date}
              onChange = {(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
        <section>
          <h4>게시글 쓰기</h4>
          <div className='input_box text_wrapper'>
            <input
              type="text"
              className='title_input' 
              placeholder="제목을 적어주세요"
              ref={titleRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <br/>
          <div className='input_box text_wrapper'>
            <textarea
              className='content_area'
              placeholder="사랑하긴 했었나요 스쳐가는 인연이었나요"
              ref={contentRef} 
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className='control_box'>
            <MyButton text={'취소하기'} onClick={() => navigate(-1)}/>
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogEditor;