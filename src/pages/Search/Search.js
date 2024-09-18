import React from "react";

// hooks
import { useFetchDocments } from "../../hooks/useFetchDocments";
import { useQuery } from "../../hooks/useQuery";

const Search = () => {
  const query = useQuery();

  const search = query.get("q");

  return (
    <div>
      Search
      <p>{search}</p>
    </div>
  );
};

export default Search;
