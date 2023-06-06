import { getArtist } from "../../../lib/spotify";

export default eventHandler(async (event) => {
  const artistId = event.context.params!.id;
  const response = await getArtist(artistId);
  const artist = await response.json();
  const name = artist.name;
  const url = artist.external_urls.spotify;

  return {
    name,
    url,
  };
});
