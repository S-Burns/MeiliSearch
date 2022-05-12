import "instantsearch.css/themes/algolia-min.css";
import React from "react";
import {
  InstantSearch,
  Hits,
  SortBy,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
  Snippet
} from "react-instantsearch-dom";
import "./App.css";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const searchClient = instantMeiliSearch(
  "https://integration-demos.meilisearch.com",
  "q7QHwGiX841a509c8b05ef29e55f2d94c02c00635f729ccf097a734cbdf7961530f47c47"
);

const App = () => (
  <div className="ais-InstantSearch">
    <h1>MeiliSearch + React InstantSearch</h1>
    <h2>
      Search in Steam video games{" "}
      <span role="img" aria-label="emoji">
        🎮
      </span>
    </h2>
    <p>
      This is not the official Steam dataset but only for demo purpose. Enjoy
      searching with MeiliSearch!
    </p>
    <InstantSearch indexName="steam-video-games" searchClient={searchClient}>
      <div className="left-panel">
        <ClearRefinements />
        <SortBy
          defaultRefinement="steam-video-games"
          items={[
            { value: "steam-video-games", label: "Relevant" },
            {
              value: "steam-video-games:recommendationCount:desc",
              label: "Most Recommended"
            },
            {
              value: "steam-video-games:recommendationCount:asc",
              label: "Least Recommended"
            }
          ]}
        />
        <h2>Genres</h2>
        <RefinementList attribute="genres" />
        <h2>Players</h2>
        <RefinementList attribute="players" />
        <h2>Platforms</h2>
        <RefinementList attribute="platforms" />
        <h2>Misc</h2>
        <RefinementList attribute="misc" />
        <Configure
          hitsPerPage={6}
          attributesToSnippet={["description:50"]}
          snippetEllipsisText={"..."}
        />
      </div>
      <div className="right-panel">
        <SearchBox />
        <Hits hitComponent={Hit} />
        <Pagination showLast={true} />
      </div>
    </InstantSearch>
  </div>
);

const Hit = ({ hit }) => (
  <div key={hit.id}>
    <div className="hit-name">
      <Highlight attribute="name" hit={hit} />
    </div>
    <img src={hit.image} align="left" alt={hit.name} />
    <div className="hit-description">
      <Snippet attribute="description" hit={hit} />
    </div>
    <div className="hit-info">price: {hit.price}</div>
    <div className="hit-info">release date: {hit.releaseDate}</div>
  </div>
);

export default App;
