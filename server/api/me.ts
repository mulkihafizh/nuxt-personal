import { getMe } from "../../lib/spotify";

export default eventHandler(async () => {
  const response = await getMe();
  const me = await response.json();
  const name = me.display_name;
  const image = me.images[0].url;
  const url = me.external_urls.spotify;

  return {
    name,
    image,
    url,
  };
});
