import { getNowPlaying } from "../../lib/spotify";

export default eventHandler(async () => {
  const response = await getNowPlaying();
  if (response.status == 204 || response.status > 400) {
    return {
      isPlaying: false,
    };
  }
  const song = await response.json();
  const isPlaying = song.is_playing;

  const title = song.item.name;
  const artist = song.item.artists
    .map((_artist: any) => _artist.name)
    .join(", ");
  const album = song.item.album.name;
  const albumImageUrl = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;
  const duration = song.item.duration_ms;
  const progress = song.progress_ms;
  const url = song.item.external_urls.spotify;

  return {
    isPlaying,
    title,
    artist,
    album,
    albumImageUrl,
    songUrl,
    duration,
    progress,
    url,
  };
});
