export type User = {
  name: string;
  email: string;
  image: string;
}

export type ImageLocal = {
  image: string;
  name: string;
  size: string;
}

export type Technology = {
  id: string;
  email: string;
  name: string;
  image: string;
  created_at: string;
  last_update: string;
}

export type Project = {
  id: string;
  email: string;
  name: string;
  description: string;
  repository: string;
  deploy: string;
  image: string;
  technologies: Array<string>;
  created_at: string;
  last_update: string;
}