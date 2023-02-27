import './App.css';
import BlogEditor from './BlogEditor';
import BlogList from './BlogList';
import LoginPage from './LoginPage';
import React, {useCallback, useEffect, useMemo, useReducer, useRef} from 'react';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./App";
import RegisterPage from "./RegisterPage";

const reducer = (state, action) => {
  switch(action.type){
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date
      }
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    case "EDIT": {
      return state.map((it) => 
      it.id === action.targetId? 
      { ...it, content:action.newContent } : it
      );
    }
    default :
    return state;
  }
};

export const BlogStateContext = React.createContext();

export const BlogDispatchContext = React.createContext();

function App() {

  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments' // 외부 사이트에서 일기 형식을 따오는 링크
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author : it.email,
        content : it.body,
        emotion : Math.floor(Math.random() * 5) + 1,
        created_date : new Date().getTime(),
        id : dataId.current++,
      };
    });

    dispatch({type:"INIT", data:initData});
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback(
    (author, content, emotion) => {
      dispatch({
        type: "CREATE",
        data:{author, content, emotion, id:dataId.current},
      });
      dataId.current += 1;
    },
    []
  );

  const onRemove = useCallback((targetId) => {
    dispatch({
      type: "REMOVE", 
      targetId
    });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({
      type: "EDIT",
      targetId,
      newContent
    });
  }, []);

  const memoizedDispatches = useMemo(() => {
    return {onCreate, onRemove, onEdit}
  }, []);

  return ( 
    <BlogStateContext.Provider value={data}>
      <BlogDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <RegisterPage />
          <LoginPage />
          <BlogEditor />
          <BlogList />
        </div>
      </BlogDispatchContext.Provider>
    </BlogStateContext.Provider>
  );
}

export default App;
