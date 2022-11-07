import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      check: false,
    };
  }

  componentDidMount() {
    this.getFavSongs();
  }

  getFavSongs = async () => {
    const { trackName } = this.props;
    this.setState({ loading: true });
    const favSongsReturn = await getFavoriteSongs();
    const favSong = favSongsReturn.find((song) => song.trackName === trackName);
    if (favSong) this.setState({ check: true });
    this.setState({ loading: false });
  }

  handleChange = async ({ target }) => {
    const { check } = this.state;
    this.setState({ loading: true, check: !check });
    const { trackName, musicTemplate } = this.props;
    if (target.parentNode.parentNode.textContent.includes(trackName)
      && musicTemplate !== undefined) {
      const fetchSong = musicTemplate.find((track) => track.trackName === trackName);
      await addSong(fetchSong);
      if (target.checked === true) await removeSong(fetchSong);
    }
    this.setState({ loading: false });
  }

  render() {
    const { trackName, previewUrl, trackId, musicTemplate, removeSongs } = this.props;
    const { loading, check } = this.state;
    if (loading) return <Loading />;
    return (
      <div className="musics">
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          <code>audio</code>
        </audio>
        <label htmlFor="checkbox">
          Favorita
          <input
            type="checkbox"
            name="checkbox"
            id="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.handleChange }
            checked={ check }
            onClick={ removeSongs }
          />
        </label>
        <ul>{ !musicTemplate }</ul>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;