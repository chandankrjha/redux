type EndPoint = {
  method: string;
  url: string;
}

type EndPointMap = {
  [name: string]: EndPoint;
}

export const endPoints: EndPointMap = {

  'instagramRedeemToken': {
    method: 'POST',
    url: 'https://api.instagram.com/oauth/access_token'
  }

};
