import React, {useRef, useState} from "react";
import Axios from 'axios';

const BlogEditor =({onCreate}) => {

  const authorInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  const handleChangState = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);

    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    if(state.author.length < 1) {
      // alert("작성자는 최소 1글자 이상 입력해주십시오."); // 최근 트렌드는 alert을 안쓰는 추세
      // focus
      authorInput.current.focus();
      return;
    }

    if(state.content.length < 5) {
      // alert("일기 본문은 최소 5글자 이상 입력해주십시오.");
      // focus
      contentInput.current.focus();
      return;
    }

    onCreate(state.author, state.content, state.emotion);
    //console.log(state);
    alert("저장 성공");
    setState({
      author: "",
      content: "",
      emotion: 1,
    });
  };

  //const [author, setAuthor] = useState("");
  //const [content, setContent] = useState("");
  // author: input에 들어가는 내용관리, setAuthor: Author의 상태변화

  Axios.get('./api/users').then(data => console.log(data));

  return(
    <div className="BlogEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorInput}
          name="author"
          value={state.author}
          onChange={handleChangState}
          // onChange={(e) => {
          //   setState({
          //     ...state, // 아래의 state 대신 활용해준다. 또한 아래쪽에 들어가면 원래 값이 들어가서 업데이트가 안된다.
          //     author: e.target.value,
          //     //content: state.content,
          //   });
          // }}
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={handleChangState}
          // onChange={(e) => {
          //   setState({
          //     ...state,
          //     content: e.target.value,
          //     //author: state.author,
          //   });
          // }}
        />
      </div>
      <div>
        <select name="emotion" value={state.emotion} onChange={handleChangState}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};

export default BlogEditor;
