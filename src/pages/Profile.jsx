import React from "react";
import { Link } from "react-router-dom";
import { getUser } from "../services/userAPI";

import Header from "../components/Header";
import Loading from "./Loading";
import "../CSS/Profile.css";
import '../CSS/button.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      description: "",
      email: "",
      name: "",
    };
  }

  componentDidMount() {
    this.getUserAPI();
  }

  getUserAPI = async () => {
    const objUser = await getUser();
    if (objUser.name) {
      this.setState({
        description: objUser.description,
        email: objUser.email,
        name: objUser.name,
      });
    }
  };

  render() {
    const { loading, description, email, name } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-profile">
        <Header />
        <div className="profile">
          <div className="content">
            <span>{`Nome: ${name}`}</span>
            <span>{`Email: ${email}`}</span>
            <span>{`Descrição: ${description}`}</span>
          </div>
          <Link to="/profile/edit">
            <button type="button" className="edit-profile button">
              Editar perfil
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Profile;
