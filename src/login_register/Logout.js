import axios from 'axios';

const Logout = ()=>{

  axios.defaults.withCredentials = true; //axios

  axios.get("./api/users/logout")
  .then(res=> {
    alert("로그아웃했습니다.");
    var userId = "";
    localStorage.setItem("userId", userId);
    window.location.href ="/login"
  }).catch(function(err) {
    alert("에러가 발생했습니다.")
    console.log(err.response.data.message);
  });
}

export default Logout;