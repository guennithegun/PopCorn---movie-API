////////////
// IMPORT ALL NECESSARY MODULES AND FILES
////////////
import React from 'react';
import ReactDOM from 'react-dom';

import { MainView } from './components/main-view/main-view';

import './index.scss';

////////////
// MAIN COMPONENET
////////////
class PopcornApplication extends React.Component {
  render() {
    return <MainView/>;
  }
}

////////////
// ROOT OF APP
////////////
const container = document.getElementsByClassName('app-container')[0];

////////////
// RENDER APP
////////////
ReactDOM.render(React.createElement(PopcornApplication), container);
