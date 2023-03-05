import "../App.css";
import Axios from 'axios';
import React, { useState } from 'react'  

export default function App() {
	// let password = document.querySelector('#password'); //아이디 중복 확인 버튼
  let userId = localStorage.getItem('userId');
  if(userId !== ""){
    window.location.href ="/";
  }

	const [inputs, setInputs] = useState({  
    userId: '',
    password: '',
  });

	const onChange = (e) => {
	  const { name, value } = e.target
	  const nextInputs = { ...inputs,  [name]: value,}
	  setInputs(nextInputs);      
  }

	function letsLogin() {
		if(inputs.userId===""){
      alert("아이디를 입력해주세요.");
			return;
		}else if(inputs.password==="false"){
			alert("비밀번호를 입력해주세요");
			return;
		}else{
		  const data ={
        'userId': inputs.userId,
        'password': inputs.password,
      };
      Axios.post("./api/users/login",
        JSON.stringify(data),{
          headers:{
            "Content-Type": "application/json",
          },
        })
        .then((response)=> {
          if(response.data==="0"||response.data==="1"){
            alert("로그인 실패했습니다.");
          }else{
            alert("로그인 성공했다 머머리야");
            var userId = inputs.userId;
            localStorage.setItem("userId", userId);
            window.location.href ="/"
          }
      }).catch((err) =>{
        alert("에러가 발생했습니다.");
        console.log(err.response.data.message);
      })
		}
	};

  function letRegister() {
    window.location.href ="/register"
  };

  Axios.defaults.withCredentials = true; //axios

  return (
    <div className="Login-content" >
      <div className="form-box login-register-form-element" id="userLoginBox_in">	
        <h2 className="form-box-title">계정 로그인</h2>	
        <form className="form" id="loginFrm" >
          <div className="form-row">
            <div className="form-item">
              <div className="form-input">
                <input className="text_Id" type="text" id="userId" name="userId" placeholder="아이디" onChange={onChange}/>
              </div>
            </div>
          </div>
          <br/>
          <div className="form-row">
            <div className="form-item">
              <div className="form-input">
                <input className="text_Pw" type="password" id="password" name="password" placeholder="비밀번호" onChange={onChange}/>
              </div>
            </div>
          </div>
          <br />
          <div className="form-row">
            <input type="button" className="btn_Login" onClick={letsLogin} id="loginBtn"  value="로그인"/>
            <input type="button" className="btn_register" onClick={letRegister} id="registerBtn"  value="회원가입"/>
          </div>
        </form>
      </div>
    </div>
  );
}