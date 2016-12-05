/// <reference path="../../../typings/index.d.ts" />

import { AuthActionTypes } from './types';
import { AppEvent } from '../events/appEvent';
import AppDispatcher from '../dispatchers/appDispatcher';

export function authorize(payload?: { provider: string }) {
  AppDispatcher.dispatch(new AppEvent(AuthActionTypes.AUTH_INITIALIZE, payload));
}

export function updateProfileInfo(payload?: { provider: string }) {
  AppDispatcher.dispatch(new AppEvent(AuthActionTypes.AUTH_GET_PROFILE, payload));
}

export function getUserMedia(payload?: { provider: string }) {
  AppDispatcher.dispatch(new AppEvent(AuthActionTypes.GET_USER_DATA, payload));
}

export function search(payload?: { tab: string , key: string, code: string }) {
  console.log('inside the seach dispathcher');
  console.log(payload);
  AppDispatcher.dispatch(new AppEvent(AuthActionTypes.SEARCH_MEDIA, payload));
}