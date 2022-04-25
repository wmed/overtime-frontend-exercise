import { useEffect, useState } from "react";

const Search = () => {
  const [search, setSearch] = useState(
    decodeURI(window.location.hash.slice(1))
  );

  const onHashChange = () => {
    setSearch(decodeURI(window.location.hash.slice(1)));
  };
  useEffect(() => {
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);
  return (
    <input
      type="search"
      value={search}
      onChange={(e) => (window.location.hash = e.target.value)}
      placeholder={"Search"}
    />
  );
};

export default Search;
