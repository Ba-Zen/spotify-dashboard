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

  // If there's no refresh token in local storage, set it as `refresh_token` from params
  if (!localRefreshToken || localRefreshToken === 'undefined') {
    setLocalRefreshToken(refresh_token);
  }

  // If there's no access token in local storage, set it and return `access_token` from the params
  if (!localAccessToken || localAccessToken === 'undefined') {
    setLocalAccessToken(access_token);
    return access_token;
  }
  return localAccessToken;
};

export const token = getAccessToken();

export const logout = () => {
  window.localStorage.removeItem('spotify_token_timestamp');
  window.localStorage.removeItem('spotify_access_token');
  window.localStorage.removeItem('spotify_refresh_token');
  window.history.pushState(null, null, '/');
  window.location.reload();
};

// API CALLS

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

// const getTrackIds = tracks => tracks.map(({ track }) => track.id).join(',');

// export const getRecommendedTracks = tracks => {
//   const shuffledTracks = tracks.sort(() => 0.5 - Math.random());
//   const seed_tracks = getTrackIds(shuffledTracks.slice(0, 5));
//   const seed_artists = '';
//   const seed_genres = '';
//   return axios.get(
//     `https://api.spotify.com/v1/recommendations?seed_tracks=${seed_tracks}&seed_artists=${seed_artists}&seed_genres=${seed_genres}`,
//     {
//       headers
//     }
//   );
// };

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
