import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { fetchPost } from '../../utils/fetches';
import { REGEXP, validate } from '../../utils/regex';
import './index.scss';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { userId: '', userPw: '', loggedUser: {} };
  }

  validateInputData = (id, pw) => {
    return (
      validate(id, REGEXP.emailRegExp) && validate(pw, REGEXP.passwordRegExp)
    );
  };

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { userId, userPw } = this.state;

    if (!this.validateInputData(userId, userPw)) return;

    fetchPost('http://10.58.6.148:8000/users/login', {
      email: userId,
      password: userPw,
    })
      .then((response) => response.json())
      .then((res) => {
        console.log('res', res);
        if (res.token) {
          localStorage.setItem('token', res.token);
          console.log(res['user_name']);
          this.setState({
            loggedUser: res['user_name'],
          });

          console.log(res.message);
          alert(`Login Success ${res.message}`);
          this.props.history.push('/hotproducs');
        }
      })
      .catch((error) => {
        console.log(`error ${error.message}`);
        alert(`error ${error.message}`);
      });
  };

  render() {
    const { userId, userPw } = this.state;

    return (
      <>
        <div>
          <div className="loginPage">
            <div className="loginContainer">
              <div className="loginWrap">
                <div className="loginBanner">
                  <div className="bannerWrap">
                    <div className="info">
                      <p className="strongTxt">
                        Pet shop계정 하나로 충분합니다.
                      </p>
                      <p className="description">
                        Pet shop의 모든 서비스 뿐 아니라 Pelon, Paum등 다른
                        다양한 서비스까지 <br />
                        이제 펫샵 계정으로 이용해 보세요!
                      </p>
                    </div>
                    <img
                      alt="login banner"
                      src="http://localhost:3000/images/banner_login.png"
                    />
                  </div>
                  <div className="formWrap">
                    <h1 className="logo">
                      <p>Pet Shop</p>
                    </h1>
                    <div className="formContainer">
                      <form onSubmit={this.handleSubmit}>
                        <input
                          id="id_email"
                          type="text"
                          name="userId"
                          placeholder="메일 아이디, 이메일, 전화번호"
                          value={userId}
                          onChange={this.handleInput}
                        />
                        <input
                          id="pw_email"
                          type="password"
                          name="userPw"
                          placeholder="비밀번호"
                          value={userPw}
                          onChange={this.handleInput}
                        />

                        <div className="keepLogin">
                          <label>
                            <input type="checkbox" className="keepLoginInBox" />
                            로그인 상태 유지
                          </label>
                        </div>
                        <Link to="/" className="loginLink">
                          <button
                            className="loginBtn"
                            disabled={!this.validateInputData(userId, userPw)}
                            onClick={this.handleSubmit}
                          >
                            로그인
                          </button>
                        </Link>
                      </form>
                    </div>
                    <div className="lineWrap">
                      <span className="line"></span>
                      <span className="lineWord">또는</span>
                      <span className="line"></span>
                    </div>
                    <Link to="/">
                      <button className="qrBtn" type="button">
                        QR코드 로그인
                      </button>
                    </Link>
                    <div className="infoUser">
                      <Link to="/">회원가입</Link>
                      <div>
                        <Link to="/">카카오계정</Link>
                        <Link to="/">비밀번호 찾기</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="loginFooter">
            <div className="serviceInfo">
              <Link to="/" className="linkInfo">
                이용약관
              </Link>
              <Link to="/" className="linkInfo linkPolicy">
                개인정보 처리방침
              </Link>
              <Link to="/" className="linkInfo">
                운영정책
              </Link>
              <Link to="/" className="linkInfo">
                고객센터
              </Link>
              <Link to="" className="linkInfo">
                공지사항
              </Link>
            </div>
            <small className="txtCopyright">
              Copyright ©
              <Link to="" className="linkPet">
                Pet Shop Corp.
              </Link>
              All rights reserved.
            </small>
          </footer>
        </div>
      </>
    );
  }
}

export default withRouter(Login);
