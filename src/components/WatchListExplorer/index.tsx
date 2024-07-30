"use client";

import { FunctionComponent, useMemo, useState } from "react";
import { Button } from "../ui/button";
import EyeCheck from "../ui/icons/EyeCheck";
import EyeRemove from "../ui/icons/EyeRemove";
import MoreVertical from "../ui/icons/MoreVertical";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import AddMovieForm from "./AddMovieForm";

interface WatchListExplorerProps {}

const WatchListExplorer: FunctionComponent<WatchListExplorerProps> = ({}) => {
  const [movies, setMovies] = useState<
    { type: "watched" | "unwatched"; id: string; label: string }[]
  >([]);
  const watchedMovies = useMemo(() => {
    return movies.filter((movie) => movie.type === "watched");
  }, [movies]);
  const unwatchedMovies = useMemo(() => {
    return movies.filter((movie) => movie.type === "unwatched");
  }, [movies]);

  function addMovie(
    type: "watched" | "unwatched",
    item: { id: string; label: string }
  ): void {
    setMovies((movies) => {
      let found = false;

      movies = movies.map((movie) => {
        if (movie.id === item.id) {
          found = true;

          return { ...movie, type };
        }

        return movie;
      });

      if (!found) {
        movies = movies.concat({ ...item, type });
      }

      return movies;
    });
  }

  return (
    <div className="p-3 rounded-3xl border border-[#e6e6e6] w-full">
      <AddMovieForm
        className="mb-3"
        onAddWatchedMovie={(item) => addMovie("watched", item)}
        onAddUnwatchedMovie={(item) => addMovie("unwatched", item)}
      />
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
          {watchedMovies.length < 1 && (
            <div className="min-h-[328px] w-full grid place-items-center">
              No watched movies to show
            </div>
          )}
          <ul>
            {watchedMovies.map((movie) => (
              <li key={movie.id} className="group/movie-list-item">
                <div className="flex items-center justify-between py-2 px-2.5">
                  <p className="text-sm">{movie.label}</p>
                  <Button
                    variant="outline"
                    className="w-fit h-fit p-2 border-0 hover:bg-[#f4f4f5]"
                  >
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="w-2.5 h-2.5"></MoreVertical>
                  </Button>
                </div>
                <hr className="my-1 group-last/movie-list-item:hidden" />
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="unwatched">
          {unwatchedMovies.length < 1 && (
            <div className="min-h-[328px] w-full grid place-items-center">
              No unwatched movies to show
            </div>
          )}
          <ul>
            {unwatchedMovies.map((movie) => (
              <li key={movie.id} className="group/movie-list-item">
                <div className="flex items-center justify-between py-2 px-2.5">
                  <p className="text-sm">{movie.label}</p>
                  <Button
                    variant="outline"
                    className="w-fit h-fit p-2 border-0 hover:bg-[#f4f4f5]"
                  >
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="w-2.5 h-2.5"></MoreVertical>
                  </Button>
                </div>
                <hr className="my-1 group-last/movie-list-item:hidden" />
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WatchListExplorer;
