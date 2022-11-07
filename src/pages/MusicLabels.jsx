import { arrayOf, number, shape, string } from 'prop-types';
import React, { Component } from 'react';
import { addSong } from '../services/favoriteSongsAPI';

import '../CSS/MusicLabels.css';
import Loading from './Loading';

class MusicLabels extends Component {
  constructor() {
    super();
    this.state = {
      checkedValidation: false,
      loadingDisplay: false,
    };
  }

  componentDidMount() {
    const { favorites, trackId } = this.props;
    if (favorites.some((favorite) => favorite.trackId === trackId)) {
      this.setState({
        checkedValidation: true,
      });
    }
  }

  favoriteChangeHandler = async () => {
    this.setState({
      loadingDisplay: true,
    });
    const { music } = this.props;
    console.log(music);
    await addSong(music);
    this.setState({
      checkedValidation: true,
      loadingDisplay: false,
    });
  }

  render() {
    const { name, audio, trackId } = this.props;
    const { loadingDisplay, checkedValidation } = this.state;
    return (
      <div className="musics">
        <h3>{ name }</h3>
        <audio data-testid="audio-component" src={ audio } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.favoriteChangeHandler }
            checked={ checkedValidation }
          />
        </label>
        { loadingDisplay ? <Loading /> : ''}
      </div>
    );
  }
}

MusicLabels.propTypes = {
  name: string.isRequired,
  audio: string.isRequired,
  trackId: number.isRequired,
  music: shape({}).isRequired,
  favorites: arrayOf(shape({})).isRequired,
};

export default MusicLabels;
