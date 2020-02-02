import styled from 'styled-components/native';

export const Profile = styled.View`
  flex: 1;
  /* background: #ccc; */
  align-items: center;
  padding-top: 20px;
  /* justify-content: center; */
`;

export const AvatarUser = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background: #eee;
`;

export const Box = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 300px;
  border-radius: 5px;
  padding: 20px;
  background-color: #1f1f1f;
`;

export const BorderBottom = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export const TextBox = styled.Text`
  font-size: 14px;
  color: #7159c1;
  font-weight: bold;
  text-align: center;
`;

export const ContentList = styled.View`
  margin: 10px 0;
  padding: 10px 0;
  align-items: center;
  border-radius: 5px;
  justify-content: center;
  background-color: #1f1f1f;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
