export interface Movie {
  id: string;
  label: string;
}

export type MovieType = "watched" | "unwatched";

export type MovieWithType = Movie & { type: MovieType };
