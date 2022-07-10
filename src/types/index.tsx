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

export type Project = {
  id: string;
  user: User;
  name: string;
  description: string;
  repository: string;
  deploy: string;
  image: string;
  created_at: string;
  last_update: string;
}