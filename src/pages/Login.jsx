import React from "react";
import { Redirect } from "react-router-dom";
import { createUser } from "../services/userAPI";

import Animation from "../images/music-animate.svg";
import Loading from "./Loading";
import "../CSS/Login.css";
import "../CSS/input.css";
import "../CSS/button.css";

class Login extends React.Component {
  constructor() {
    super();
    this.inputChange = this.inputChange.bind(this);
    this.login = this.login.bind(this);
    this.createInputUser = this.createInputUser.bind(this);
    this.state = {
      name: "",
      email: '',
      password: '',
      disabled: true,
      carregando: false,
      createdUser: false,
    };
  }

  async createInputUser() {
    this.setState({ carregando: true });
    const { name } = this.state;
    await createUser({ name });
    this.setState({ createdUser: true, carregando: false });
  }

  inputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.login());
  }

  login() {
    const { name } = this.state;
    const magicNumber = 3;
    this.setState({ disabled: name.length < magicNumber });
  }

  render() {
    const { name, disabled, createdUser, carregando, email, password } = this.state;
    return (
      <div>
        {carregando && <Loading />}
        {createdUser && <Redirect to="/search" />}
        {!carregando && (
          <div data-testid="page-login" className="form-container">
            <div className="login-left-container">
              <h1>TRYBEFY</h1>
              <img src={Animation} alt="music" id="music-animation" />
            </div>
            <div className="login-form-container">
              <form className="login-right-container">
                <p>Login</p>
                <div>
                  <div className="input-form">
                    <label htmlFor="name" />
                    <span>Nome:</span>
                    <input
                      type="text"
                      name="name"
                      placeholder="Insira seu nome"
                      value={name}
                      onChange={this.inputChange}
                      data-testid="login-name-input"
                    />
                  </div>

                  {/* Criação de EMAIL E SENHA */}

                  <div className="input-form">
                    <label htmlFor="email" />
                    <span>Email:</span>
                    <input
                      type="email"
                      name="email"
                      value={ email }
                      placeholder="Insira seu email"
                      />
                  </div>
                  <div className="input-form">
                    <label htmlFor="password" />
                    <span>Senha:</span>
                    <input
                      type="text"
                      name="password"
                      value={ password }
                      placeholder="Insira sua senha"
                    />
                  </div>
                  <div className="btn-container">
                    <button
                      type="submit"
                      data-testid="login-submit-button"
                      className="button"
                      name="entrar"
                      disabled={disabled}
                      onClick={this.createInputUser}
                      >
                      Entrar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
