import styled from 'styled-components';

const Feed = styled.div`
  width: 700px;
  border: 1px #d3d3d3;
  border-radius: 20px;
  background-color: #ffffff;
`;

const Content = styled.div`
  padding: 20px 40px 0 40px;
`;

const FeedTop = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Avatar = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  cursor: pointer;
`;

const GrayAvatar = styled(Avatar)`
  background-color: #d3d3d3;
`;

const SmallAvatar = styled(Avatar)`
  width: 30px;
  height: 30px;
`;

const SmallRedAvatar = styled(SmallAvatar)`
  background-color: #f85c53;
`;

const SmallGrayAvatar = styled(SmallAvatar)`
  background-color: #d3d3d3;
`;

const CommentAvatar = styled.img`
  margin-left: 40px;
`;

const Block = styled.div`
  display: block;
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;

const Time = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: #909090;
`;

const Article = styled.article`
  height: 59px;
  margin: 17px 0 41px 0;
`;

const Viewers = styled.div`
  display: flex;
  padding: 10px 0;
  gap: 10px;
  border-top: 1px solid #bfbfbf;
  border-bottom: 1px solid #bfbfbf;
`;

const ViewersInfo = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 400;
  color: #5c5c5c;
`;

const Comment = styled.div`
  border-top: 1px solid #d9d9d9;
  display: flex;
  gap: 15px;
  align-items: center;
  height: 90px;
`;

const CommentButton = styled.div`
  width: 555px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-radius: 30px;
  border: none;
  font-size: 20px;
  font-weight: 400;
  color: #777777;
  background-color: #f0f0f0;
`;

const Post = () => {
  return (
    <Feed>
      <Content>
        <FeedTop>
          <GrayAvatar />
          <Block>
            <Name>你的朋友</Name>
            <Time>一小時前</Time>
          </Block>
        </FeedTop>
        <Article>
          動態動態動態動態動態動態，動態動態動態動態。
        </Article>
        <Viewers>
          <SmallRedAvatar></SmallRedAvatar>
          <SmallGrayAvatar></SmallGrayAvatar>
        </Viewers>
        <ViewersInfo>
          <div>
            7 人喜歡這則貼文
          </div>
          <div>
            1 則留言
          </div>
        </ViewersInfo>
      </Content>
      <Comment>
        <CommentAvatar src="avatar.png" />
        <CommentButton>
          留個言吧
        </CommentButton>
      </Comment>
    </Feed>
  );
};

export default Post;
