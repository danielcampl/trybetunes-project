import React from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

import "../CSS/Header.css";

class Header extends React.Component {
  constructor() {
    super();
    this.connectedPerson = this.connectedPerson.bind(this);
    this.state = {
      name: '',
    };
  }

  connectedPerson() {
    const { name } = this.state;
    if (!name) {
      getUser().then((user) => {
        this.setState({ name: user });
      });
    }
    return <p>{ name.name }</p>;
  }

  render() {
    return (
      <header data-testid="header-component">
        <div className="header-container">
          <div className="header-title-container">
            <h1>
              Trybefy
              <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--Eg8INSNe--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/5302/26258239-4ac6-4d28-b94c-ba6d3f9eabc2.png" alt="trybe-logo" id="trybe-logo" />
            </h1>
          </div>
          <div data-testid="header-user-name">
            <Link to="/profile" data-testid="link-to-profile" className="profile-container" >
              <BsPersonCircle id="person-icon" />
              {this.connectedPerson()}
            </Link>
          </div>
        </div>
        <section className="links-container">
          <div>
            <Link to="/search" data-testid="link-to-search" className="all-links"><h2>Pesquisar</h2></Link>
          </div>
          <div>
            <Link to="/favorites" data-testid="link-to-favorites" className="all-links">
              <h2>Favoritas</h2>
            </Link>
          </div>
        </section>
      </header>
    );
  }
}

export default Header;
