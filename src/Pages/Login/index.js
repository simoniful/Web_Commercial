import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API, USER_API } from '../../config';
import { fetchPost } from '../../utils/fetches';
import { REGEXP, validate } from '../../utils/regex';
import Footer from './Footer';
import './index.scss';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { userId: '', userPw: '', loggedUser: {} };
  }

  // loginWithKakao = () => {
  //   window.Kakao.Auth.login({
  //     success: (auth) => {
  //       fetch(`${GET_SIGNIN_API}`, {
  //         method: 'post',
  //         headers: {
  //           Authorization: auth.access_token,
  //         },
  //       })
  //         .then((res) => res.json())
  //         .then((res) => {
  //           if (res.self_token) {
  //             localStorage.setItem('user-info', JSON.stringify(res));
  //             localStorage.setItem('access_token', res.self_token);
  //             setGetInfo(JSON.parse(localStorage.getItem('user-info')));
  //             setGetToken(localStorage.getItem('access_token'));
  //           } else {
  //             localStorage.setItem('user-info', JSON.stringify(res));
  //             history.push('/editusername');
  //           }
  //         });
  //     },
  //     fail: (err) => {
  //       console.error(err);
  //     },
  //   });
  // };

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

    fetchPost(`${USER_API}/users/login`, {
      email: userId,
      password: userPw,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.token) {
          localStorage.setItem('token', result.token);
          localStorage.setItem('user_name', result['user_name']);

          this.setState({
            loggedUser: result.userInfo,
          });

          this.props.history.push('/products/newList');
        }
      })
      .catch((error) => {
        console.log(`error ${error.message}`);
      });
  };

  render() {
    const { userId, userPw } = this.state;

    return (
      <div>
        <div className="loginPage">
          <div className="loginContainer">
            <div className="loginWrap">
              <div className="loginBanner">
                <div className="bannerWrap">
                  <div className="info">
                    <p className="strongTxt">Pet shop?????? ????????? ???????????????.</p>
                    <p className="description">
                      Pet shop??? ?????? ????????? ??? ????????? Pelon, Paum??? ?????? ?????????
                      ??????????????? <br />
                      ?????? ?????? ???????????? ????????? ?????????!
                    </p>
                  </div>
                  <img
                    alt="login banner"
                    src="https://jotasic.github.io/21-kaka0-pet-shop-images/images/banner_login.png"
                  />
                </div>
                <div className="formWrap">
                  <h1 className="logo">
                    <p>Pet Shop</p>
                  </h1>
                  <div className="formContainer">
                    <form onSubmit={this.handleSubmit}>
                      <input
                        type="text"
                        name="userId"
                        placeholder="?????? ?????????, ?????????, ????????????"
                        value={userId}
                        onChange={this.handleInput}
                      />
                      <input
                        type="password"
                        name="userPw"
                        placeholder="????????????"
                        value={userPw}
                        onChange={this.handleInput}
                      />

                      <div className="keepLogin">
                        <label>
                          <input type="checkbox" className="keepLoginInBox" />
                          ????????? ?????? ??????
                        </label>
                      </div>

                      <button
                        className="loginBtn"
                        disabled={!this.validateInputData(userId, userPw)}
                        onClick={this.handleSubmit}
                      >
                        ?????????
                      </button>
                    </form>
                  </div>
                  <div className="lineWrap">
                    <span className="line"></span>
                    <span className="lineWord">??????</span>
                    <span className="line"></span>
                  </div>

                  <button className="qrBtn" type="button">
                    QR?????? ?????????
                  </button>

                  <div className="infoUser">
                    <Link to="/signup">????????????</Link>
                    <div>
                      <Link to="/">???????????????</Link>
                      <Link to="/">???????????? ??????</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
