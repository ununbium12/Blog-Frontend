import { Link } from "react-router-dom"
import Logout from "../login_register/Logout";

const Header = () => {
    return (
      <>
      <Link to={"/"} >
        <img 
          className="HeaderImg" 
          src={process.env.PUBLIC_URL + `assets/A_HeaderImg.png`} 
          alt="게시판 메인 이미지" 
        />
      </Link>
      <button className="LogoutButton" onClick={Logout}>로그아웃</button>
      <br/>
      </>
    );
  };
  
  export default Header;