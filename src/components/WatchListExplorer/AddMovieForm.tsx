"use client";

import OMDB, { OmdbSearchMovieResult } from "@/lib/omdb";
import React, { FunctionComponent, useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import EyeCheck from "../ui/icons/EyeCheck";
import EyeRemove from "../ui/icons/EyeRemove";
import { useToast } from "../ui/use-toast";
import { Movie } from "@/lib/types/movie";

interface AddMovieFormProps {
  onAddWatchedMovie(movie: Movie): void;
  onAddUnwatchedMovie(movie: Movie): void;
  className?: string;
}

const AddMovieForm: FunctionComponent<AddMovieFormProps> = ({
  onAddWatchedMovie: addWatchedMovie,
  onAddUnwatchedMovie: addUnwatchedMovie,
  ...props
}) => {
  const { toast } = useToast();

  const [movieQuery, setMovieQuery] = useState("");
  const [suggestions, setSuggestions] = useState<OmdbSearchMovieResult[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const isEmptySuggestions =
    !loadingSuggestions && movieQuery != "" && !suggestions.length;

  useEffect(() => {
    setSuggestions([]);

    if (!movieQuery) return;

    setLoadingSuggestions(true);

    OMDB.searchMovies(movieQuery, {
      type: "movie",
    })
      .then(({ movies }) => setSuggestions(movies))
      .catch(() =>
        toast({
          title: "Oops! Something went wrong.",
          description:
            "There was a problem while loading the suggestions list.",
        })
      )
      .finally(() => setLoadingSuggestions(false));
  }, [movieQuery, toast]);

  function clearSearchBar() {
    setMovieQuery("");
    setSuggestions([]);
  }

  return (
    <SearchBar
      {...props}
      isLoading={loadingSuggestions}
      isEmpty={isEmptySuggestions}
      onClose={clearSearchBar}
      onSearchQueryUpdated={setMovieQuery}
      items={suggestions.map((movie) => ({
        id: movie.imdbID,
        label: movie.Title,
      }))}
      itemActions={[
        {
          label: 'Add to "Watched" list',
          className:
            "hover:bg-watched-color hover:bg-opacity-[0.12] hover:text-watched-color p-1",
          icon: <EyeCheck className="w-3.5 h-3.5" />,
          onClick: addWatchedMovie,
        },
        {
          label: 'Add to "Unwatched" list',
          className:
            "hover:bg-unwatched-color-light hover:text-unwatched-color-default p-1",
          icon: <EyeRemove className="w-3.5 h-3.5" />,
          onClick: addUnwatchedMovie,
        },
      ]}
    />
  );
};

export default AddMovieForm;
