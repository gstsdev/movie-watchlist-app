import React, { FunctionComponent } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import MoreVertical from "../ui/icons/MoreVertical";
import { Button } from "../ui/button";

interface MovieListProps {
  movies: { id: string; label: string }[];
  emptyText: React.ReactNode;
  actions?: {
    label: string;
    onClick(item: { id: string; label: string }): void;
  }[];
}

const MovieList: FunctionComponent<MovieListProps> = ({
  movies,
  emptyText,
  actions,
}) => {
  return (
    <div className="relative h-[328px] overflow-y-auto">
      {movies.length < 1 && (
        <div className="absolute inset-0 grid place-items-center">
          {emptyText}
        </div>
      )}
      <ul className="h-full">
        {movies.map((movie) => (
          <li key={movie.id} className="group/movie-list-item">
            <div className="flex items-center justify-between py-2 px-2.5">
              <p className="text-sm text-neutral-700">{movie.label}</p>
              {actions && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="icon"
                      size="icon"
                      className="p-2 hover:bg-zinc-100"
                    >
                      <span className="sr-only">Open menu</span>
                      <MoreVertical className="w-2.5 h-2.5"></MoreVertical>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="rounded-lg *:rounded border-[#e6e6e6] shadow-md font-inter font-medium">
                    {actions.map((action) => (
                      <DropdownMenuItem
                        key={action.label}
                        className="hover:bg-zinc-100"
                        onClick={() => action.onClick(movie)}
                      >
                        {action.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <hr className="my-1 group-last/movie-list-item:hidden" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
