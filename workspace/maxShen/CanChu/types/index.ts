export interface UserCommentType {
  id: number;
  name: string | null;
  picture: string | null;
}

export interface CommentType {
  id: number;
  created_at: string | null;
  content: string | null;
  user: UserCommentType;
}

export interface PostType {
  id: number;
  user_id: number;
  created_at: string | null;
  context: string | null;
  summary: string | null;
  is_liked: boolean | null;
  like_count: number | null;
  comment_count: number | null;
  picture: string | null;
  name: string | null;
  comments: CommentType[];
}

interface FriendShipType {
  id: number;
  status: string;
}

export interface ProfileType {
  id: number | null;
  name: string | null;
  picture: string | null;
  provider: string | null;
  friend_count: number | null;
  introduction: string | null;
  tags: string | null;
  friendship: FriendShipType | null;
}

export interface UserSearchType {
  id: number;
  name: string;
  picture: string;
  friendship: FriendShipType | null;
}

export enum Relation {
  Self,
  Null,
  Pending,
  Requested,
  Friend,
}
