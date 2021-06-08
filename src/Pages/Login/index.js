import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const REGEXP = {
  emailRegExp:
    /[a-zA-Z0-9.-_+!]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,}(?:.[a-zA-Z0-9]{2,3})?/,
  passwordRegExp: /[a-zA-Z0-9]{5,100}/,
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { userId: '', userPw: '' };
  }

  validate = (value, regExp) => {
    const reg = new RegExp(regExp);
    return reg.test(value);
  };

  validateInputData = (id, pw) => {
    return (
      this.validate(id, REGEXP.emailRegExp) &&
      this.validate(pw, REGEXP.passwordRegExp)
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

    this.props.history.push('/main');
  };
  render() {
    const { userId, userPw } = this.state;

    return (
      <div className="login-page">
        <div className="login_container">
          <div className="login-wrap">
            <div className="login_banner">
              <div className="banner-wrap">
                <div className="info">
                  <strong>Pet shop계정 하나로 충분합니다.</strong>
                  <p className="description">
                    Pet shop의 모든 서비스 뿐 아니라 Melon, Daum등 다른 다양한
                    서비스까지 <br />
                    이제 펫샵 계정으로 이용해 보세요!
                  </p>
                </div>
                <img
                  alt="login banner"
                  src="https://www.w3schools.com/css/img_5terre_wide.jpg"
                />
              </div>
              <div className="form_wrap">
                <h1 id="logo">
                  <span>Pet Shop</span>
                </h1>
                <div className="login_email">
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

                    <div className="set-keep_login-btn">
                      <input type="checkbox" id="keepLoginInBox" />
                      <label htmlFor="keepLoginInBox">로그인 상태 유지</label>
                    </div>
                    <Link to="/">
                      <button
                        className="login-btn btn-block"
                        type="submit"
                        disabled={!this.validateInputData(userId, userPw)}
                        onClick={this.handleSubmit}
                      >
                        로그인
                      </button>
                    </Link>
                  </form>
                  <div className="line-wrap">
                    <span className="line"></span>
                    <span className="line-word">또는</span>
                    <span className="line"></span>
                  </div>
                  <Link to="/">
                    <button className="qr-btn" type="button">
                      QR코드 로그인
                    </button>
                  </Link>
                  <div className="info_user">
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
        <footer className="login_footer">
          <div className="service_info">
            <Link to="/" className="link_info">
              이용약관
            </Link>
            <Link to="/" className="link_info link_policy">
              개인정보 처리방침
            </Link>
            <Link to="/" className="link_info">
              운영정책
            </Link>
            <Link to="/" className="link_info">
              고객센터
            </Link>
            <Link to="" className="link_info">
              공지사항
            </Link>
          </div>
          <small className="txt_copyright">
            Copyright ©
            <Link to="" className="link_kakao">
              Pet Shop Corp.
            </Link>
            All rights reserved.
          </small>
        </footer>
      </div>
    );
  }
}

export default Login;
