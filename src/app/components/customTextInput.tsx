/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import InstagramThemeStoreInstance from '../stores/instagramThemeStore';

interface TextProps{
  resource ;
}

export class CustomTextInput extends React.Component<TextProps, {}> {
  textInput;
  resource;
  constructor(props) {
    super();
    // this.focus = this.focus.bind(this);
    console.log(props);
    this.resource = props.resource;

    console.log("resource is "+this.resource);
  }

//   focus() {
//     // Explicitly focus the text input using the raw DOM API
//     this.textInput.focus();
//   }

  handleChange(val) {
    //   let resource = this.resource;
      InstagramThemeStoreInstance.addChangeListener('search.media', this._setStateFromStores.bind(this));
  }


  _setStateFromStores() {
    this.setState(InstagramThemeStoreInstance.getState());
  }

  render() {
    // Use the `ref` callback to store a reference to the text input DOM
    // element in this.textInput
    return (
      <div>
        <input type="text" onChange={this.handleChange.bind(null,this)} ref={(input) => this.textInput = input} />
      </div>
    );
  }
}