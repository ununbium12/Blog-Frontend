import React, { useState, useEffect } from "react";

// const TextView = React.memo(({ text }) => {
//   useEffect(() => {
//     console.log(`Update :: Text : ${text}`);
//   });
//   return <div>{text}</div>;
// });

// const CountView = React.memo(({ count }) => {
//   useEffect(() => {
//     console.log(`Update :: Count : ${count}`);
//   });
//   return <div>{count}</div>;
// });

const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`CounterA Update - count: ${count}`)
  });

  return <div>{count}</div>;
});

const CounterB = /*React.memo(*/({ obj }) => { // obj가 객체이기 때문에 원래는 업데이트가 없어야 하지만 업데이트 되고만다.
  useEffect(() => {
    console.log(`CounterB Update - count: ${obj.count}`)
  });

  return <div>{obj.count}</div>;
}/*)*/;

const areEqual = (prevProps, nextProps) => {
  return prevProps.obj.count === nextProps.obj.count;
  // if (prevProps.obj.count === nextProps.obj.count){
  //   return true; // 이전 프롭스 현재 프롭스가 같다. -> 리렌더링을 일으키지 않게 된다.
  // }
  // return false; // 이전과 현재가 다르다 -> 리렌더링을 일으킴
};

const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {

  // const [count, setCount] = useState(1);
  // const [text, setText] = useState("");

  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });

  return <div style={{padding:50}}>
    {/* <div>
      <h2>count</h2>
      <CountView count={count} />
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
    <div>
      <h2>text</h2>
      <TextView text={text} />
      <input value={text} onChange={(e) => setText(e.target.value)} />
    </div> */}
    <div>
      <h2>Counter A</h2>
      <CounterA count={count} />
      <button onClick={() => setCount(count)}>A button</button>
    </div>
    <div>
      <h2>Count B</h2>
      { /* <CounterB obj={obj} /> */}
      <MemoizedCounterB obj={obj} />
      <button 
        onClick={() => 
          setObj({
            count: obj.count,
          })
        }
      >
        B button
      </button>
    </div>
  </div>;
};

export default OptimizeTest;
