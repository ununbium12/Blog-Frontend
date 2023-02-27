import "./App.css";
import Axios from 'axios';
import React, { useState } from 'react'  

export default function App() {
  let userId = document.querySelector('#userId');
	let password = document.querySelector('#password'); //아이디 중복 확인 버튼

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
          console.log(response);
          if(response.data=="0"||response.data=="1"){
            alert("로그인 실패했습니다.");
          }else{
            alert("로그인 성공했다 머머리야");
            // window.localStorage.setItem("");
          }
      }).catch((err) =>{
        console.log(err.response.data.message);
      })
		}
	};

  function letRegister() {
    window.location.href ="./RegisterPage.js"
  };

  return (
    <div className="userLoginBox" >
      <div className="form-box login-register-form-element" id="userLoginBox_in">	
        <h2 className="form-box-title">계정 로그인</h2>	
        <form className="form" id="loginFrm" >
          <div className="form-row">
            <div className="form-item">
              <div className="form-input">
                <input type="text" id="userId" name="userId" placeholder="아이디" onChange={onChange}/>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-item">
              <div className="form-input">
                <input type="password" id="password" name="password" placeholder="비밀번호" onChange={onChange}/>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-item">
              <input type="button" className="button medium secondary" onClick={letsLogin} id="loginBtn"  value="로그인"/>
              <input type="button" className="button register" onClick={letRegister} id="registerBtn"  value="회원가입"/>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}