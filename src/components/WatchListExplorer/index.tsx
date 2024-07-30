"use client";

import { OmdbSearchMovieResult } from "@/lib/omdb";
import { FunctionComponent, useState } from "react";
import AddMovieForm from "./AddMovieForm";

interface WatchListExplorerProps {}

const WatchListExplorer: FunctionComponent<WatchListExplorerProps> = ({}) => {
  const [movies, setMovies] = useState<OmdbSearchMovieResult[]>([]);

  function addWatchedMovie(item: { id: string; label: string }): void {
    throw new Error("Function not implemented.");
  }

  function addUnwatchedMovie(item: { id: string; label: string }): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="p-3 rounded-3xl border border-[#e6e6e6] w-full">
      <AddMovieForm
        className="mb-3"
        onAddWatchedMovie={addWatchedMovie}
        onAddUnwatchedMovie={addUnwatchedMovie}
      />
    </div>
  );
};

export default WatchListExplorer;
