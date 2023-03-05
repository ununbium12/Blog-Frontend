import { Link } from "react-router-dom"
import Logout from "../login_register/Logout";

const RouteTest = () => {
  return (
    
    <>
    <Link to={"/"}>HOME</Link>
    <br/>
    <Link to={"/login"}>로그인</Link>
    <br/>
    <Link to={"/register"}>회원가입</Link>
    <br/>
    <button onClick={Logout}>로그아웃</button>
    </>      
  );
};

export default RouteTest;