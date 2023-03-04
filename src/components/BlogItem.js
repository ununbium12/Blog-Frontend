import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const BlogItem = ({idx, content, date, title, userId}) => {
  
  let urId = localStorage.getItem('userId');

  const navigate = useNavigate();

  const strDate = new Date(parseInt(date)).toLocaleDateString();

  const goDeatail = () => {
    navigate(`/blog/${idx}`);
  };

  const goEdit = () => {
    navigate(`/edit/${idx}`);
  };

  if (urId === userId) {
    return (
      <div className="BlogItem">
        <div onClick={goDeatail} className="info_wrapper">
          <div className="blog_date">{strDate}</div>
          <div className="blog_title">{title}</div>
          <div className="blog_content_preview">{content.slice(0, 25)}</div>
        </div>
        <div className="btn_wrapper">
          <MyButton
            onClick={goEdit} 
            text={"수정하기"}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="BlogItem">
        <div onClick={goDeatail} className="info_wrapper">
          <div className="blog_date">{strDate}</div>
          <div className="blog_title">{title}</div>
          <div className="blog_content_preview">{content.slice(0, 25)}</div>
        </div>
      </div>
    );
  }
};

export default BlogItem;