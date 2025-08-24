export type Genre = { id: number; name: string; slug: string };
export type Country = { id: number; name: string };
export type Actor = { id: number; name: string; photo_url?: string };
export type Subtitle = { id: number; language: string; url: string };

export type VideoSource = {
  id: number;
  title?: string;
  url: string;
  quality?: string;
  language?: string;
  episode_number?: number;
  duration?: number;
  subTitles?: Subtitle[];
};

export type Season = {
  id: number;
  title?: string;
  season_number: number;
  videoSources: VideoSource[];
};

export type Movie = {
  id: number;
  title: string;
  slug: string;
  poster_url: string;
  cover_url?: string;
  description?: string;
  country?: Country;
  genres?: Genre[];
  actors?: Actor[];
  type: "movie" | "series";
  seasons?: Season[];
  videoSources?: VideoSource[];
};
