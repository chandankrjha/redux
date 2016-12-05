/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Config } from '../config/config';
import InstagramThemeStoreInstance from '../stores/instagramThemeStore';
import { Utils } from '../utils/helpers';
import { InstaImage } from './instaImage'

export class Locations extends React.Component<{}, {}> {
  _listenerToken: FBEmitter.EventSubscription;
  _authenticated;
  _userMedia;
  constructor() {
    super();
  }

  componentDidMount() {
    // this._authenticated = InstagramThemeStoreInstance._check_Authorization();
    // this.getMedia();
  }
  getMedia(){
    var that = this;
   InstagramThemeStoreInstance._getUserMedia(Event, Utils.get('instagramtoken')).end(function(err,res){
     if(!err){
       that._userMedia = res.body.data;
       console.log(res.body.data);
       that.setState({name:'update'});
     }
   });
  }
  componentWillUnmount() {

  }

  handleChange(val) {
      console.log(val.value);
  }

  render() {
    return (
      <div className="row">
        <input type="text" onChange={this.handleChange.bind(null,this)}    /> 
      </div>
    );
  }
}
