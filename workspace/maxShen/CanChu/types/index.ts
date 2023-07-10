export interface PostType {
  user_id: number;
  name: string | null;
  picture: string | null;
  id: number;
  context: string | null;
  created_at: string | null;
  like_count: number | null;
  comment_count: number | null;
  is_like: number | null;
};

export interface CommentType {
  id: number;
  content: string | null;
  created_at: string | null;
  user: {
    id: number;
    name: string | null;
    picture: string | null;
  };
}
