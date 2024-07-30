"use client";

import { FunctionComponent, useMemo, useState } from "react";
import EyeCheck from "../ui/icons/EyeCheck";
import EyeRemove from "../ui/icons/EyeRemove";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import AddMovieForm from "./AddMovieForm";
import MovieList from "./MovieList";
import { Movie, MovieType, MovieWithType } from "@/lib/types/movie";

interface WatchListExplorerProps {}

const WatchListExplorer: FunctionComponent<WatchListExplorerProps> = ({}) => {
  const [movies, setMovies] = useState<MovieWithType[]>([]);
  const watchedMovies = useMemo(() => {
    return movies.filter((movie) => movie.type === "watched");
  }, [movies]);
  const unwatchedMovies = useMemo(() => {
    return movies.filter((movie) => movie.type === "unwatched");
  }, [movies]);

  function addMovie(type: MovieType, item: Movie): void {
    setMovies((movies) =>
      // this way the movie always show at the bottom when its first added in the list
      // or moved from another list
      movies.filter((movie) => movie.id !== item.id).concat({ ...item, type })
    );
  }

  function removeMovieFromList(movieId: string) {
    setMovies((movies) => movies.filter((movie) => movie.id !== movieId));
  }

  return (
    <div className="p-3 rounded-3xl border border-[#e6e6e6] w-full">
      <div className="relative h-11 mb-3">
        <AddMovieForm
          className="absolute h-max z-10"
          onAddWatchedMovie={(item) => addMovie("watched", item)}
          onAddUnwatchedMovie={(item) => addMovie("unwatched", item)}
        />
      </div>
      <Tabs defaultValue="watched" className="w-full">
        <TabsList className="grid grid-cols-2 w-full mb-3 rounded-xl *:rounded-lg *:uppercase *:font-mono bg-[#ebebeb]">
          <TabsTrigger
            value="watched"
            className="data-[state=active]:bg-watched-color data-[state=active]:text-white space-x-1.5"
          >
            <EyeCheck className="w-3.5 h-3.5" />
            <span>Watched</span>
          </TabsTrigger>
          <TabsTrigger
            value="unwatched"
            className="data-[state=active]:bg-unwatched-color-default data-[state=active]:text-white space-x-1.5"
          >
            <EyeRemove className="w-3.5 h-3.5" />
            <span>Unwatched</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="watched">
          <MovieList
            emptyText="No watched movies to show"
            movies={watchedMovies}
            actions={[
              {
                label: "Move to unwatched",
                onClick: (item) => addMovie("unwatched", item),
              },
              {
                label: "Delete",
                onClick: (item) => removeMovieFromList(item.id),
              },
            ]}
          />
        </TabsContent>
        <TabsContent value="unwatched">
          <MovieList
            emptyText="No unwatched movies to show"
            movies={unwatchedMovies}
            actions={[
              {
                label: "Move to watched",
                onClick: (item) => addMovie("watched", item),
              },
              {
                label: "Delete",
                onClick: (item) => removeMovieFromList(item.id),
              },
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WatchListExplorer;
