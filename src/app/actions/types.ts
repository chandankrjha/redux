export const LoadingActionTypes = {
  SHOW_LOADER: 'loader.show',
  HIDE_LOADER: 'loader.hide'
};

export const LoadEntriesActionTypes = {
  GET_ENTRIES: 'entries.get'
}

export const AuthActionTypes = {
  AUTH_INITIALIZE: 'auth.initialize',
  AUTH_GET_PROFILE: 'auth.getProfile',
  GET_USER_RECENT_LIKED_MEDIA: 'user.getRecentLikedMedia',
  GET_USER_DATA: 'user.getUserData',
  GET_TAGS_DATA: 'user.getTagsData',
  GET_USER_MEDIA: 'user.getUserMedia',
  POST_USER_MEDIA_LIKE : 'user.postUserMediaLike',
  SEARCH_MEDIA : 'search.media'
}

export const ProviderTypes = {
  GOOGLE: 'google',
  ONEDRIVE: 'onedrive',
  DROPBOX: 'dropbox',
  LOCALDRIVE: 'localdrive'
}