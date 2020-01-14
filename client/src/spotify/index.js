import axios from 'axios';
import { getHashParams } from '../utils/index';

// TOKENS
const EXPIRATION_TIME = 3600 * 1000; // 1 hr in milliseconds

const setTokenTimestamp = () =>
  window.localStorage.setItem('spotify_token_timestamp', Date.now());
const setLocalAccessToken = token => {
  setTokenTimestamp();
  window.localStorage.setItem('spotify_access_token', token);
};
const setLocalRefreshToken = token =>
  window.localStorage.setItem('spotify_refresh_token', token);
const getTokenTimestamp = () =>
  window.localStorage.getItem('spotify_token_timestamp');
const getLocalAccessToken = () =>
  window.localStorage.getItem('spotify_access_token');
const getLocalRefreshToken = () =>
  window.localStorage.getItem('spotify_refresh_token');

// Refresh the token
const refreshAccessToken = async () => {
  try {
    const { data } = await axios.get(
      `/refresh_token?refresh_token=${getLocalRefreshToken()}`
    );
    const { access_token } = data;
    setLocalAccessToken(access_token);
    window.location.reload();
    return;
  } catch (error) {
    console.log(error);
  }
};

// Gets access token off of query params (called on application init)
export const getAccessToken = () => {
  const { error, access_token, refresh_token } = getHashParams();
  if (error) {
    console.log(error);
    refreshAccessToken();
  }

  // If token is expired
  if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
    console.warn('Access token has expired, refreshing..');
    refreshAccessToken();
  }

  const localAccessToken = getLocalAccessToken();
  const localRefreshToken = getLocalRefreshToken();

  // If there's no access token in local storage, set it and return `access_token from the params
  if (!localAccessToken || localAccessToken === 'undefined') {
    setLocalAccessToken(access_token);
    return access_token;
  }
  return localAccessToken;
};

export const token = getAccessToken();

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application.json'
};

export const getUser = () =>
  axios.get('https://api.spotify.com/v1/me', { headers });

export const getFollowing = () =>
  axios.get('https://api.spotify.com/v1/me/following?type=artist', { headers });

export const getRecentlyPlayed = () =>
  axios.get('https://api.spotify.com/v1/me/player/recently-played', {
    headers
  });

export const getPlaylists = () =>
  axios.get('https://api.spotify.com/v1/me/playlists', { headers });

export const getTopArtists = () =>
  axios.get(
    'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term',
    { headers }
  );
export const getTopTracks = () =>
  axios.get(
    'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term',
    { headers }
  );

export const getUserInfo = () => {
  return axios
    .all([
      getUser(),
      getFollowing(),
      getPlaylists(),
      getTopArtists(),
      getTopTracks(),
      getRecentlyPlayed()
    ])
    .then(
      axios.spread(
        (
          user,
          followedArtists,
          playlists,
          topArtists,
          topTracks,
          recentlyPlayed
        ) => {
          return {
            user: user.data,
            followedArtists: followedArtists.data,
            playlists: playlists.data,
            topArtists: topArtists.data,
            topTracks: topTracks.data,
            recentlyPlayed: recentlyPlayed.data
          };
        }
      )
    );
};
