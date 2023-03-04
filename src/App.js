import './App.css';
import React, { useReducer, useRef, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Axios from 'axios';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Blog from './pages/Blog';
import Login from './login_register/Login';
import Register from './login_register/Register';

import RouteTest from './components/RouteTest';
import Logout from './login_register/Logout';

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
  localStorage.setItem("blog", JSON.stringify(newState));
  return newState;
};

export const BlogStateContext = React.createContext();
export const BlogDispatchContext = React.createContext();
export const ListDataContext = React.createContext();

function App() {

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
        setListData(res.data.content);
      })
      .catch(err => {
        console.log(err);
      });
  },[]);

  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const localData = localStorage.getItem("blog");
    if (localData) {
      const blogList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );

      if (blogList.length >= 1) {
        dataId.current = parseInt(blogList[0].id) + 1;
        dispatch({ type: "INIT", data: blogList });
      }
    }
  }, []);

  const dataId = useRef(6);
  // CREATE
  const onCreate = (date, content, title) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        title,
      },
    });
    dataId.current += 1;
  };
  // REMOVE
  const onRemove = (targetId) => {
    dispatch({type:"REMOVE", targetId});
  };
  // EDIT
  const onEdit = (targetId, date, content, title) => {
    dispatch({
      type:"EDIT",
      data: {
        id : targetId,
        date : new Date(date).getTime(),
        content,
        title,
      },
    });
  };

  return ( 
    <BlogStateContext.Provider value={listData}>
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
              <Route path='/logout' element={<Logout />} />
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
