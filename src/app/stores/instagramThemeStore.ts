/// <reference path="../../../typings/index.d.ts" />
import { Server } from '../api/baseDAO';
import AppDispatcher from '../dispatchers/appDispatcher';
import { AppEvent } from '../events/appEvent';
import { Utils } from '../utils/helpers';
import { Config } from '../config/config';
import {BaseStore} from './baseStore';
import { IAuth } from '../interfaces/auth';
import { AuthActionTypes } from '../actions/types';
import * as Request from 'superagent';

class InstagramThemeStore extends BaseStore<IAuth>{
  _clientId =  Config.instagram.client_id;
  _client_secret = Config.instagram.client_secret;
  _redirect_uri = Config.instagram.redirect_uri;
  _grant_type = Config.instagram.grant_type;
  _access_token;
  _response_type = 'code';

  _check_Authorization(){
  	let instagramcode = location.hash.split('=')[1];
    if(location.hash.indexOf('access_token') !== -1 || (location.search.indexOf('access_token') !== -1 && Utils.get('instagramtoken') && Utils.get('instagramtoken') !== instagramcode)){
        this._changeToken ='auth.initialize';
        Utils.add('instagramtoken',instagramcode);
        this.emitChange();
        this._access_token = instagramcode;
       return {
          authenticated:true,
          key:instagramcode
        };
      }
      else if(Utils.get('instagramtoken') == instagramcode){
        Utils.add('instagramtoken',instagramcode);
      	this._changeToken ='auth.initialize';
        this.emitChange();
        this._access_token = instagramcode;
        return {
          authenticated:true,
          key:instagramcode
        };
      }
      else{
       return {
          authenticated:false,
          key:''
        };
      }
  }

  getAuthResult(){
    return this._check_Authorization().authenticated;
  }

  _search(options){
    Request.get('/api/instagram/v1/'+options.payLoad.tab+'/search?q='+options.payLoad.key+'&access_token='+options.payLoad.code)
                  .end(function(err, res){
                    if(!err){
                      console.log(res.body.data);
                        this._changeToken ='search.'+options.tab;
                        this.emitChange();
                        this._state = {
                          'message': 'search results found successfully'
                        };
                        console.log(this._state.message);
                    }
                  }.bind(this));
  }

  _authorize(immediate: boolean, event) {
  	let url = 'https://api.instagram.com/oauth/authorize/?client_id='+Config.instagram.client_id+'&redirect_uri='+Config.instagram.redirect_uri+'&response_type=code';
  	window.location.href = url;
  }

  _getProfileInfo(event:AppEvent,code) {
    return Request.get('/api/instagram/v1/tags/nofilter/media/recent?access_token='+code);
  }

  _getTagsData(event, key, code){
    return Request.get('/api/instagram/v1/tags/nofilter/media/recent?access_token='+code);
  }

  _getUserMedia(event,code){
    return Request.get('/api/instagram/v1/users/self/media/recent?access_token='+code);
  }

  _getUserRecentLikedMedia(event,code){
    return Request.get('/api/instagram/v1/users/self/media/liked?access_token='+code);
  }

  _postUserMedia(event,code,id){
    if(!code){
      code = Utils.get('instagramtoken');
    }
    return Request.post('/api/instagram/v1/media/'+id+'/likes?access_token='+code);
  }

  constructor(dispatcher: Flux.Dispatcher<AppEvent>) {
    super(dispatcher, (event: AppEvent) => {
      console.log(event.type);
      switch (event.type) {

        case AuthActionTypes.AUTH_INITIALIZE:
          this._authorize.bind(this, true, event)();
          break;
        case AuthActionTypes.AUTH_GET_PROFILE:
          this._getProfileInfo.bind(this, event)();
          break;
        case AuthActionTypes.GET_USER_RECENT_LIKED_MEDIA:
          this._getUserRecentLikedMedia.bind(this, event)();
          break;
        case AuthActionTypes.GET_TAGS_DATA:
          this._getTagsData.bind(this, event)();
          break;
        case AuthActionTypes.GET_USER_MEDIA:
          this._getUserMedia.bind(this, event)();
          break;
        case AuthActionTypes.POST_USER_MEDIA_LIKE:
          this._postUserMedia.bind(this, event)();
        case AuthActionTypes.SEARCH_MEDIA:
          this._search.bind(this, event)();
        default:
          break;
      }

    }, () => {
      return {
        displayName: ''
      };
    });
  }
}

const InstagramThemeStoreInstance = new InstagramThemeStore(AppDispatcher);

export default InstagramThemeStoreInstance;
