const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TOP_ARTIST_ENDPOINT = `https://api.spotify.com/v1/me/top/artists`;
const LAST_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;
const ARTIST_ENDPOINT = "https://api.spotify.com/v1/artists/";
const ME = `https://api.spotify.com/v1/me`;
const TOP_TRACKS_DEFAULT_PARAMS = {
  time_range: "short_term",
  limit: "1",
  offset: "0",
};
const TOP_ARTIST_DEFAULT_PARAMS = {
  time_range: "short_term",
  limit: "1",
  offset: "0",
};
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export const getAccessToken = async () => {
  const config = useRuntimeConfig();
  const client_id = config.spotifyClientId as string;
  const client_secret = config.spotifyClientSecret as string;
  const refresh_token = config.spotifyRefreshToken as string;
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });
  return response.json();
};

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getTopTracks = async () => {
  const { access_token } = await getAccessToken();
  const queryParams = new URLSearchParams(TOP_TRACKS_DEFAULT_PARAMS).toString();
  return fetch(TOP_TRACKS_ENDPOINT + "?" + queryParams, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getTopArtists = async () => {
  const { access_token } = await getAccessToken();
  const queryParams = new URLSearchParams(TOP_ARTIST_DEFAULT_PARAMS).toString();
  return fetch(TOP_ARTIST_ENDPOINT + "?" + queryParams, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
export const getArtist = async (artistId: any) => {
  const { access_token } = await getAccessToken();
  return fetch(ARTIST_ENDPOINT + artistId, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getLastPlayed = async () => {
  const { access_token } = await getAccessToken();
  return fetch(LAST_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getMe = async () => {
  const { access_token } = await getAccessToken();
  return fetch(ME, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export default {
  getNowPlaying,
};
