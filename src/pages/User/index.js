import React, { useEffect, useState } from 'react';
import proptypes from 'proptypes';
import { View, ActivityIndicator } from 'react-native';
import api from '../../services/index';

import {
  Profile,
  AvatarUser,
  Box,
  TextBox,
  BorderBottom,
  ContentList,
  Content,
} from './styles';
import { List, Avatar } from '../Main/styles';

export default function User({ navigation }) {
  const [newUser, setNewUser] = useState('');
  const [stars, setStars] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      const user = navigation.getParam('user');
      if (user) {
        setLoading(true);
        const response = await api.get(`/users/${user.login}`);
        const responseStars = await api.get(`/users/${user.login}/starred`);
        setNewUser(response.data);
        setStars(responseStars.data);
        setLoading(false);
      }
    };
    getUser();
  }, []);

  return loading ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color="#7159c1" size={90} />
    </View>
  ) : (
    <Profile>
      <AvatarUser source={{ uri: newUser.avatar_url }} />
      <Box>
        <BorderBottom>
          <TextBox>Nome: {newUser.name}</TextBox>
        </BorderBottom>
        <BorderBottom>
          <TextBox>Localização: {newUser.location}</TextBox>
        </BorderBottom>
        <BorderBottom>
          <TextBox>
            Seguindo: {newUser.following} Seguidores: {newUser.followers}
          </TextBox>
        </BorderBottom>
        <BorderBottom>
          <TextBox>Bio: {newUser.bio}</TextBox>
        </BorderBottom>
      </Box>
      <Content>
        <TextBox style={{ color: 'black' }}>Repositórios favoritos</TextBox>

        <List
          style={{ padding: 10 }}
          data={stars}
          keyExtractor={user => String(user.id)}
          renderItem={({ item }) => (
            <ContentList>
              <Avatar source={{ uri: item.owner.avatar_url }} />
              <TextBox>Nome do repositório:</TextBox>
              <TextBox style={{ color: '#fff' }}>{item.name}</TextBox>
              <TextBox>Descrição:</TextBox>
              <TextBox style={{ color: '#fff' }}>{item.description}</TextBox>
            </ContentList>
          )}
        />
      </Content>
    </Profile>
  );
}

User.navigationOptions = ({ navigation }) => {
  return { title: navigation.getParam('user').name };
};

User.propTypes = {
  navigation: proptypes.shape({
    getParam: proptypes.func,
  }).isRequired,
};
