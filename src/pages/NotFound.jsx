import React from 'react';

import Header from '../components/Header';

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found">
        <Header />
        <span id="notfound">Page not found</span>
      </div>
    );
  }
}

export default NotFound;
