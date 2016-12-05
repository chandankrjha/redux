/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { browserHistory } from 'react-router';
import { Config } from '../config/config';
import InstagramThemeStoreInstance from '../stores/instagramThemeStore';
import {Utils} from '../utils/helpers';

export interface HomeProps{

}

export interface HomeStates{
  name:string
}
export class Landing extends React.Component<HomeProps, HomeStates> {

  _authenticated;
  _listenerToken: FBEmitter.EventSubscription;
  _auth_code: string;
  _userMedia;
   constructor(props) {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (){
    browserHistory.push('/home/dashboard');
  }
  componentWillMount() {
    this._authenticated = InstagramThemeStoreInstance._check_Authorization();

    Utils.add('instagramtoken',this._authenticated.key);
  }

  componentDidMount() {
    this._listenerToken = InstagramThemeStoreInstance.addChangeListener('auth.initialize', () => {
      browserHistory.push('/home/dashboard');
    });
  }

  componentWillUnmount() {
    InstagramThemeStoreInstance.removeChangeListener(this._listenerToken);
  }

  render() {
    let url = 'https://api.instagram.com/oauth/authorize/?client_id='+Config.instagram.client_id+'&redirect_uri='+Config.instagram.redirect_uri+'&response_type=token&scope='+Config.instagram.scope;

    if(!this._authenticated || this._authenticated && this._authenticated.authenticated === false){
      return <div className="row">
        <div className="backdrop">
          <div className="auth-modal">
            <a href= {url}>Instagram</a>
          </div>
        </div>
      </div>
    }
    else if(this._authenticated && this._authenticated.authenticated ){
       return <div className="row">
            <div className="pointer" onClick={this.handleClick}>Login Successful, Click to continue</div>
          </div>
    }
    else{
      return <div></div>
    }
  }
}
