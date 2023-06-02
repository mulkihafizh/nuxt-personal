import { getLastPlayed } from "../../lib/spotify";

export default eventHandler(async () => {
  const response = await getLastPlayed();

  const lastPlayed = await response.json();
  const track = lastPlayed.items[0].track;
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
