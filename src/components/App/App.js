import React, { Component } from 'react';
import SearchContainer from '../../containers/SearchContainer';
import IssuesContainer from '../../containers/IssuesContainer';

class App extends Component {
  render() {
    return (
      <div className="app">
        <SearchContainer />
        <IssuesContainer />
      </div>
    )
  }
}

export default App;
