export type TermCategory = 'base' | 'extra' | 'skill';

export type SiteLocation = {
  region: string;
  subRegion: string;
  spot: string;
};

export type SiteTerms = {
  base: string[];
  extra: string[];
  skill: string[];
};

export type Site = {
  id: string;
  name: string;
  location: SiteLocation;
  terms: SiteTerms;
};

export type FilterState = {
  base: string | null;
  extra: string | null;
  skill: string | null;
};

export type TermOptions = {
  base: string[];
  extra: string[];
  skill: string[];
};
