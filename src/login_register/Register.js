import "../App.css";
import React, { useState } from 'react'
import Axios from 'axios';

export default function App() {
  let userId = document.querySelector('#userId');
	let passwordForm = document.querySelector('#password');
	let re_passwordForm = document.querySelector('#re_password');
	

	const [inputs, setInputs] = useState({
    userId: '',
    userName : '',
		password: '',
		re_password: '',
    regDate : null
  });


  const onChange = (e) => {//input에 name을 가진 요소의 value에 이벤트를 걸었다
    const { name, value } = e.target   // 변수를 만들어 이벤트가 발생했을때의 value를 넣어줬다
    const nextInputs = { ...inputs,  [name]: value,}//스프레드 문법으로 기존의 객체를 복사한다.
    setInputs(nextInputs);       //만든 변수를 seInput으로 변경해준다.
  }


  function CheckPass(str){ //비밀번호 정규식
    let reg1 =  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;
    return(reg1.test(str));
  };

	function letsJoin() { //로그인 유효성 검사
    if(inputs.userId===""){
      alert("아이디를 입력해주세요!");
      userId.focus();
      return;
    }else if(inputs.password===""){
      alert("비밀번호를 입력해주세요!");
      passwordForm.focus();
      return;
    } else if(inputs.re_password===""){
      alert("비밀번호 중복 확인을 입력해주세요!");
      re_passwordForm.focus();
      return;
    } else if(CheckPass(inputs.password) === false){
      alert("비밀번호는 영문+숫자 6자를 조합하여 입력해주세요 !");
      passwordForm.focus();
      return;
    }else if(inputs.re_password !==inputs.password){
      alert("비밀번호가 동일하지 않습니다!");
      re_passwordForm.focus();
      return;
    }else{
      const userdata ={
        'userId': inputs.userId,
        'userName': inputs.userName,
        'password': inputs.password,
        'regDate': null
      };
      Axios.post("./api/users/signup",
      JSON.stringify(userdata),{
      headers:{
        "Content-Type": "application/json",
      },
      })
      .then(res =>{
        alert("성공했습니다");
        window.location.href ="/login"
      }).catch((err) =>{
        alert("에러가 발생했습니다.");
        console.log(err.response.data.message);
      })
    }
  };

  function loginpage () {
    window.location.href ="/"
  }

  Axios.defaults.withCredentials = true; //axios

  return (
    <div className="userJoinOuter">
      <div className="form-box login-register-form-element" id="userJoinInner">
        <h2 className="form-box-title">계정 만들기</h2>
        <form className="form" id="registerFrm" name="register-page" >
          <br/>
          <div className="form-row">
            <div className="form-item">
              <div className="form-input">
                <input className="text_Id" type="text" id="userId" name="userId" onChange={onChange}  placeholder="아이디" />
              </div>
            </div>
          </div>
          <br/>
          <div className="form-row">
            <div className="form-item">
              <div className="form-input">
                <input className="text_urName" type="text" id="userName" name="userName" onChange={onChange}  placeholder="유저이름" />
              </div>
            </div>
          </div>
          <br/>
           <div className="form-row">
            <div className="form-item">
              <div className="form-input">
                <input className="text_Pw" type="password" id="password" name="password" onChange={onChange} placeholder="비밀번호"/>
              </div>
            </div>
          </div>
          <br/>
          <div className="form-row">
            <div className="form-item">
              <div className="form-input">
                <input className="text_rePw" type="password" id="re_password" name="re_password" onChange={onChange} placeholder="비밀번호 확인"/>
              </div>
            </div>
          </div>
          <br/>
          <div className="form-row">
            <div className="form-item">
              <input type="button" className="btn_singup"  onClick={letsJoin} id="joinBtn" value="가입하기"/>
              <input type="button" className="btn_login"  onClick={loginpage} id="loginBtn" value="로그인하기"/>
            </div>
          </div>
        </form>
      </div>
    </div>
   );
};