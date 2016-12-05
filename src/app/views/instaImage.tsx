/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Config } from '../config/config';
import InstagramThemeStoreInstance from '../stores/instagramThemeStore';
import { Utils } from '../utils/helpers';
import { AuthActionTypes } from '../actions/types';

interface ImageProps{
  data ;
}

export class InstaImage extends React.Component<ImageProps, {}> {
  _data;
  constructor(props) {
    super();
    this._data = props.data;
  }

  componentWillMount() {
    
  }
  componentWillUnmount() {

  }

  _setStateFromStores() {
    this.setState(InstagramThemeStoreInstance.getState());
  }

  handleDoubleClick(id){
      console.log(id);
      //InstagramThemeStoreInstance._postLike(id)
      //InstagramThemeStoreInstance.addChangeListener(AuthActionTypes.POST_USER_MEDIA_LIKE, this._setStateFromStores.bind(this));
      InstagramThemeStoreInstance._postUserMedia(Event,'',id).end(function(err,res){
          console.log(res.body.data);
      });
  }


  render() {
    let posts = this.props.data;
    return (
            <article className="user-media" onDoubleClick={() => this.handleDoubleClick(posts.id)} key={posts.id}>
                <header>
                    <a className="image-anchor" href={'/'+posts.user.username} >
                        <img className="user-header-image" src={posts.user.profile_picture} />
                    </a>
                    <div className="username-wrapper">
                        <a href={'/'+posts.user.username} title="{posts.user.full_name}">{posts.user.username}</a>
                    </div>
                </header>
                <img className="user-media-image" src={posts.images.standard_resolution.url} />
                <footer className="user-media-info-wrapper">
                    <span className="user-likes"> 
                        <i className="memocon-heart"></i> Likes: {posts.likes.count}
                    </span>
                    <span className="user-comments"> 
                        <i className="memocon-bubble2"></i> Comments: {posts.comments.count}
                    </span>
                </footer>
            </article>
          );
    }
}
