import { OmdbSearchResponse, OmdbMovieType } from "./types";

export * from "./types";

interface OmdbSearchFilters<MovieType extends OmdbMovieType = OmdbMovieType> {
  type?: MovieType;
  y?: number;
  plot?: "short" | "full";
  r?: "json" | "xml";
  page?: number;
}

const OMDB = {
  url() {
    return new URL("http://www.omdbapi.com");
  },
  params() {
    return new URLSearchParams({
      apikey: `${process.env.NEXT_PUBLIC_OMDB_API_KEY}`,
    });
  },
  async searchMovies<MovieType extends OmdbMovieType = OmdbMovieType>(
    searchQuery: string,
    filters: OmdbSearchFilters<MovieType>
  ) {
    const params = this.params();

    params.set("s", searchQuery);

    for (const key in filters) {
      params.set(key, `${filters[key as keyof OmdbSearchFilters]}`);
    }

    const response = await fetch(`${this.url()}/?${params}`).then(
      (response) => response.json() as Promise<OmdbSearchResponse<MovieType>>
    );

    if (response.Response === "False") {
      if (
        response.Error.match(/not found/i) ||
        response.Error.match(/too many results/i)
      ) {
        return { movies: [], total: 0 };
      }

      throw new Error(response.Error);
    }

    return { movies: response.Search, total: parseInt(response.totalResults) };
  },
};

export default OMDB;
