import { PostType } from '@/types';

const posts: PostType[] = [
  {
    id: 55,
    user_id: 1,
    created_at: '2023-06-17 12:44:21',
    context: '兩津！你這個大笨蛋！！！',
    summary: '',
    is_liked: false,
    like_count: 0,
    comment_count: 0,
    picture: 'https://i.imgur.com/rVRCiZC.png',
    name: '大原所長',
    comments: [],
  },
  {
    user_id: 14,
    name: 'Joseph Joestar',
    picture: 'https://i.imgur.com/JSZhpVj.jpg',
    id: 66,
    context: 'Oh my god!',
    created_at: '2023-06-13 16:32:40',
    like_count: 1,
    comment_count: 1,
    is_liked: true,
    comments: [],
    summary: '',
  },
  {
    user_id: 14,
    name: 'Makima',
    picture: 'https://i.imgur.com/mnlDuoX.png',
    id: 64,
    context: '你現在是我的寵物\n你只能說「是」或是「汪」',
    created_at: '2023-05-24 17:30:25',
    like_count: 0,
    comment_count: 1,
    is_liked: false,
    comments: [],
    summary: '',
  },
];

// simulate situation with no post
// const posts: PostType[] = [];

export default posts;
