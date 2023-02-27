import React, {useContext, useRef, useState} from "react";
import Axios from 'axios';
import { BlogDispatchContext } from "./App";

const BlogEditor = () => {

  const {onCreate} = useContext(BlogDispatchContext);
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
      // focus
      authorInput.current.focus();
      return;
    }

    if(state.content.length < 5) {
      // focus
      contentInput.current.focus();
      return;
    }

    onCreate(state.author, state.content, state.emotion);
    alert("저장 성공");
    setState({
      author: "",
      content: "",
      emotion: 1,
    });
  };

  Axios.get('./api/boards').then(data => console.log(data));

  return(
    <div className="BlogEditor">
      <h2>오늘의 블로그</h2>
      <div>
        <input
          ref={authorInput}
          name="author"
          value={state.author}
          onChange={handleChangState}
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={handleChangState}
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
        <button onClick={handleSubmit}>개시글 저장하기</button>
      </div>
    </div>
  );
};

export default React.memo(BlogEditor);
