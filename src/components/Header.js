import { Link } from "react-router-dom";
import Logout from "../login_register/Logout";

const Header = () => {
  const userId = localStorage.getItem("userId");
  return (
    <>
      <div className="header-container">
        <Link to={"/"}>
          <img
            className="HeaderImg"
            src={process.env.PUBLIC_URL + `assets/A_HeaderImg.png`}
            alt="게시판 메인 이미지"
          />
        </Link>
        <div className="imgup">
          <h1 className="textup">{`${userId}`}님 안녕하세요</h1>
          <button className="LogoutButton" onClick={Logout}>
          로그아웃
          </button>
        </div>
      </div>
      <br />
    </>
  );
};

export default Header;