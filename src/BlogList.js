import Axios from 'axios';
import { useContext } from 'react';
import { BlogStateContext } from './App';
import BlogItem from './BlogItem';

const BlogList = () => {

  const blogList = useContext(BlogStateContext);

  Axios.get('./api/boards').then(data => console.log(data));

  return (
    <div className="BlogList">
      <h2>개시물 리스트</h2>    
      <h4>{blogList.length}개의 개시물이 있습니다.</h4>
      <div>
        {blogList.map((it) => (
          <BlogItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};

BlogList.defaultProps = { // undefined으로 값을 받았을때 오류를 안나게 해주는 코드
  blogList: [],
};

export default BlogList;
