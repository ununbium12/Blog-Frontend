import Axios from 'axios';

const BlogItem = ({author, content, created_date, emotion, id}) => {

  Axios.get('./api/users').then(data => console.log(data));

  return <div className="BlogItem">
    <div className='info'>
      <span>
        작성자 : {author} | 감정점수 : {emotion}
      </span>
      <br/>
      <span className="date">{new Date(created_date).toLocaleString()}</span>
    </div>
    <div className="content">{content}</div>
  </div>
};

export default BlogItem;
