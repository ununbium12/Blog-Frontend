import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const BlogItem = ({id, emotion, content, date}) => {
  
  const navigate = useNavigate();

  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  const strDate = new Date(parseInt(date)).toLocaleDateString();

  const goDeatail = () => {
    navigate(`/blog/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="BlogItem">
      <div
        onClick={goDeatail} 
        className={[
          "emotion_img_wrapper", 
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </div>
      <div onClick={goDeatail} className="info_wrapper">
        <div className="blog_date">{strDate}</div>
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