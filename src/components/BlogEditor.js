import Axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { BlogDispatchContext } from './../App.js';

import MyButton from './MyButton';
import MyHeader from './MyHeader';
import EmotionItem from './EmotionItem';

import { getStringDate } from '../util/date.js';
import { emotionList } from '../util/emotion'

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const BlogEditor = ({ isEdit, originData }) => {
  
  Axios.defaults.withCredentials = true; //axios

  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  const { onCreate, onEdit } = useContext(BlogDispatchContext);
  const handleCilckEmote = (emotion) => {
    setEmotion(emotion);
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    if(content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if(window.confirm(isEdit? "게시글을 수정하시겠습니까?" : "새 게시물을 업로드 하시겠습니까?")) {
      if(!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }

    navigate('/', { replace: true });
  };

  useEffect(()=>{
    if(isEdit){
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  },[isEdit, originData])

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
          <h4>오늘의 감정</h4>
          <div className='input_box emotion_list_wrapper'>
            {emotionList.map((it) => (
              <EmotionItem 
                key={it.emotion_id} 
                {...it} 
                onClick={handleCilckEmote}
                isSelected = {it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>게시글 쓰기</h4>
          <div className='input_box text_wrapper'>
            <textarea
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