import { getTopTracks } from "../../lib/spotify";

export default eventHandler(async () => {
  const response = await getTopTracks();

  const tracks = await response.json();
  const items = tracks.items;
  const track = items[0];
  const name = track.name;
  const image = track.album.images[0].url;
  const url = track.external_urls.spotify;
  const artist = track.artists[0].name;
  const duration = track.duration_ms;

  return {
    name,
    image,
    url,
    artist,
    duration,
  };
});
