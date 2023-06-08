import { getNowPlaying, getLastPlayed } from "../../lib/spotify";

export default eventHandler(async () => {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    const lastPlayedResponse = await getLastPlayed();
    const lastPlayed = await lastPlayedResponse.json();
    const track = lastPlayed.items[0].track;
    const title = track.name;
    const image = track.album.images[0].url;
    const url = track.external_urls.spotify;
    const artist = track.artists.map((_artist: any) => _artist.name).join(", ");
    const duration = track.duration_ms;
    const isPlaying = false;

    return {
      isPlaying,
      title,
      image,
      url,
      artist,
      duration,
    };
  }
  const song = await response.json();
  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists
    .map((_artist: any) => _artist.name)
    .join(", ");
  const album = song.item.album.name;
  const image = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;
  const duration = song.item.duration_ms;
  const progress = song.progress_ms;
  const url = song.item.external_urls.spotify;

  return {
    isPlaying,
    title,
    artist,
    album,
    image,
    songUrl,
    duration,
    progress,
    url,
  };
});
