/// <reference path="../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import { Home } from './views/home';
import { InstagramThemefyApp } from './components/instagram-themefy';
import { Dashboard } from './views/dashboard';
import { Media } from './views/media';
import { Locations } from './views/locations';
import { Tags } from './views/tags';
import { Landing } from './views/landing'
import InstagramThemeStoreInstance from './stores/instagramThemeStore';
ReactDOM.render(
  ( 
    <Router history={browserHistory}>
      <Route path="/" component={InstagramThemefyApp}>
        <IndexRoute component={Landing} />
        <Route onEnter={InstagramThemeStoreInstance.getAuthResult} path="home" component={Home}>
          <Route path="dashboard" component={Dashboard}/>
          <Route path="media" component={Media} />
          <Route path="tags" component={Tags} />
          <Route path="locations" component={Locations} />
        </Route>
      </Route>
    </Router>
  ),
  document.getElementById('instagram-themefy')
);
