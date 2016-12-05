/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

export class Header extends React.Component<{}, {}> {

  constructor(props) {
    super();
  }

  handleClick (param){
    browserHistory.push(param);
  }

  render() {
   return <div className="row">  
            <nav>
              <div className="nav-wrapper">
                <ul className="header-tabs">
                  <li onClick={() => this.handleClick('/dashboard')}>Dashboard</li>
                  <li onClick={() => this.handleClick('/media')}>Media</li>
                  <li onClick={() => this.handleClick('/tags')}>Tags</li>
                  <li onClick={() => this.handleClick('/locations')}>Locations</li>
                </ul> 
              </div> 
            </nav>
          </div>
  }
}
