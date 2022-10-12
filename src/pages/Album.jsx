import { shape } from "prop-types";
import React, { Component } from "react";
import { getFavoriteSongs } from "../services/favoriteSongsAPI";
import getMusics from "../services/musicsAPI";

import Header from "../components/Header";
import MusicLabels from "./MusicLabels";
import Loading from "./Loading";

class Album extends Component {
  constructor() {
    super();
    this.state = {
      tracksList: [],
      albumName: "",
      artistName: "",
      loadingDisplay: true,
      favoriteSongs: [],
    };
  }

  async componentDidMount() {
    await this.getTracks();
    const favorites = await getFavoriteSongs();
    console.log(favorites);
    this.setState({
      favoriteSongs: favorites,
      loadingDisplay: false,
    });
  }

  getTracks = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const tracks = await getMusics(id);
    this.setState({
      tracksList: tracks.slice(1),
      albumName: tracks[0].collectionName,
      artistName: tracks[0].artistName,
    });
  };

  render() {
    const { tracksList, albumName, artistName, loadingDisplay, favoriteSongs } =
      this.state;

    return (
      <div>
        <Header />
        {loadingDisplay ? (
          <Loading />
        ) : (
          <div data-testid="page-album" className="album-container">
            <p data-testid="artist-name" className="artist-name-container">{artistName}</p>
            <h2 data-testid="album-name" album-name-container>{albumName}</h2>
            {tracksList.map((song) => (
              <MusicLabels
                key={song.trackId}
                name={song.trackName}
                audio={song.previewUrl}
                trackId={song.trackId}
                music={song}
                favorites={favoriteSongs}
                className="music-labels"
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: shape({}).isRequired,
};

export default Album;
