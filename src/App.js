import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Axios from 'axios';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Blog from './pages/Blog';
import Login from './login_register/Login';
import Register from './login_register/Register';
import Header from './components/Header';
import RouteTest from './components/RouteTest';
import Logout from './login_register/Logout';

Axios.defaults.withCredentials = true; //axios

export const BlogStateContext = React.createContext();
export const BlogDispatchContext = React.createContext();
export const ListDataContext = React.createContext();

function App() {

  const userId = localStorage.getItem("userId");

  const [listData, setListData] = useState([]);
  
  useEffect(() => {
    const config = {
      headers:{
        "Content-Type": "application/json",
      },
    };
    Axios.get("./api/boards/list", config)
      .then(res => {
        setListData(res.data.content);
      })
      .catch(err => {
        console.log(err);
      });
  },[]);

  return ( 
    <BlogStateContext.Provider value={listData}>
      <BrowserRouter>
        <div className="App">
          <div>
            {
              userId !== null
              ? <Header />
              : null
            }
          </div>
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
    </BlogStateContext.Provider>
  );
}

export default App;
