import React, { Component } from "react";
import { Link } from "react-router-dom";
import searchAlbumsAPI from "../services/searchAlbumsAPI";

import Header from "../components/Header";
import Loading from "./Loading";
import "../CSS/Search.css";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      submitButtonDisabled: true,
      inputName: "",
      searchName: "",
      searchList: [],
      loadingDisplay: false,
      resultDisplay: false,
    };
  }

  componentDidMount() {
    console.log(this.state);
  }

  inputOnChangeHandler = ({ target }) => {
    this.submitValidation(target);
    this.setState({
      inputName: target.value,
    });
  };

  submitValidation = ({ value }) => {
    const minimumNameLength = 2;
    if (value.length >= minimumNameLength) {
      this.setState({
        submitButtonDisabled: false,
      });
    } else {
      this.setState({
        submitButtonDisabled: true,
      });
    }
  };

  searchButtonHandler = async () => {
    const { inputName } = this.state;
    this.setState({
      loadingDisplay: true,
      searchName: inputName,
      inputName: "",
    });
    const albumList = await searchAlbumsAPI(inputName);
    this.setState({
      searchList: albumList,
      loadingDisplay: false,
      resultDisplay: true,
    });
    console.log(inputName);
  };

  render() {
    const {
      submitButtonDisabled,
      inputName,
      loadingDisplay,
      resultDisplay,
      searchName,
      searchList,
    } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-search">
          {loadingDisplay ? (
            <Loading />
          ) : (
            <form className="inpt-search">
              <input
                type="text"
                data-testid="search-artist-input"
                onChange={this.inputOnChangeHandler}
                className="input-form-search"
                value={inputName}
                placeholder="Nome do Artista"
              />
              <button
                type="button"
                className="btn-search"
                data-testid="search-artist-button"
                disabled={submitButtonDisabled}
                onClick={this.searchButtonHandler}
              >
                Pesquisar
              </button>
            </form>
          )}
          {resultDisplay && (
            <p id="found-text">Resultado de álbuns de: {searchName}</p>
          )}
          {searchList.length === 0 ? (
            <p id="not-found-text">Nenhum álbum foi encontrado</p>
          ) : (
            searchList.map((item) => (
              <div className="container-cards">
                <Link
                  to={`/album/${item.collectionId}`}
                  key={item.collectionId}
                  data-testid={`link-to-album-${item.collectionId}`}
                  className="cards"
                >
                  <img src={item.artworkUrl100} alt={item.collectionName} />
                  <h3 className="music-name">{item.collectionName}</h3>
                  <p className="artist">{item.artistName}</p>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default Search;
