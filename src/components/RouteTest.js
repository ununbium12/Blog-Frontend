import { Link } from "react-router-dom"

const RouteTest = () => {
  return (
    <>
    <Link to={"/"}>HOME</Link>
    <br/>
    <Link to={"/login"}>로그인</Link>
    <br/>
    <Link to={"/register"}>회원가입</Link>
    <br/>
    </>      
  );
};

export default RouteTest;