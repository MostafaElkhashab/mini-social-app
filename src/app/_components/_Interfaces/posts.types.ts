export type PostType = {
  _id: string;
  body: string;
  image: string;
  createdAt: string;
  user: UserType;
  comments: CommentType[];
};
export type UserType = {
  _id: string;
  name: string;
  photo: string;
};
export type CommentType = {
  _id: string;
  content: string;
  commentCreator: UserType;
  post: string;
  createdAt: string;
};
