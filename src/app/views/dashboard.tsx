/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Config } from '../config/config';
import InstagramThemeStoreInstance from '../stores/instagramThemeStore';
import { Utils } from '../utils/helpers';
import { InstaImage } from './instaImage'
import { Header } from '../components/header'; 

export class Dashboard extends React.Component<{}, {}> {
  _listenerToken: FBEmitter.EventSubscription;
  _authenticated;
  _userMedia;
  constructor() {
    super();
  }

  componentDidMount() {
    this._authenticated = InstagramThemeStoreInstance._check_Authorization();
    this.getMedia();
  }
  getMedia(){
    var that = this;
    InstagramThemeStoreInstance._getUserMedia(Event, Utils.get('instagramtoken')).end(function(err,res){
      if(!err){
        that._userMedia = res.body.data;
        that.setState({name:'update'});
      }
    });
  }
  componentWillUnmount() {

  }


  render() {
    return (
      
      <div className="row">
        <Header></Header>
          <h2 className="media-header">You have liked the following posts recently</h2>
              <div className="row-wrapper">
                {
                  this._userMedia ? this._userMedia.map(function(posts){
                    return <InstaImage key={posts.id} data={posts}></InstaImage>
                  }) :
                  <div className="loader">Loading...</div>
                }
              </div>
      </div>
    );
  }
}
