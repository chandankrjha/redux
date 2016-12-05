/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Config } from '../config/config';
import InstagramThemeStoreInstance from '../stores/instagramThemeStore';
import { Utils } from '../utils/helpers';
import { InstaImage } from './instaImage'
import * as AuthAction from '../actions/authActions'; 

export class Media extends React.Component<{}, {}> {
  _listenerToken: FBEmitter.EventSubscription;
  _authenticated;
  _userMedia;
  resource;
  textInput;
  _position;
  
  constructor() {
    super();
    this.resource = 'tags';
  }

  componentDidMount() {
    this._authenticated = InstagramThemeStoreInstance._check_Authorization();
  }
  componentWillUnmount() {

  }

  componentWillMount() {
    InstagramThemeStoreInstance.addChangeListener('search.media', this._setStateFromStores.bind(this));

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position) {
    this._position = position;
  }


  handleChange(val) {
      AuthAction.search({
        tab : 'media',
        key: val.textInput.value,
        code: window.localStorage.getItem('instagramtoken')
      });
  }


  _setStateFromStores() {
    this.setState(InstagramThemeStoreInstance.getState());
  }

  render() {
    return (
      <div className="row">
        <input type="text" onChange={() => this.handleChange(this)} ref={(input) => this.textInput = input} />
      </div>
    );
  }
}
