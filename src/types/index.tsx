export type User = {
  name: string;
  email: string;
  image: string;
}

export type Technology = {
  id: string;
  email: string;
  name: string;
  imageUrl: string;
  created_at: string;
}

export type Project = {
  id: string;
  email: string;
  name: string;
  description: string;
  repository: string;
  deploy: string;
  imageUrl: string;
  created_at: string;
}

export type ImageLocal = {
  image: string;
  name: string;
  size: string;
}