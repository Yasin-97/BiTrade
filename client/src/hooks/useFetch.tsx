import { useEffect, useState } from "react";
type useFetchType = { keyword: string };
const useFetch = ({ keyword }: useFetchType) => {
  const APIKEY = import.meta.env.VITE_GIPHY_API;
  const [gifUrl, setGifUrl] = useState("");

  const fetchGifs = async () => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${keyword
          .split(" ")
          .join("")}&limit=1`
      );
      const { data } = await response.json();

      setGifUrl(data[0]?.images?.downsized_medium.url);
    } catch (error) {
      setGifUrl(
        "https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284"
      );
    }
  };

  useEffect(() => {
    if (keyword) fetchGifs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  return gifUrl;
};

export default useFetch;
