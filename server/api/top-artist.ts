import { getTopArtists } from "../../lib/spotify";

export default eventHandler(async () => {
  const response = await getTopArtists();
 
  const artists = await response.json();
  const items = artists.items;
  const artist = items[0];
  const name = artist.name;
  const image = artist.images[0].url;
  const url = artist.external_urls.spotify;
  const genre = artist.genres[0];

  return {
    name,
    image,
    url,
    genre,
  };
});
