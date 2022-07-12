export type ImageLocal = {
  image: string;
  name: string;
  size: string;
}

export type User = {
  name: string;
  email: string;
  image: string;
}

export type Project = {
  id: string;
  name: string;
  description: string;
  repository: string;
  deploy?: string;
  image: string;
  created_at: string;
  user: User;
}

export type Comment = {
  id: string;
  user: User;
  comment: string;
  created_at: string;
}

export type Favorite = {
  id: string;
  user: User;
  created_at: string;
}