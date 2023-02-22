import Axios from 'axios';
import React, { useContext, /* useEffect, */ useRef, useState } from 'react';
import { BlogDispatchContext } from './App';

const BlogItem = ({
  // onEdit, 
  // onRemove, 
  author, 
  content, 
  created_date, 
  emotion, 
  id 
}) => {

  // useEffect(() => {
  //   console.log(`${id}번 째 아이템 렌더!`);
  // });

  const {onRemove, onEdit} = useContext(BlogDispatchContext);

  Axios.get('./api/boards').then(data => console.log(data));

  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  const [localContent, setLocalContent] = useState(content);

  const localContentinput = useRef();

  const handleRemove = () => {
    if(window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)){
      onRemove(id);
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentinput.current.focus();
      return;  
    }

    if(window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  return <div className="BlogItem">
    <div className='info'>
      <span>
        작성자 : {author} | 감정점수 : {emotion}
      </span>
      <br/>
      <span className="date">{new Date(created_date).toLocaleString()}</span>
    </div>
    <div className="content">
      {isEdit ? ( 
        <>
          <textarea 
            ref={localContentinput}
            value={localContent} 
            onChange={(e) => setLocalContent(e.target.value)}
          />
        </> 
      ) : ( 
        <>{content}</>
      )}
    </div>
    {isEdit ? (
      <>
        <button onClick={handleQuitEdit}>수정 취소</button>
        <button onClick={handleEdit}>수정 완료</button>
      </>
    ) : ( 
      <>
        <button onClick={handleRemove}>삭제하기</button>
        <button onClick={toggleIsEdit}>수정하기</button>
      </>
    )}
  </div>
};

export default React.memo(BlogItem);
