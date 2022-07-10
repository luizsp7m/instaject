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

export type Comment = {
  id: string;
  user: User;
  comment: string;
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
  comments?: Array<Comment>;
  favorites?: Array<User>;
}