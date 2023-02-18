import './App.css';
import BlogEditor from './BlogEditor';
import BlogList from './BlogList';
import React, {useRef, useState} from 'react';

// const dummyList = [
//   {
//     id: 1,
//     author: "정다훈",
//     content: "안뇽하십니꽈 1",
//     emotion: 5,
//     created_date: new Date().getTime()
//   },
//   {
//     id: 2,
//     author: "정우성",
//     content: "안뇽하십니꽈 2",
//     emotion: 4,
//     created_date: new Date().getTime()
//   },
//   {
//     id: 3,
//     author: "정찬희",
//     content: "안뇽하십니꽈 3",
//     emotion: 2,
//     created_date: new Date().getTime()
//   },
//   {
//     id: 4,
//     author: "정신",
//     content: "안뇽하십니꽈 4",
//     emotion: 1,
//     created_date: new Date().getTime()
//   },
// ];

function App() {

  const [data, setData] = useState([]);

  const dataId = useRef(0)

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id : dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  return (
    <div className="App">
      <BlogEditor onCreate={onCreate}/>
      <BlogList blogList={data}/>
    </div>
  );
}

export default App;
