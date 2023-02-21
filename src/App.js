import './App.css';
import BlogEditor from './BlogEditor';
import BlogList from './BlogList';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
// import Lifecycle from './Lifecycle';
// import OptimizeTest from './OptimizeTest';

// https://jsonplaceholder.typicode.com/comments

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

  const getData = async() => {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments' // 외부 사이트에서 일기 형식을 따오는 링크
    ).then((res) => res.json());
    // console.log(res);

    const initData = res.slice(0, 20).map((it) => {
      return {
        author : it.email,
        content : it.body,
        emotion : Math.floor(Math.random() * 5) + 1,
        created_date : new Date().getTime(),
        id : dataId.current++,
      };
    });

    setData(initData);
  };

  useEffect(() => {
    getData();
  },[])

  const onCreate = useCallback(
    (author, content, emotion) => {
      const created_date = new Date().getTime();
      const newItem = {
        author,
        content,
        emotion,
        created_date,
        id : dataId.current,
      };
      dataId.current += 1;
      setData((data)=>[newItem, ...data]);
    },
    
    []
  );

  const onRemove = useCallback((targetId) => {
    // console.log(`${targetId}가 삭제되었습니다.`); // 제대로 타켓이 잡혔는지에 대한 코드
    // const newBlogList = data.filter((it)=>it.id !== targetId);
    // console.log(newBlogList); // 타겟이 배열 아이디가 제대로 생성 됬는지에 대한 코드
    // setData(newBlogList);
    setData(data => data.filter((it) => it.id !== targetId)); // 최신 스테이트를 이용하기 위해서 변형함
  }, []);

  const onEidt = useCallback((targetId, newContent) => {
    setData((data) =>
      data.map((it) =>
        it.id === targetId ? {...it, content: newContent}: it
      ) 
    );
  }, []);

  // getBolgAnalysis에서 useMemo를 쓰면 함수가 아니라 값을 리턴 받아서 오류가 난다.
  const getBolgAnalysis = useMemo(() => {
    // console.log("일기 분석 시작");

    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return {goodCount, badCount, goodRatio};
  }, [data.length]);

  const {goodCount, badCount, goodRatio} = getBolgAnalysis; // useMemo()를 쓰지 않을경우는 getBolgAnalysis();

  return (
    <div className="App">
      {/*<Lifecycle />*/}
      {/*<OptimizeTest />*/}
      <BlogEditor onCreate={onCreate}/>
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <BlogList onEidt={onEidt} onRemove={onRemove} blogList={data}/>
    </div>
  );
}

export default App;
