export type OmdbMovieType = "movie" | "series" | "episode";

export interface OmdbSearchMovieResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: "movie";
  Poster: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg";
}

export type OmdbSearchResult<$Type extends OmdbMovieType> =
  OmdbSearchMovieResult & { Type: $Type };

export type OmdbSearchResponse<
  MovieType extends OmdbMovieType = OmdbMovieType
> =
  | {
      Search: OmdbSearchResult<MovieType>[];
      totalResults: `${number}`;
      Response: "True";
    }
  | {
      Error: string;
      Response: "False";
    };
