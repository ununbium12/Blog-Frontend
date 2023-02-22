import Axios from 'axios';
import { useContext } from 'react';
import { BlogStateContext } from './App';
import BlogItem from './BlogItem';

const BlogList = (/*{ onEdit, onRemove/*, blogList }*/) => {

  const blogList = useContext(BlogStateContext);

 // console.log(blogList); // App.js에게 값을 잘 받았는지 확인용

  Axios.get('./api/boards').then(data => console.log(data));

  return (
    <div className="BlogList">
      <h2>일기 리스트</h2>    
      <h4>{blogList.length}개의 일기가 있습니다.</h4>
      <div>
        {blogList.map((it) => (
          <BlogItem key={it.id} {...it} /*onRemove={onRemove} onEdit={onEdit}*/ /> // BlogItem이 아래의 작성을 처리해준다.
        // 고유한 아이디를 가지고 있지 않을 경우 => key={idx}
        //  <div key={it.id}>
        //    <div>작성자 : {it.author}</div>
        //    <div>일기 : {it.content}</div>
        //    <div>감정 : {it.emotion}</div>
        //    <div>작성 시간(ms) : {it.created_date}</div>
        //  </div>
        ))}
      </div>
    </div>
  );
};

BlogList.defaultProps = { // undefined으로 값을 받았을때 오류를 안나게 해주는 코드
  blogList: [],
};

export default BlogList;
