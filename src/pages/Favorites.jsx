import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

import Header from '../components/Header';
import MusicCard from '../components/MusicCards';
import Loading from './Loading';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favSongState: [],
    };
  }

  componentDidMount() {
    this.getFavSongs();
  }

  getFavSongs = async () => {
    this.setState({ loading: true });
    const favSongs = await getFavoriteSongs();
    this.setState({ loading: false, favSongState: favSongs });
  }

  removeFavSongs = async () => {
    const SIX_TENTHS = 600;
    setTimeout(async () => {
      // this.setState({ loading: true });
      await this.getFavSongs();
    }, SIX_TENTHS);
  }

  render() {
    const { loading, favSongState } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-favorites">
        <Header />
        {favSongState.map((song) => (
          <MusicCard
            musicTemplate={ favSongState }
            key={ song.trackName }
            trackName={ song.trackName }
            removeSongs={ this.removeFavSongs }
          />))}
      </div>
    );
  }
}

export default Favorites;