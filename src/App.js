import './App.css';
import React, { useReducer, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Axios from 'axios';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Blog from './pages/Blog';
import Login from './login_register/Login';
import Register from './login_register/Register';

import RouteTest from './components/RouteTest';

Axios.defaults.withCredentials = true; //axios

const reducer = (state, action) => {
  let newState = [];
  switch(action.type) {
    case 'INIT': {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter((it)=>it.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map((it)=>it.id === action.data.id ? { ...action.data } : it);
      break;
    }
    default:
      return state;
  }
  return newState;
};

// 삭제할 더미데이터
const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1번",
    date : 1677490795348,
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의 일기 2번",
    date : 1677490795349,
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의 일기 3번",
    date : 1677490795350,
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기 4번",
    date : 1677490795351,
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의 일기 5번",
    date : 1677490795352,
  },
];

export const BlogStateContext = React.createContext();
export const BlogDispatchContext = React.createContext();

function App() {

  const [data, dispatch] = useReducer(reducer, dummyData);

  const dataId = useRef(6);
  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };
  // REMOVE
  const onRemove = (targetId) => {
    dispatch({type:"REMOVE", targetId});
  };
  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type:"EDIT",
      data: {
        id : targetId,
        date : new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return ( 
    <BlogStateContext.Provider value={data}>
      <BlogDispatchContext.Provider value={{onCreate, onEdit, onRemove,}}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new' element={<New />} />
              <Route path='/edit/:id' element={<Edit />} />
              {/*<Route path='/blog' element={<Blog />} /> //예외처리 부분 */}
              <Route path='/blog/:id' element={<Blog />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Routes>
            <br/>
            <RouteTest/>
          </div>
        </BrowserRouter>
      </BlogDispatchContext.Provider>
    </BlogStateContext.Provider>
  );
}

export default App;
