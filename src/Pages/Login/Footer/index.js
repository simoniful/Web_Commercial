import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

class Footer extends Component {
  render() {
    return (
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
    );
  }
}

export default Footer;
