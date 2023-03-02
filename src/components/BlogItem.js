import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const BlogItem = ({id, content, date, title}) => {
  
  const navigate = useNavigate();

  const strDate = new Date(parseInt(date)).toLocaleDateString();

  const goDeatail = () => {
    navigate(`/blog/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

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
};

export default BlogItem;